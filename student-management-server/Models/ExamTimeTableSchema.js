const mongoose = require('mongoose');

const ExamTimetableSchema = mongoose.Schema({
  session: { type: Number, required: true },
  starttime: { type: String, required: true },
  stoptime: { type: String, required: true },
  noofexaminas: { type: Number, required: true, min: 1, max: 500 },
  invigilator: {
    invigilator1: { type: String },
    invigilator2: { type: String },
    invigilator3: { type: String },
    invigilator4: { type: String },
  },
  examdate :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamDate',
    required: true,
  },
  //   {
  //     month: { type: String, required: true },
      
  //     },
  //   },
  // ],
  group:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  // [
  //   {
  //     abbr: { type: String, required: true },
  //     groupId:
  //   },
  // ],
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses',
    required: true,
  },
  // [
  //   {
  //     code: { type: String, required: true },
  //     courseId: 
  //   },
  // ],
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  // [
  //   {
  //     title: { type: String, required: true },
  //     roomId: 
  //   },
  // ],
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const ExamTimetable = mongoose.model('ExamTimetable', ExamTimetableSchema);
module.exports = ExamTimetable;
