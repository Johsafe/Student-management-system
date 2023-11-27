const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../Models/StudentSchema");
studentRouter = express.Router();
const path = require("path");
const { isAuth } = require("../Middleware/Auth");
const { generateToken } = require("../Utils/GenerateToken");
const StudentAttendance = require("../Models/StudentAttendanceSchema");
const validateMongoDbId = require("../Utils/validateMongodbId");
const cloudinary = require("../Utils/cloudinary");
const upload = require("../utils/multer.js");

//register a new Student into a class
studentRouter.post(
  "/student",
  upload.single("studentPhoto"),
  isAuth,
  async (req, res) => {
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
        admission,
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
  }
);

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
  "/group/:groupId/students/:studentId",isAuth,
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
studentRouter.put("/suspend/:studentId",isAuth, async (req, res) => {
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
studentRouter.put("/unsuspend/:studentId",isAuth, async (req, res) => {
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

// // using query params search
studentRouter.get("/search", async (req, res) => {
  const { lastname, firstname, classgroup, admission } = req.query;

  try {
    const student = await Student.findOne({
      lastname: lastname,
      // group: classgroup,
      firstname: firstname,
      admission: admission,
    });

    if (student) {
      res.status(200).json({ message: "Student found", student });
      // res.send(student)
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
studentRouter.put("/student/:studentId",isAuth, async (req, res) => {
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
  upload.single("studentPhoto"),
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

      const studentexist = await Student.findById(req.params.studentId);
      await cloudinary.uploader.destroy(studentexist.cloudinary_id);
      let result;
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
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
studentRouter.patch("/:studentId/pass", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId).select(
      "+password"
    );
    const isPasswordMatched = await student.compare(
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
    return res
      .status(200)
      .json({ success: true, message: "Password change successful", newpass });
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
studentRouter.delete("/student/:studentId",isAuth, async (req, res) => {
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

//get paginated students
studentRouter.get("/pagination", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const result = {};
    const totalstudents = await Student.countDocuments().exec();
    result.totalstudents = totalstudents;

    if (lastIndex < (await Student.countDocuments().exec())) {
      result.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    result.data = await Student.find()
      .populate("group")
      .sort("-_id")
      .skip(startIndex)
      .limit(limit)
      .exec();

    result.rowsPerPage = limit;
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Error in getting paginated students",
      error: error.message,
    });
  }
});

module.exports = studentRouter;
