const express = require("express");
const StudentAttendance = require("../Models/StudentAttendanceSchema");
const Courses = require("../Models/CoursesSchema");
const attendanceRouter = express.Router();
const moment = require("moment");

// using query params search course
attendanceRouter.get("/search", async (req, res) => {
  const { courseId } = req.query;
  try {
    const course = await Courses.findOne({
      course: courseId,
    }).populate("department group students");

    if (course) {
      res.status(200).json({ message: "course found", course });
    } else {
      res
        .status(404)
        .json({ message: "Course does not exist." });
    }
  } catch (error) {
    res.status(500).send({
      message: " Error in getting course details.",
      error: error.message,
    });
  }
});
////create new attendance
attendanceRouter.post("/attendance", async (req, res) => {
  try {
    const attendanceData = req.body.attendanceData;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const attendanceDate = moment(formattedDate, "D/M/YYYY").toDate();

    var isAttendance = await StudentAttendance.find({
      date: new Date().toJSON().slice(0, 10),
    });

    if (isAttendance) {
      res.status(400);
      throw new Error("Student already exists");
    }

    // Create attendance records for each student
    const attendanceRecords = attendanceData.map((data) => ({
      studentId: data.studentId,
      attendance: data.attendance,
    }));
    StudentAttendance.findOneAndUpdate(
      { attendanceDate },
      { $set: { attendanceRecords } },
      { upsert: true, new: true }
    ).then(() => {
      res.status(200).send("Attendance recorded successfully");
    });
    // const { attendanceDate, academicYear, subjectId, } = req.body;
    // const attendance = new StudentAttendance({
    //   attendanceDate,
    //   academicYear,
    //   subjectId,
    // });
    // const attend = await attendance.save();
    // res.status(201).json({ message: "Attendance marked successfully." ,attendace});

    // get students registered for the Courses
    const stud = await StudentAttendance.findOne({
      _id: attend.id,
    });
    // res.send(stud);
    if (stud) {
      res.json(stud.students);
    } else {
      res.status(404).json({ message: "No students found." });
    }
  } catch (error) {
    res.status(500).send({
      message: " Error in Creating Attendance.",
      error: error.message,
    });
  }
});

//get attenadances
attendanceRouter.get("/attendances", async (req, res) => {
  try {
    const attendances = await StudentAttendance.find({});
    res.send(attendances);
  } catch (error) {
    res.status(500).send({
      message: " Error in getting attendances.",
      error: error.message,
    });
  }
});

//get an attendance
attendanceRouter.get("/:attendanceId", async (req, res) => {
  try {
    const attendance = await attendance.findById(req.params.attendanceId);
    if (attendance) {
      res.send(attendance);
    } else {
      res.status(404).send({ message: "attendance not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting attendance.", error: error.message });
  }
});

// get an attendance for a perticular class
attendanceRouter.get("/groupId", async (req, res) => {
  try {
    const students = await StudentAttendance.findOne({
      // attendanceDate: new Date(),
      group: req.params.groupId,
    });
    if (students) {
      res.json(students);
    } else {
      res.status(404).json({ message: "No students found." });
    }
  } catch (error) {
    res.status(500).send({
      message: " Error in getting attendances.",
      error: error.message,
    });
  }
});

// get an attendance for a perticular student

attendanceRouter.get("/studentId", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      message: " Error in getting attendances.",
      error: error.message,
    });
  }
});
// get an attendance for a perticular course

attendanceRouter.get("/courseId", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      message: " Error in getting attendances.",
      error: error.message,
    });
  }
});
// get an attendance for a perticular date

attendanceRouter.get("/date", async (req, res) => {
  try {
    const date = req.body.date || Date().toString().substring(0, 15);
    const attendance = await StudentAttendance.findOne({
      date: date,
    });
    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404);
      throw new Error(`You didn't take attendance ${date}!!`);
    }
  } catch (error) {
    res.status(500).send({
      message: " Error in getting attendances.",
      error: error.message,
    });
  }
});

module.exports = attendanceRouter;
