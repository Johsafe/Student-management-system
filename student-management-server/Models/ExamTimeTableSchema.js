const mongoose = require('mongoose');

const ExamTimetableSchema = mongoose.Schema({
  //timetable details
  title: { type: String, required: true, unique: true },
  academicYear: { type: String, required: true },
  month: { type: String, required: true },
  examStartdate:{ type: Date, required: true },
  examStopdate:{ type: Date, required: true },

  //exam days
  examdate :{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamDate',
    required: true,
  },

  //exam time
  timeOfday:{type:String ,required:true}, // morining ,afternoon ,evening
  period:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Period',
    required: true,
  },

  //groups taking the exam
  group:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },

  //exam units and others
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Courses',
    required: true,
  },
  year:{
    type:Number, required:true
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  noofexaminas: { type: Number, required: true, min: 1, max: 500 },
  invigilator: {
    invigilator1: { type: String },
    invigilator2: { type: String },
    invigilator3: { type: String },
    invigilator4: { type: String },
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

const ExamTimetable = mongoose.model('ExamTimetable', ExamTimetableSchema);
module.exports = ExamTimetable;
