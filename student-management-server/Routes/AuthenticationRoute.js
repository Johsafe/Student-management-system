const express = require('express');
const Authenticate = require('../Models/AuthenticationSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
authenticateRouter = express.Router();

//Create new User

authenticateRouter.post('/create', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //confirm is user exists in the system
    const userExists = await Authenticate.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    //create new user
    const user = await Authenticate.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
    });
    const newuser = await user.save();
    res.status(201).json(newuser);
  } catch (error) {
    res.status(500).send({
      message: 'User Cannot be Created',
      error: error.message,
    });
  }
});

//User Login
// authenticateRouter.post('/user', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await Authenticate.findOne({ email });

//     // !user && res.status(401).json('Wrong Credetials!');
//     // const enteredpassword = await bcrypt.compareSync(password, user.passwordHash);
//     // enteredpassword !== user.password &&
//     //   res.status(401).json('Wrong Credentials!');

//     if (user && (await bcrypt.compare(password, user.passwordHash))) {
//       //generate token
//       // const token = jwt.sign(
//       //   {
//       //     userId: user.id,
//       //   },
//       //   process.env.JWT_SECRET,
//       //   {
//       //     expiresIn: '1d',
//       //   }
//       // );
//       res.status(200).send({ user: user.email, token: token });
//     } else {
//       res.status(401).send({ message: 'Invalid email or password' });
//     }
//   } catch (error) {
//     res.status(500).send({
//       message: 'An Unthorized User',
//       error: error.message,
//     });
//   }
// });

//login
authenticateRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const user = await Authenticate.findOne({ email });
    const secret = process.env.JWT_SECRET;
    if (user && (await bcrypt.compare(password, user.password))) {
      //generate token
      const token = jwt.sign(
        {
          userId: user.id,
        },
        secret,
        {
          expiresIn: '1d',
        }
      );
      res.send({
        message: 'Success user authorized',
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
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

//get users
authenticateRouter.get('/users', async (req, res) => {
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
authenticateRouter.put('/profile', async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      message: 'Encountered An Error',
      error: error.message,
    });
  }
});

//User Delete Details
authenticateRouter.delete('/:id', async (req, res) => {
  try {
    Authenticate.findByIdAndRemove(req.params.id).then((user) => {
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

module.exports = authenticateRouter;
