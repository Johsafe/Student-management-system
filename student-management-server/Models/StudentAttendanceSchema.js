const mongoose = require("mongoose");

const StudentAttendanceSchema = mongoose.Schema(
  {
    attendanceDate: {
      type: Date,
      default: Date.now(),
    },
    academicYear: { type: String, required: true },
    subjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
      unique: true,
    },
    students: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true,
        },
        attendance: {
          type: String,
          enum: ["present", "absent", "excused"],
          default: "absent",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const StudentAttendance = mongoose.model(
  "StudentAttendance",
  StudentAttendanceSchema
);
module.exports = StudentAttendance;
