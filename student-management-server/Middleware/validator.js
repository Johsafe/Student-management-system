// //express valodator code
// const { check } = require('express-validator');

// exports.signupValidation = [
//     check('name', 'Name is requied').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
//     check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
// ]

// exports.loginValidation = [
//      check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
//      check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
// ]

// module.exports = function (req, res, next) {
//     //destructure req.body
//     const { email, name, password } = req.body;
//     //checks if email is valid
//     function validEmail(userEmail) {
//       return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
//     }
//     //checks for missing values
//     if (req.path === '/register') {
//       //   console.log(!email.length);
//       if (![email, name, password].every(Boolean)) {
//         return res.status(401).json('Missing Credentials');
//       } else if (!validEmail(email)) {
//         return res.status(401).json('Invalid Email');
//       }
//     } else if (req.path === '/login') {
//       if (![email, password].every(Boolean)) {
//         return res.status(401).json('Missing Credentials');
//       } else if (!validEmail(email)) {
//         return res.status(401).json('Invalid Email');
//       }
//     }
  
//     next();
//   };
  