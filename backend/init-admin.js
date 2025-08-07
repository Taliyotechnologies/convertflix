const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config({ path: './config.env' });

async function initAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists');
      console.log(`📧 Email: ${existingAdmin.email}`);
      console.log(`👤 Role: ${existingAdmin.role}`);
      process.exit(0);
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
    console.log('✅ Default admin user created successfully');
    console.log(`📧 Email: ${admin.email}`);
    console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD}`);
    console.log(`👤 Role: ${admin.role}`);
    console.log('\n🔗 Admin Login URL: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('❌ Error initializing admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

// Run the initialization
initAdmin();
