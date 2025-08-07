const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: './config.env' });

// Import routes
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');
const fileRoutes = require('./routes/files');
const authRoutes = require('./routes/auth');

const app = express();

// Create upload directories if they don't exist
const uploadDir = path.join(__dirname, 'uploads');
const tempDir = path.join(__dirname, 'temp');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_WINDOW * 60 * 1000,
  max: process.env.RATE_LIMIT_MAX,
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'ConvertFlix API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Auto-cleanup old files (24 hours)
setInterval(() => {
  const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  // Clean uploads directory
  fs.readdir(uploadDir, (err, files) => {
    if (err) return;
    files.forEach(file => {
      const filePath = path.join(uploadDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        if (stats.mtime < cutoff) {
          fs.unlink(filePath, () => {});
        }
      });
    });
  });
  
  // Clean temp directory
  fs.readdir(tempDir, (err, files) => {
    if (err) return;
    files.forEach(file => {
      const filePath = path.join(tempDir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) return;
        if (stats.mtime < cutoff) {
          fs.unlink(filePath, () => {});
        }
      });
    });
  });
}, 60 * 60 * 1000); // Run every hour

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 ConvertFlix Backend running on port ${PORT}`);
  console.log(`📧 Admin Email: ${process.env.ADMIN_EMAIL}`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
