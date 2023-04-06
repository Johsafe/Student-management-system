const mongoose = require('mongoose');

const ExamTimetableSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  academicyear: { type: String, required: true },
  month: { type: String, required: true },
  department: { type: String, required: true },

  examdate: { type: Date, required: true },
  
  starttime: { type: String, required: true },
  stoptime: { type: String, required: true },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses',
    required: true,
  },
  room: { type: String, required: true },
  noofexaminas: { type: Number, required: true, min: 1, max: 500 },
  invigilator: { type: String, required: true},
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const ExamTimetable = mongoose.model('ExamTimetable', ExamTimetableSchema);
module.exports = ExamTimetable;
