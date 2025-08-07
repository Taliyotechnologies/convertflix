const nodemailer = require('nodemailer');

// Check if email configuration is available
const isEmailConfigured = () => {
  return process.env.EMAIL_USER && process.env.EMAIL_PASS;
};

// Create transporter with proper configuration
const createTransporter = () => {
  if (!isEmailConfigured()) {
    console.log('Email not configured, skipping email functionality');
    return null;
  }

  try {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: process.env.EMAIL_PORT || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    return null;
  }
};

// Send email function
const sendEmail = async (emailData) => {
  try {
    if (!isEmailConfigured()) {
      console.log('Email not configured, skipping email send');
      return true; // Return true to not break the flow
    }

    const transporter = createTransporter();
    if (!transporter) {
      console.log('Transporter not available, skipping email send');
      return true;
    }

    const { to, subject, html, text } = emailData;
    
    const mailOptions = {
      from: `"ConvertFlix" <${process.env.EMAIL_USER}>`,
      to: to,
      subject: subject,
      html: html,
      text: text || html.replace(/<[^>]*>/g, '') // Strip HTML for text version
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Email sending failed:', error);
    return true; // Return true to not break the flow
  }
};

// Send admin notification
const sendAdminNotification = async (data) => {
  const emailData = {
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: 'ConvertFlix Admin Notification',
    html: `
      <h2>Admin Notification</h2>
      <p><strong>Type:</strong> ${data.type}</p>
      <p><strong>Message:</strong> ${data.message}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `
  };
  
  return await sendEmail(emailData);
};

// Send file conversion notification
const sendFileNotification = async (fileData) => {
  const emailData = {
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: 'New File Conversion - ConvertFlix',
    html: `
      <h2>New File Conversion</h2>
      <p><strong>File:</strong> ${fileData.originalName}</p>
      <p><strong>Type:</strong> ${fileData.fileType}</p>
      <p><strong>From:</strong> ${fileData.originalFormat}</p>
      <p><strong>To:</strong> ${fileData.convertedFormat}</p>
      <p><strong>Size Reduction:</strong> ${fileData.compressionRatio}%</p>
      <p><strong>IP Address:</strong> ${fileData.ipAddress}</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
    `
  };
  
  return await sendEmail(emailData);
};

module.exports = {
  sendEmail,
  sendAdminNotification,
  sendFileNotification
};
