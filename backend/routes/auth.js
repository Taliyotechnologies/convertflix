const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');

// Initialize default admin user
router.post('/init', async (req, res) => {
  try {
    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: 'Default admin already exists'
      });
    }

    // Create default admin
    const admin = new Admin({
      name: 'ConvertFlix Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'super_admin',
      permissions: {
        canManageUsers: true,
        canManageFiles: true,
        canManageContacts: true,
        canViewAnalytics: true
      }
    });

    await admin.save();

    res.status(201).json({
      success: true,
      message: 'Default admin user created successfully',
      data: {
        email: admin.email,
        role: admin.role
      }
    });

  } catch (error) {
    console.error('Admin initialization error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to initialize admin user'
    });
  }
});

// Check if admin exists
router.get('/check-admin', async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    res.json({
      success: true,
      exists: !!admin
    });

  } catch (error) {
    console.error('Check admin error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check admin status'
    });
  }
});

module.exports = router;
