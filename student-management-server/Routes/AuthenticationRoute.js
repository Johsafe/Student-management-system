const express = require('express');
const Authenticate = require('../Models/AuthenticationSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuth = require('../Middleware/Auth');
const authRouter = express.Router();
const sendConfirmationEmail = require('../Utils/sendEmail');
const { generateToken } = require('../Utils/GenerateToken');
// const { signupValidation } = require('../Middleware/validator');

//Create new User

authRouter.post('/create', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //confirm is user exists in the system
    const userExists = await Authenticate.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
    // create new user
    const user = await Authenticate.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    const newuser = await user.save();
    // res.status(201).json(newuser);
    if (newuser) {
      // Send varification email
      // const link = `${process.env.BASE_URL}/verify?id=${user_id}`;
      // const link = `${process.env.BASE_URL}/verify?id=joseph`;
      // await sendConfirmationEmail(name, email, link, newuser._id);
      // res.json({
      //   message: 'User Registration success, PLEASE VERIFY YOUR EMAIL',
      // });
      res.status(201).json(newuser);
    } else {
      res.json({ message: 'User Registration failure' });
    }
  } catch (error) {
    res.status(500).send({
      message: 'User registration failure',
      error: error.message,
    });
  }
});

//verify mail
authRouter.get('/verify/:id', async (req, res, next) => {
  try {
    // User.findOne({
    //   confirmationCode: req.params.confirmationCode,
    // }).then((user) => {
    //   if (!user) {
    //     return res.status(404).send({ message: 'User Not found.' });
    //   }
    //   user.status = 'Active';
    //   user.save((err) => {
    //     if (err) {
    //       res.status(500).send({ message: err });
    //       return;
    //     }
    //   });
    // });
    // /verify/:confirmCode
    // const {confirmCode}=req.params
    // const user =await User.findOne({confirmCode:confirmCode})
    // if(user){
    //   //mark email as verified
    //   user.isValid = true
    //   await user.save()
    //   //redirect to homepage or anywhere
    //   res.redirect("/")
    // }
  } catch (error) {
    res.status(500).send({
      message: 'Email Verification Failure',
      error: error.message,
    });
  }
});

//login
authRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const user = await Authenticate.findOne({ email });
    const secret = process.env.JWT_SECRET;
    if (user && (await bcrypt.compare(password, user.password))) {
      res.send({
        message: 'Success user authorized',
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
      return;
    }
    res.status(401).send({ message: 'Not authorized' });
  } catch (error) {
    res.status(500).send({
      message: 'Encountered An Error',
      error: error.message,
    });
  }
});

//update user
// authRouter.put(
//   '/profile',async (req, res) => {
//     const user = await Authenticate.findById(req.user._id);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;
//       if (req.body.password) {
//         user.password = bcrypt.hashSync(req.body.password, 8);
//       }

//       const updatedUser = await user.save();
//       res.send({
//         message: 'Success user updated',
//         email:  updatedUser.email,
//         isAdmin:  updatedUser.isAdmin,
//         token: token,
//       });
//     } else {
//       res.status(404).send({ message: 'User not found' });
//     }
//   });

//get users
authRouter.get('/users', async (req, res) => {
  try {
    const userList = await Authenticate.find().select('-password');
    res.send(userList);
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting userList.', error: error.message });
  }
});

//User Details Update
authRouter.put('/profile', async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      message: 'Encountered An Error',
      error: error.message,
    });
  }
});

//User Delete Details
authRouter.delete('/:userId', async (req, res) => {
  try {
    Authenticate.findByIdAndRemove(req.params.userId).then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: 'user deleted', user });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'user not found' });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'Cannot Delete User',
      error: error.message,
    });
  }
});

module.exports = authRouter;
