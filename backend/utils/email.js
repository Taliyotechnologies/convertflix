const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email function
const sendEmail = async (emailData) => {
  try {
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
    return false;
  }
};

// Send admin notification
const sendAdminNotification = async (data) => {
  const emailData = {
    to: process.env.ADMIN_EMAIL,
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
    to: process.env.ADMIN_EMAIL,
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
