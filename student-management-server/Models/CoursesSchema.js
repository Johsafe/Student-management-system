const mongoose = require('mongoose');

const CoursesSchema = mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
    semester: { type: Number, required: true },
    year: { type: Number, required: true },
    createdAt: Date,
  },
  {
    timestamps: true,
  }
);

const Courses = mongoose.model('Courses', CoursesSchema);
module.exports = Courses;
