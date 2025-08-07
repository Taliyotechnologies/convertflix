const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');
const { PDFDocument } = require('pdf-lib');
const File = require('../models/File');
const { sendFileNotification } = require('../utils/email');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 100 * 1024 * 1024 // 100MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/avi', 'video/mov', 'video/webm',
      'audio/mp3', 'audio/wav', 'audio/flac', 'audio/aac',
      'application/pdf'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  }
});

// Upload and convert file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { originalname, filename, path: filePath, size, mimetype } = req.file;
    const { outputFormat, compressionLevel = 80 } = req.body;

    // Determine file type
    let fileType;
    if (mimetype.startsWith('image/')) fileType = 'image';
    else if (mimetype.startsWith('video/')) fileType = 'video';
    else if (mimetype.startsWith('audio/')) fileType = 'audio';
    else if (mimetype === 'application/pdf') fileType = 'pdf';
    else fileType = 'document';

    // Get original format
    const originalFormat = path.extname(originalname).toLowerCase().replace('.', '');

    // Process file based on type
    let convertedPath = filePath;
    let convertedSize = size;
    let convertedFormat = outputFormat || originalFormat;

    if (fileType === 'image') {
      const result = await processImage(filePath, outputFormat, compressionLevel);
      convertedPath = result.path;
      convertedSize = result.size;
      convertedFormat = result.format;
    } else if (fileType === 'video') {
      const result = await processVideo(filePath, outputFormat, compressionLevel);
      convertedPath = result.path;
      convertedSize = result.size;
      convertedFormat = result.format;
    } else if (fileType === 'audio') {
      const result = await processAudio(filePath, outputFormat, compressionLevel);
      convertedPath = result.path;
      convertedSize = result.size;
      convertedFormat = result.format;
    } else if (fileType === 'pdf') {
      const result = await processPDF(filePath, outputFormat, compressionLevel);
      convertedPath = result.path;
      convertedSize = result.size;
      convertedFormat = result.format;
    }

    // Calculate compression ratio
    const compressionRatio = Math.round(((size - convertedSize) / size) * 100);

    // Save file record to database
    const fileRecord = new File({
      originalName: originalname,
      fileName: path.basename(convertedPath),
      filePath: convertedPath.replace(path.join(__dirname, '..'), ''),
      fileType,
      originalFormat,
      convertedFormat,
      originalSize: size,
      convertedSize,
      compressionRatio,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    await fileRecord.save();

    // Send notification to admin
    await sendFileNotification({
      originalName,
      fileType,
      originalFormat,
      convertedFormat,
      compressionRatio,
      ipAddress: req.ip || req.connection.remoteAddress
    });

    res.json({
      success: true,
      message: 'File converted successfully',
      data: {
        id: fileRecord._id,
        fileName: fileRecord.fileName,
        originalSize: fileRecord.originalSize,
        convertedSize: fileRecord.convertedSize,
        compressionRatio: fileRecord.compressionRatio,
        downloadUrl: `/api/files/download/${fileRecord.fileName}`,
        expiresAt: fileRecord.expiresAt
      }
    });

  } catch (error) {
    console.error('File upload error:', error);
    
    // Clean up uploaded file if processing failed
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: error.message || 'File processing failed'
    });
  }
});

// Download file
router.get('/download/:filename', async (req, res) => {
  try {
    const { filename } = req.params;
    
    const fileRecord = await File.findOne({ fileName: filename });
    
    if (!fileRecord) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    if (fileRecord.isExpired()) {
      return res.status(410).json({
        success: false,
        message: 'File has expired'
      });
    }

    const filePath = path.join(__dirname, '..', fileRecord.filePath);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'File not found on server'
      });
    }

    // Update download count
    fileRecord.downloadCount += 1;
    await fileRecord.save();

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${fileRecord.originalName}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    
    // Stream file
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('File download error:', error);
    res.status(500).json({
      success: false,
      message: 'Download failed'
    });
  }
});

// Image processing function
async function processImage(inputPath, outputFormat, quality) {
  const outputPath = inputPath.replace(path.extname(inputPath), `.${outputFormat}`);
  
  await sharp(inputPath)
    .jpeg({ quality: parseInt(quality) })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  
  return {
    path: outputPath,
    size: stats.size,
    format: outputFormat
  };
}

// Video processing function
async function processVideo(inputPath, outputFormat, quality) {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace(path.extname(inputPath), `.${outputFormat}`);
    
    ffmpeg(inputPath)
      .outputOptions([
        `-crf ${Math.round(31 - (quality / 100) * 31)}`,
        '-preset fast'
      ])
      .output(outputPath)
      .on('end', () => {
        const stats = fs.statSync(outputPath);
        resolve({
          path: outputPath,
          size: stats.size,
          format: outputFormat
        });
      })
      .on('error', reject)
      .run();
  });
}

// Audio processing function
async function processAudio(inputPath, outputFormat, quality) {
  return new Promise((resolve, reject) => {
    const outputPath = inputPath.replace(path.extname(inputPath), `.${outputFormat}`);
    
    ffmpeg(inputPath)
      .outputOptions([
        `-b:a ${Math.round(quality * 3.2)}k`,
        '-ar 44100'
      ])
      .output(outputPath)
      .on('end', () => {
        const stats = fs.statSync(outputPath);
        resolve({
          path: outputPath,
          size: stats.size,
          format: outputFormat
        });
      })
      .on('error', reject)
      .run();
  });
}

// PDF processing function
async function processPDF(inputPath, outputFormat, quality) {
  if (outputFormat === 'pdf') {
    // For PDF compression, we'll just copy the file for now
    // In a real implementation, you'd use a PDF compression library
    const outputPath = inputPath;
    const stats = fs.statSync(outputPath);
    
    return {
      path: outputPath,
      size: stats.size,
      format: outputFormat
    };
  }
  
  // For other formats, return the original for now
  const stats = fs.statSync(inputPath);
  return {
    path: inputPath,
    size: stats.size,
    format: outputFormat
  };
}

module.exports = router;
