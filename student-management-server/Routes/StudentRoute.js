const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Student = require('../Models/StudentSchema');
studentRouter = express.Router();
const multer = require('multer');
const shortid = require('shortid');
const Dashboard = require('../Models/DashboardSchema');
const path = require('path');
const { isAuth } = require('../Middleware/Auth');
const { generateToken } = require('../Utils/GenerateToken');

//register a new Student into a class

studentRouter.post('/student', async (req, res) => {
  try {
    const { firstname, lastname, gender, password } = req.body;
    //capitalize admission
    let admission = req.body.admission;
    let adm = admission.toUpperCase();

    //confirm is user exists in the system
    const isStudent = await Student.findOne({ admission });

    if (isStudent) {
      res.status(400);
      throw new Error('Student already exists');
    }
    //create new student
    const student = await Student.create({
      firstname,
      lastname,
      admission: adm,
      group: req.body.group,
      gender,
      password: bcrypt.hashSync(password, 10),
    });
    const newStudent = await student.save();
    if (newStudent) {
      const total_students = (await Student.find()).length;
      await Dashboard.findOneAndUpdate(
        { title: 'Students' },
        { number: total_students }
      );
      res.status(201).send({
        message: 'Student registered successfully',
        total_students,
        // newStudent,
        _id: newStudent.id,
        admission: newStudent.admission,
        group: newStudent.group,
        token: generateToken(newStudent._id),
      });
    } else {
      res.status(500).send({
        message: 'Unable to register student',
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Unable to register student',
      error: error.message,
    });
  }
});

//get all students
studentRouter.get('/students', async (req, res) => {
  try {
    const students = await Student.find({});
    // res.send(students);
    if (students.length > 0) {
      // console.log(students);
      res.json(students);
    } else {
      res.status(404).json({ message: 'No students found.' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting Students.', error: error.message });
  }
});
//get a student
studentRouter.get('/student/:studentId', async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (student) {
      res.send(student);
    } else {
      res.status(404).send({ message: 'student not found' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting student.', error: error.message });
  }
});
//get all student from spaecific group/class
studentRouter.get('/group/:groupId/students', async (req, res) => {
  try {
    const students = await Student.find({ group: req.params.groupId }).select(
      '-password'
    );
    if (students.length > 0) {
      res.send(students);
    } else {
      res.status(404).send({
        message: 'No Student Currently Available. Please Add new Students',
      });
    }
  } catch (error) {
    res.status(500).send({
      message: 'Student not found',
      error: error.message,
    });
  }
});

// the following route is for loading attendance and students info.
// studentRouter.get('/class/:id/attendance', async (req, res) => {
//   const students = await StudentAttendance.findOne({
//     attendance_date: new Date.now(),
//     group: req.params.id,
//   });
//   // console.log("students",students.length())
//   if (students) {
//     console.log(students);

//     res.json(students);
//   } else {
//     res.status(404).json({ message: 'No students found.' });
//   }
// });

//get student by searching the students with the given name ,class and admission
// studentRouter.get('/search/:name/:classgroup/:admission', async (req, res) => {
//   // console.log(req.params.name, req.params.classgroup, req.params.admission)
//   const student = await Student.findOne({
//     lastname: req.params.name,
//     group: req.params.classgroup,
//     admission: req.params.admission,
//   });
//   // res.send(student);
//   res.status(201).send({ message: 'student found', student });

//   if (student) {
//     res.json(student);
//   } else {
//     res.status(404);
//     res.json({ message: 'No student found with the given information.' });
//   }
// });

//update a student by admin
studentRouter.put('/student/:studentId', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        $set: req.body,
      },
      { new: true }
    );

    const newStudent = await student.save();
    res
      .status(201)
      .send({ success: true, message: 'Student updated', newStudent });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: ' Error in Updating Student.',
      error: error.message,
    });
  }
});

//upload student photo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), './uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + '-' + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

//update student profile info
studentRouter.patch(
  '/myprofile/:studentId/update',
  upload.single('studentPhoto'),
  async (req, res) => {
    try {
      const formatKenyanPhoneNumber = (phoneNumber) => {
        // Remove any non-digit
        phoneNumber = phoneNumber.replace(/\D/g, '');

        // phone number has 10 digits
        if (phoneNumber.length === 10) {
          // Remove the"0" and replace it with  (+254)
          phoneNumber = '+254' + phoneNumber.substr(1);
          return phoneNumber;
        }

        // If the phone number doesn't match the above pattern, it is invalid
        return false;
      };
      phone = req.body.phone;
      const phoneNumber = `${phone}`;
      const formattedPhoneNumber = formatKenyanPhoneNumber(phoneNumber);

      if (formattedPhoneNumber) {
        //update a student
        const updateStudent = await Student.findOneAndUpdate(
          { _id: req.params.studentId },
          {
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            gender: req.body.gender,
            DOB: req.body.DOB,
            presentAddress: req.body.presentAddress,
            isValidPhone: req.body.isValidPhone,
            phone: formattedPhoneNumber,
            studentPhoto: req.file.filename,
          },
          //return new updated data
          { new: true }
        );
        const newStudent = await updateStudent.save();
        res.status(201).send({
          success: true,
          message: 'Student updated',
          newStudent,
          token: generateToken(newStudent),
        });
      } else {
        return res.status(404).json({
          success: false,
          message: `Invalid phone number: ${phoneNumber}`,
        });
      }
    } catch (error) {
      res.status(500).send({
        message: 'Failed to update student',
        error: error.message,
      });
    }
  }
);

//update student password
studentRouter.put('/:studentId/pass', async (req, res) => {
  console.log('change pass');

  // try {
  //   const {studentId} =req.params;
  //   const salt = await bcrypt.genSalt(10);
  //   const password = await bcrypt.hash(req.body.password, salt);
  //   const userpass = await Student.findByIdAndUpdate({_id:studentId},{password:password},{new:true});
  //   return res.status(200).json({status:true,data:userpass})
  // } catch (error) {

  // }
  try {
    const student = await Student.findById(req.params.studentId).select(
      '+password'
    );
    const isPasswordMatched = await student.compareSync(
      req.body.oldPassword,
      student.password
    );
    if (!isPasswordMatched) {
      return res.status(400).send('Old Password is incorrect');
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).send('Password not matched with each other');
    }
    student.password = req.body.newPassword;

    const newpass = await student.save();
    res.send(newpass);
  } catch (error) {
    res.status(500).send({
      message: 'failed to update your password!!!',
      error: error.message,
    });
  }
});

//update pass
// studentRouter.post('/:studentId/updatepass',async(req,res)=>{
//   try {
//     const studentId = req.params.studentId;
//     // const password = req.body.password;

//     const data = await Student.findOne({
//       studentId
//     })
//     if(data){
//       // bcrypt.hashSync(password, 10)
//       newpass = await bcrypt.hashSync(password, 10)
//       const user = await Student.findByIdAndUpdate
//       ({studentId},{$set:{password:newpass}});

//       res.status(200).send({success:true,msg:'you changed your pass'})

//     }else{
//       res.status(200).send({success:false,msg:"userid not found"})
//     }

//   } catch (error) {
//     res.status(500).send({
//       message: 'failed to update your password!!!',
//       error: error.message,
//     });

//   }
// })

const fs = require('fs');
const StudentAttendance = require('../Models/StudentAttendanceSchema');
//delete student info with image
studentRouter.delete('/student/:studentId', async (req, res) => {
  try {
    // await Student.findByIdAndDelete({
    //   _id: req.params.studentId,
    // }).then((student) => {
    //   if (student) {
    //     return res
    //       .status(200)
    //       .json({ success: true, message: 'Student removed', student });
    //   } else {
    //     return res
    //       .status(404)
    //       .json({ success: false, message: 'Student not found' });
    //   }
    // });
    await Student.findById({ _id: req.params.studentId }, (err, res) => {
      if (err) return res.status(500).send({ success: false });
      fs.unlink(__dirname + './uploads' + res.image, (err) => {
        if (err) return res.status(500).send({ message: 'Error' });
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Error Student not found',
      error: error.message,
    });
  }
});

//delete student from a assiged class
studentRouter.delete(
  '/group/:groupId/students/:studentId',
  async (req, res) => {
    try {
      await Student.findByIdAndDelete({
        _id: req.params.studentId,
        group: req.params.groupId,
      }).then((student) => {
        if (student) {
          return res
            .status(200)
            .json({ success: true, message: 'Student removed', student });
        } else {
          return res
            .status(404)
            .json({ success: false, message: 'Student not found' });
        }
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Error Student not found',
        error: error.message,
      });
    }
  }
);

//login
studentRouter.post('/login', async (req, res) => {
  try {
    const { admission, password } = req.body;

    if (!admission || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const student = await Student.findOne({ admission }).select('+password');

    if (student && (await bcrypt.compare(password, student.password))) {
      res.send({
        message: 'student authorized',
        admission: student.admission,
        isStudent: student.isStudent,
        firstname: student.firstname,
        lastname: student.lastname,
        _id: student.id,
        token: generateToken(student),
      });
      return;
    }
    res
      .status(401)
      .send({ message: 'Check Admission & Password and try again' });
  } catch (error) {
    res.status(500).send({
      message: 'Check Admission & Password and try again',
      error: error.message,
    });
  }
});

module.exports = studentRouter;
