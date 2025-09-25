const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'jmali3953@gmail.com',
    pass: 'wfmkvbeeffzsfufb'
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_HOST_USER,
    to: email,
    subject: 'ClimateLens - Email Verification',
    html: `
      <h2>Email Verification</h2>
      <p>Your OTP for ClimateLens verification is:</p>
      <h1 style="color: #3498db; font-size: 32px;">${otp}</h1>
      <p>This OTP will expire in 5 minutes.</p>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };