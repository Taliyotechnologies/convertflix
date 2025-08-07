const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Contact = require('../models/Contact');
const File = require('../models/File');
const { sendAdminNotification } = require('../utils/email');

// Middleware to verify admin token
const verifyAdminToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id);
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({ success: false, message: 'Invalid token or inactive admin.' });
    }

    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    
    if (!admin || !admin.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    const isPasswordValid = await admin.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Update last login
    admin.lastLogin = new Date();
    await admin.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        admin: admin.getPublicProfile()
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed. Please try again.'
    });
  }
});

// Get admin profile
router.get('/profile', verifyAdminToken, async (req, res) => {
  try {
    res.json({
      success: true,
      data: req.admin.getPublicProfile()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to get profile'
    });
  }
});

// Get dashboard statistics
router.get('/dashboard', verifyAdminToken, async (req, res) => {
  try {
    const [
      totalContacts,
      pendingContacts,
      totalFiles,
      todayFiles,
      todayDownloads
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'pending' }),
      File.countDocuments(),
      File.countDocuments({
        createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
      }),
      File.aggregate([
        {
          $match: {
            updatedAt: { $gte: new Date().setHours(0, 0, 0, 0) }
          }
        },
        {
          $group: {
            _id: null,
            totalDownloads: { $sum: '$downloadCount' }
          }
        }
      ])
    ]);

    res.json({
      success: true,
      data: {
        contacts: {
          total: totalContacts,
          pending: pendingContacts
        },
        files: {
          total: totalFiles,
          today: todayFiles
        },
        downloads: {
          today: todayDownloads[0]?.totalDownloads || 0
        }
      }
    });

  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get dashboard statistics'
    });
  }
});

// Get all contacts (with pagination)
router.get('/contacts', verifyAdminToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search;

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get contacts'
    });
  }
});

// Update contact status
router.patch('/contacts/:id/status', verifyAdminToken, async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact status'
    });
  }
});

// Get all files (with pagination)
router.get('/files', verifyAdminToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const fileType = req.query.fileType;
    const search = req.query.search;

    const filter = {};
    if (fileType) filter.fileType = fileType;
    if (search) {
      filter.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { fileName: { $regex: search, $options: 'i' } }
      ];
    }

    const files = await File.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await File.countDocuments(filter);

    res.json({
      success: true,
      data: {
        files,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });

  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get files'
    });
  }
});

// Delete file
router.delete('/files/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    // Delete physical file
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, '..', file.filePath);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await File.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file'
    });
  }
});

// Add new admin user
router.post('/users', verifyAdminToken, async (req, res) => {
  try {
    const { name, email, password, role, permissions } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Admin with this email already exists'
      });
    }

    const admin = new Admin({
      name,
      email: email.toLowerCase(),
      password,
      role: role || 'admin',
      permissions: permissions || {}
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Admin user created successfully',
      data: admin.getPublicProfile()
    });

  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create admin user'
    });
  }
});

// Get all admin users
router.get('/users', verifyAdminToken, async (req, res) => {
  try {
    const admins = await Admin.find({}).select('-password');
    
    res.json({
      success: true,
      data: admins
    });

  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get admin users'
    });
  }
});

module.exports = router;
