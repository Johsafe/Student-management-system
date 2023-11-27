const mongoose = require("mongoose");
const CourseEnrollSchema = mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    academicYear: { type: String },
    enrolledCourses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UnitReg = mongoose.model("EnrollCourses", CourseEnrollSchema);
module.exports = UnitReg;
