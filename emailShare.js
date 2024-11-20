const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'YOUR_EMAIL_ADDRESS',
    pass: 'YOUR_EMAIL_PASSWORD',
  },
});

async function sendEmail(resumeUrl, recipientEmail) {
  try {
    const mailOptions = {
      from: 'YOUR_EMAIL_ADDRESS',
      to: recipientEmail,
      subject: 'Shared Resume',
      text: `Check out my resume: ${resumeUrl}`,
    };
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
  }
}

module.exports = { sendEmail };
