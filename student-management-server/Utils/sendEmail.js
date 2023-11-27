// // const sendConfirmationEmail = async (name, email, link) => {
// //   try {
// //     const transport = nodemailer.createTransport({
// //       // service: 'Gmail',
// //       host: 'smtp.gmail.com',
// //       port: 587,
// //       secure: false,
// //       requireTLS: true,
// //       auth: {
// //         user: process.env.USER,
// //         pass: process.env.PASS,
// //       },
// //     });

// //     transport.sendMail(mailOptions, function (error, info) {
// //       if (error) {
// //         console.log(error);
// //       } else {
// //         console.log('email has been sent -', info.response);
// //       }
// //     });
// //   } catch (error) {
// //     // res.status(500).send({
// //     //   message: 'email send failure',
// //     //   error: error.message,
// //     // });
// //     console.log(error.message);
// //   }
// // };

// // module.exports = sendConfirmationEmail;
const nodemailer = require("nodemailer");

module.exports = async (email, firstname, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      requireTLS: true,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    // const mailOptions = {
      
    // };
    await transporter.sendMail({
    //   mailOptions,
	// from: process.env.USER,
    //   to: email,
    //   subject: "Please confirm your account",
    //   html: `<h1>Email Confirmation</h1>
    //   <h2>Hello ${firstname}</h2>
    //   <p>Thank you for registering with us. Please confirm your email-${email} by clicking on the following link</p>
    //   <a href="${text}"> Verify Your Email</a>
    //   <p>If you did not start the verification process, feel free to ignore this email.</p>
    //   </div>`,
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

// const sendConfirmationEmail = async (name, email, link) => {
//   try {
//     const transport = nodemailer.createTransport({
//       // service: 'Gmail',
//       host: 'smtp.gmail.com',
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: process.env.USER,
//         pass: process.env.PASS,
//       },
//     });

//     const mailOptions = {
//       from: '',
//       to: email,
//       subject: 'Please confirm your account',
//       html: `<h1>Email Confirmation</h1>
//       <h2>Hello ${name}</h2>
//       <p>Thank you for registering with us. Please confirm your email by clicking on the following link</p>
//       <a href="${link}"> Verify Your Email</a>
//       <p>If you did not start the verification process, feel free to ignore this email.</p>
//       </div>`,
//     };

//     transport.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('email has been sent -', info.response);
//       }
//     });
//   } catch (error) {
//     // res.status(500).send({
//     //   message: 'email send failure',
//     //   error: error.message,
//     // });
//     console.log(error.message);
//   }
// };

// module.exports = sendConfirmationEmail;

// from: process.env.EMAIL_USER,
// to: data.email,
// subject: "password reset for Examiner appointment system",
// html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.<br/><br/>
// 			  Please click on the following link, or paste this into your browser to complete the process:<br/><br/>
// 			  ${data.link}
// 			  <br/>
// 			  If you did not request this, please ignore this email and your password will remain unchanged.\n
// 			  the above link will automatically expire after 10 minutes </p>
// 			  <h3>Sincerely,<br/>
// 			  Examiner appointment system <br/>
// 			  Development Team</h3>`
