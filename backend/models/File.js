const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  originalName: {
    type: String,
    required: [true, 'Original filename is required'],
    trim: true
  },
  fileName: {
    type: String,
    required: [true, 'File name is required'],
    unique: true
  },
  filePath: {
    type: String,
    required: [true, 'File path is required']
  },
  fileType: {
    type: String,
    required: [true, 'File type is required'],
    enum: ['image', 'video', 'audio', 'pdf', 'document']
  },
  originalFormat: {
    type: String,
    required: [true, 'Original format is required']
  },
  convertedFormat: {
    type: String,
    required: [true, 'Converted format is required']
  },
  originalSize: {
    type: Number,
    required: [true, 'Original file size is required']
  },
  convertedSize: {
    type: Number,
    required: [true, 'Converted file size is required']
  },
  compressionRatio: {
    type: Number,
    required: [true, 'Compression ratio is required']
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for better query performance
fileSchema.index({ fileName: 1 });
fileSchema.index({ fileType: 1, createdAt: -1 });
fileSchema.index({ expiresAt: 1 });
fileSchema.index({ ipAddress: 1, createdAt: -1 });

// Method to check if file is expired
fileSchema.methods.isExpired = function() {
  return new Date() > this.expiresAt;
};

// Method to get file URL
fileSchema.methods.getFileUrl = function() {
  return `/uploads/${this.fileName}`;
};

// Method to get download URL
fileSchema.methods.getDownloadUrl = function() {
  return `/api/files/download/${this.fileName}`;
};

// Auto-delete expired files
fileSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('File', fileSchema);
