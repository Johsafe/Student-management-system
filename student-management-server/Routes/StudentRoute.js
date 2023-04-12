const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../Models/StudentSchema');
studentRouter = express.Router();

//Create new Student

studentRouter.post('/create', async (req, res) => {
  try {
    const { firstname, lastname, email, admission, group, gender, password } =
      req.body;

    //confirm is user exists in the system
    const isStudent = await Student.findOne({ admission });

    if (isStudent) {
      res.status(400);
      throw new Error('Student already exists');
    }

    //create new user
    const student = await Student.create({
      firstname,
      lastname,
      email,
      admission,
      group,
      gender,
      password: bcrypt.hashSync(password, 10),
    });
    const newStudent = await student.save();
    // res.status(201).json(newStudent);
    res.status(201).send({ message: 'New Student Created', newStudent });
  } catch (error) {
    res.status(500).send({
      message: 'Student Cannot be Created',
      error: error.message,
    });
  }
});

//login
studentRouter.post('/login', async (req, res) => {
  try {
    const { admission, password } = req.body;

    if (!admission || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const student = await Student.findOne({ admission });
    const secret = process.env.JWT_SECRET;
    if (student && (await bcrypt.compare(password, student.password))) {
      //generate token
      const token = jwt.sign(
        {
          studentId: student.id,
        },
        secret,
        {
          expiresIn: '1d',
        }
      );
      res.send({
        message: 'Success user authorized',
        admission: student.admission,
        isAdmin: user.isAdmin,
        token: token,
      });
      return;
    }
    res.status(401).send({ message: 'Not authorized' });
  } catch (error) {
    res.status(500).send({
      message: 'Check Admission & Password and try again',
      error: error.message,
    });
  }
});

//get students
studentRouter.get('/students', async (req, res) => {
  try {
    const studentList = await Student.find().select('-password');
    res.send(studentList);
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Cannot Get StudentList.', error: error.message });
  }
});

//Student Details Update
studentRouter.put('/student', async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      message: 'Encountered An Error',
      error: error.message,
    });
  }
});

//Student Delete Details
studentRouter.delete('/:id', async (req, res) => {
  try {
    Student.findByIdAndRemove(req.params.id).then((student) => {
      if (student) {
        return res
          .status(200)
          .json({ success: true, message: 'Student deleted', student });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'Student not found' });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: 'Cannot Delete Student',
      error: error.message,
    });
  }
});

module.exports = studentRouter;
