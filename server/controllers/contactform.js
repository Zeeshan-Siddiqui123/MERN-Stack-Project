const nodemailer = require('nodemailer');

const contactMessage = async ({ name, email, phone, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'zeeshansd767@gmail.com',
        pass: 'uoepvgagemecreom', 
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`, 
      to: 'zeeshansd767@gmail.com', 
      subject: 'New Contact Form Submission',
      replyTo: email,
      html: `
        <h3>New Message from Auric Watch</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Contact form error:', error);
    throw new Error('Failed to send email');
  }
};

module.exports = contactMessage;

