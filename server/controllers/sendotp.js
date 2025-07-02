const nodemailer = require('nodemailer');

const sendOtp = async (email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zeeshansd767@gmail.com',
        pass: 'uoepvgagemecreom',
      },
    });

    const mailOptions = {
      from: '"Auric Watch" <zeeshansd767@gmail.com>',
      to: email,
      subject: 'Auric Watch - Verify Your Email',
      html: `
        <h2>Verify your Auric Watch account</h2>
        <p>Use the OTP below to verify your account:</p>
        <h3 style="color:#f49521;">${otp}</h3>
        <p>This code is valid for 5 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('OTP sent to:', email);
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
};

module.exports = sendOtp;
