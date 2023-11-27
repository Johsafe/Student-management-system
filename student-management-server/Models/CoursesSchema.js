const mongoose = require("mongoose");

const CoursesSchema = mongoose.Schema({
  code: { type: String, required: true, unique: true, upperCase: true },
  title: { type: String, required: true },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  semister: { type: String, required: true },
  year: { type: Number, required: true },
  // students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Courses = mongoose.model("Course", CoursesSchema);
module.exports = Courses;
