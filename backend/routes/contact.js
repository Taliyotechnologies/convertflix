const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const sendEmail = require('../utils/email');

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Create contact submission
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('User-Agent')
    });

    await contact.save();

    // Send email notification to admin
    const emailData = {
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission - ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>IP Address:</strong> ${req.ip || req.connection.remoteAddress}</p>
      `
    };

    await sendEmail(emailData);

    // Send confirmation email to user
    const userEmailData = {
      to: email,
      subject: 'Thank you for contacting ConvertFlix',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you within 24 hours.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <p>Best regards,<br>ConvertFlix Team</p>
      `
    };

    await sendEmail(userEmailData);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully. We will get back to you soon!'
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form. Please try again.'
    });
  }
});

// Get contact statistics (admin only)
router.get('/stats', async (req, res) => {
  try {
    const totalSubmissions = await Contact.countDocuments();
    const pendingSubmissions = await Contact.countDocuments({ status: 'pending' });
    const todaySubmissions = await Contact.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) }
    });

    res.json({
      success: true,
      data: {
        total: totalSubmissions,
        pending: pendingSubmissions,
        today: todaySubmissions
      }
    });
  } catch (error) {
    console.error('Contact stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get contact statistics'
    });
  }
});

module.exports = router;
