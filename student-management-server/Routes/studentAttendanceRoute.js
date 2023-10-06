const express = require("express");
const StudentAttendance = require("../Models/StudentAttendanceSchema");
const Courses = require("../Models/CoursesSchema");
const attendanceRouter = express.Router();

//create new attendance
attendanceRouter.post("/attendance", async (req, res) => {
  try {
    const { attendanceDate, academicYear, subjectId, } = req.body;
    const attendance = new StudentAttendance({
      attendanceDate,
      academicYear,
      subjectId,
    });
    const attend = await attendance.save();
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
    res
      .status(500)
      .send({
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
      attendanceDate: new Date(),
      group: req.params.groupId,
    });
    if (students) {
      res.json(students);
    } else {
      res.status(404).json({ message: "No students found." });
    }
  } catch (error) {
    res
      .status(500)
      .send({
        message: " Error in getting attendances.",
        error: error.message,
      });
  }
});

// get an attendance for a perticular student

attendanceRouter.get("/studentId", async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .send({
        message: " Error in getting attendances.",
        error: error.message,
      });
  }
});

// get an attendance for a perticular course/subject

attendanceRouter.get("/courseId", async (req, res) => {
  try {
  } catch (error) {
    res
      .status(500)
      .send({
        message: " Error in getting attendances.",
        error: error.message,
      });
  }
});

module.exports = attendanceRouter;
