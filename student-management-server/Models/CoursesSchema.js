const mongoose = require('mongoose');

const CoursesSchema = mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  // group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' ,required:true}],
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  semister: { type: Number, required: true },
  year: { type: Number, required: true },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const Courses = mongoose.model('Course', CoursesSchema);
module.exports = Courses;
