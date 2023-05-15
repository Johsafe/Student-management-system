const nodemailer = require('nodemailer');

const sendConfirmationEmail = async (name, email, link) => {
  try {
    const transport = nodemailer.createTransport({
      // service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: '',
      to: email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
      <h2>Hello ${name}</h2>
      <p>Thank you for registering with us. Please confirm your email by clicking on the following link</p>
      <a href="${link}"> Verify Your Email</a>
      <p>If you did not start the verification process, feel free to ignore this email.</p>
      </div>`,
    };

    transport.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('email has been sent -', info.response);
      }
    });
  } catch (error) {
    // res.status(500).send({
    //   message: 'email send failure',
    //   error: error.message,
    // });
    console.log(error.message);
  }
};

module.exports = sendConfirmationEmail;
