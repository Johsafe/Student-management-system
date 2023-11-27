const express = require("express");
const Courses = require("../Models/CoursesSchema");
const Student = require("../Models/StudentSchema");
const UnitReg = require("../Models/CourseEnrollSchema");
const unitRegRouter = express.Router();

// //add student to course
// unitRegRouter.post("/unitreg", async (req, res) => {
//   const { studentId, courseId } = req.body;

//   try {
//     const course = await Courses.findOne(req.params.courseId)
//     if (course == null) {
//       return res.status(404).json({ error: "Course not found" })
//     }
//     const user = await Student.findById(studentId)
//     if (user == null) {
//       return res.status(404).json({ error: "Student not found" })
//     }
//     if (course.students.includes(user.id)) {
//       return res.status(400).json({ error: "You've already registered for the course" })
//     }
//     const result = await Courses.updateOne(
//       { _id: courseId },
//       { $push: { students: studentId } },
//       { new: true }
//     );
//     return res
//     .status(200)
//     .json({ success: true, message: "course registration success", result });
//   } catch (error) {
//     res.status(500).send({
//       message: ' Error in Unit Regestration.',
//       error: error.message,
//     });
//   }
// });

//add student to course
unitRegRouter.post("/unitreg", async (req, res) => {
  try {
    const { id,studentId } = req.body;
    const enroll = await UnitReg.findOne({ enrolledCourses: id });
    if (enroll) {
      return res.status(200).json({
        success: true,
        message: "You've already registered for the course",
        enroll,
      });
    } else {
      const result = new UnitReg({
        studentId: studentId,
        enrolledCourses: id,
      });
      result.save();
      return res.status(200).json({
        success: true,
        message: "course registration success",
        result,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: " Error in Unit Regestration.",
      error: error.message,
    });
  }
});

//remove student from course
unitRegRouter.post("/remove", async (req, res) => {
  const { studentId, courseId } = req.body;

  try {
    const course = await Courses.findOne(req.params.courseId);
    if (course == null) {
      return res.status(404).json({ error: "Course not found" });
    }
    const student = await Student.findById(studentId);
    if (student == null) {
      return res.status(404).json({ error: "student not found" });
    }
    if (!course.students.includes(student.id)) {
      return res
        .status(400)
        .json({ error: "You need to register for the course" });
    }
    const result = await Courses.updateOne(
      { _id: courseId },
      // { $push: { students: studentId } },
      {
        students: course.students.filter(
          (students) => !students.equals(student.id)
        ),
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "student removed from course", result });
  } catch (error) {
    res.status(500).send({
      message: "students course registration failed",
      error: error.message,
    });
  }
});
// get enrolled student courses
// unitRegRouter.get("/unitreg/:studentId", async (req, res) => {
//   try {
//     const student = await UnitReg.findById(req.params.studentId)
//     // .populate(
//     //   "course"
//     // );
//     if (student) {
//       res.send(student);
//     } else {
//       res.status(404).send({ message: "student not found" });
//     }
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: " Error in getting student.", error: error.message });
//   }
// });

unitRegRouter.get('/unitreg', async (req, res) => {
  try {
    const rooms = await UnitReg.find({});
    res.send(rooms);
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting Rooms.', error: error.message });
  }
});
// get  unitreg for a particular student
unitRegRouter.get("/unitreg/:studentId", async (req, res, next) => {
  try {
    const result = await UnitReg.find({
      // filtering or querying data to find student record
      studentId: { $in: req.params.studentId },
    }).populate("courses students");
    res.send(result);
  } catch (err) {
    next(err);
  }
});

module.exports = unitRegRouter;
