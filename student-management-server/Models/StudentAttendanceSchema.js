const mongoose = require("mongoose");

const StudentAttendanceSchema = mongoose.Schema(
  {
    attendanceDate: {
      type: Date,
      default: Date.now(),
    },
    // academicYear: { type: String, required: true },
    // courseId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Course",
    //   required: true,
    //   unique: true,
    // },
    attendanceRecords: [
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
    // department: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Department",
    //   required: true,
    // },
    // yearOfStudy: { type: Number, required: true, trim: true, minlength: 1 },
    // dateOfLecture: { type: Date, default: Date.now(), required: true },
    // topicCovered: { type: String, required: true },
    // lecturerName: { type: String, required: true },
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
