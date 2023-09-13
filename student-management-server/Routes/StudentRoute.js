const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../Models/StudentSchema");
studentRouter = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const Dashboard = require("../Models/DashboardSchema");
const path = require("path");
const { isAuth } = require("../Middleware/Auth");
const { generateToken } = require("../Utils/GenerateToken");
const StudentAttendance = require("../Models/StudentAttendanceSchema");
const validateMongoDbId = require("../Utils/validateMongodbId");
const cloudinary = require("../Utils/cloudinary");
const upload = require("../utils/multer.js");

//register a new Student into a class
studentRouter.post("/student", upload.single("image"), async (req, res) => {
  try {
    const { firstname, lastname, gender, password } = req.body;
    //capitalize admission
    let admission = req.body.admission;
    let adm = admission.toUpperCase();

    //confirm is user exists in the system
    const isStudent = await Student.findOne({ admission });

    if (isStudent) {
      res.status(400);
      throw new Error("Student already exists");
    }
    //create new student
    const result = await cloudinary.uploader.upload(req.file.path);
    const student = await Student.create({
      firstname,
      lastname,
      admission: adm,
      group: req.body.group,
      gender,
      password: bcrypt.hashSync(password, 10),
      studentPhoto: result.secure_url,
      cloudinary_id: result.public_id,
    });
    const newStudent = await student.save();
    if (newStudent) {
      res.status(201).send({
        message: "Student registered successfully",
        // newStudent,
        _id: newStudent.id,
        admission: newStudent.admission,
        group: newStudent.group,
        token: generateToken(newStudent._id),
      });
    } else {
      res.status(500).send({
        message: "Unable to register student",
        error: error.message,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Unable to register student",
      error: error.message,
    });
  }
});

//get all students
studentRouter.get("/students", async (req, res) => {
  try {
    const students = await Student.find({}).populate("group");
    // res.send(students);
    if (students.length > 0) {
      res.json(students);
    } else {
      res.status(404).json({ message: "No students found.Please add student" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting Students.", error: error.message });
  }
});
//get a student by id
studentRouter.get("/student/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).populate(
      "group"
    );
    if (student) {
      res.send(student);
    } else {
      res.status(404).send({ message: "student not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting student.", error: error.message });
  }
});
//get all student from spaecific group/class
studentRouter.get("/group/:groupId/students", async (req, res) => {
  try {
    const students = await Student.find({ group: req.params.groupId })
      .populate("group")
      .select("-password");
    if (students.length > 0) {
      res.send(students);
    } else {
      res.status(404).send({
        message: "No Student Currently Available. Please Add new Students",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Student not found",
      error: error.message,
    });
  }
});

//search for student
studentRouter.get("/search/:key", async (req, res) => {
  try {
    let student = await Student.find({
      $or: [
        { lastname: { $regex: req.params.key } },
        { firstname: { $regex: req.params.key } },
        { admission: { $regex: req.params.key } },
      ],
    });
    res.send(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while searching for the student." });
  }
});

//delete student from a assiged class
studentRouter.delete(
  "/group/:groupId/students/:studentId",
  async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(student.cloudinary_id);
      await Student.findByIdAndDelete({
        _id: req.params.studentId,
        group: req.params.groupId,
      }).then((student) => {
        if (student) {
          return res
            .status(200)
            .json({ success: true, message: "Student removed", student });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "Student not found" });
        }
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: "Error Student not found",
        error: error.message,
      });
    }
  }
);

//login
studentRouter.post("/login", async (req, res) => {
  try {
    const { admission, password } = req.body;

    if (!admission || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const student = await Student.findOne({ admission }).select("+abbr");

    if (student && (await bcrypt.compare(password, student.password))) {
      res.send({
        message: "student authorized",
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
      .send({ message: "Check Admission & Password and try again" });
  } catch (error) {
    res.status(500).send({
      message: "Check Admission & Password and try again",
      error: error.message,
    });
  }
});

//suspend  student from a specific class
studentRouter.put("/suspend/:studentId", async (req, res) => {
  // const { id } = req.params;
  // validateMongoDbId(id);

  try {
    const blockusr = await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json(blockusr);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: " Error in blocking Student.",
      error: error.message,
    });
  }
});

//unblock / not suspend student
studentRouter.put("/unsuspend/:studentId", async (req, res) => {
  try {
    const unblock = await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "Student UnBlocked",
      unblock,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: " Error in Unblocking Student.",
      error: error.message,
    });
  }
});

//get the number of all students
studentRouter.get(`/studentcount`, async (req, res) => {
  const studentCount = await Student.countDocuments({});
  if (studentCount) {
    res.json(studentCount);
  } else {
    res.status(404).json({ message: "No Students" });
  }
});

// :classgroup
///:admission
//get student by searching the students with the given name ,class and admission
// studentRouter.get('/search/:name', async (req, res) => {
//   // console.log(req.params.name, req.params.classgroup, req.params.admission)
//   const student = await Student.findOne({
//     lastname: req.params.name,
//     // group: req.params.classgroup,
//     // admission: req.params.admission,
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

// // using query params search
studentRouter.get("/search", async (req, res) => {
  const { name, classgroup, admission } = req.query;

  try {
    const student = await Student.findOne({
      lastname: name,
      // group: classgroup,
      admission: admission,
    });

    if (student) {
      res.status(200).json({ message: "Student found", student });
    } else {
      res
        .status(404)
        .json({ message: "No student found with the given information." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while searching for the student." });
  }
});

//update a student by admin
studentRouter.put("/student/:studentId", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      {
        $set: req.body,
      },
      { new: true }
    ).populate("group");

    const newStudent = await student.save();
    res
      .status(201)
      .send({ success: true, message: "Student updated", newStudent });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: " Error in Updating Student.",
      error: error.message,
    });
  }
});

//update student profile info
studentRouter.put(
  "/myprofile/:studentId/update",
  upload.single("image"),
  async (req, res) => {
    try {
      //add phone nummber +254 format
      const formatKenyanPhoneNumber = (phoneNumber) => {
        // Remove any non-digit
        phoneNumber = phoneNumber.replace(/\D/g, "");

        if (phoneNumber.length === 10) {
          // Remove the"0" and replace it with  (+254)
          phoneNumber = "+254" + phoneNumber.substr(1);
          return phoneNumber;
        }
        // If the phone number doesn't match the above pattern, it is invalid
        return false;
      };
      phone = req.body.phone;
      const phoneNumber = `${phone}`;
      const formattedPhoneNumber = formatKenyanPhoneNumber(phoneNumber);

      // if (formattedPhoneNumber) {
      //   res.status(201).send({
      //     success: true,
      //     message: "Student PHone Number Updated",
      //   });
      // } else {
      //   return res.status(404).json({
      //     success: false,
      //     message: `Invalid phone number: ${phoneNumber}`,
      //   });
      // }

      const studentexist = await Student.findById(req.params.studentId);
      await cloudinary.uploader.destroy(studentexist.cloudinary_id);
      const result = await cloudinary.uploader.upload(req.file.path);
      //update a student

      const data = {
        email: req.body.email || studentexist.email,
        firstname: req.body.firstname || studentexist.firstname,
        lastname: req.body.lastname || studentexist.lastname,
        gender: req.body.gender || studentexist.gender,
        DOB: req.body.DOB || studentexist.DOB,
        presentAddress: req.body.presentAddress || studentexist.presentAddress,
        phone: formattedPhoneNumber || studentexist.formattedPhoneNumber,
        studentPhoto: result.secure_url || studentexist.studentPhoto,
        cloudinary_id: result.public_id || studentexist.cloudinary_id,
      };
      const updateStudent = await Student.findOneAndUpdate(
        { _id: req.params.studentId },
        data,
        //return new updated data
        { new: true }
      );
      const newStudent = await updateStudent.save();
      res.status(201).send({
        success: true,
        message: "Student updated",
        newStudent,
        token: generateToken(newStudent),
      });
    } catch (error) {
      res.status(500).send({
        message: "Failed to update student",
        error: error.message,
      });
    }
  }
);

//update student password
studentRouter.put("/:studentId/pass", async (req, res) => {
  // console.log('change pass');

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
      "+password"
    );
    const isPasswordMatched = await student.compareSync(
      req.body.oldPassword,
      student.password
    );
    if (!isPasswordMatched) {
      return res.status(400).send("Old Password is incorrect");
    }
    if (req.body.newPassword !== req.body.confirmPassword) {
      return res.status(400).send("Password not matched with each other");
    }
    student.password = req.body.newPassword;

    const newpass = await student.save();
    res.send(newpass);
  } catch (error) {
    res.status(500).send({
      message: "failed to update your password!!!",
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

//delete student info with image
studentRouter.delete("/student/:studentId", async (req, res) => {
  try {
    const stu = await Student.findById(req.params.studentId);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(stu.cloudinary_id);
    await Student.findByIdAndDelete({
      _id: req.params.studentId,
    }).then((student) => {
      if (student) {
        return res
          .status(200)
          .json({ success: true, message: "Student removed", student });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Student not found" });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error Student not found",
      error: error.message,
    });
  }
});

//Attendance routes
//the following route is for marking attendance
studentRouter.post("/mark", async (req, res) => {
  try {
    const { group, students } = req.body;
    const attendance = new StudentAttendance({
      group,
      students,
    });
    const attend = await attendance.save();
    res.status(201).json({ message: "Attendance marked successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while marking student attendance." });
  }
});

// the following route is for loading attendance and students info.
studentRouter.get("/class/:groupId/attendance", async (req, res) => {
  // if (!mongoose.isValidObjectId(req.params.groupId)) {
  //   return res.status(400).send('Invalid group Id');
  // }
  const students = await StudentAttendance.findOne({
    attendanceDate: new Date(),
    // new Date()
    group: req.params.groupId,
  });
  // console.log("students",students.length())

  // if (students.length === 0) {
  //   return res.status(404).json({ message: 'No attendance records found for the group.' });
  // }

  // res.json(students);
  if (students) {
    console.log(students);

    res.json(students);
  } else {
    res.status(404).json({ message: "No students found." });
  }
});

//the following route is for getting all attendance marked
studentRouter.get("/attendance", async (req, res) => {
  try {
    const attendance = await StudentAttendance.find({});
    res.send(attendance);
  } catch (error) {
    res.status(500).json({ message: "no attendance found" });
  }
});

module.exports = studentRouter;
