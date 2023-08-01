const mongoose = require('mongoose');

const StudentAttendanceSchema = mongoose.Schema({
  attendance_date: {
    type: Date,
    default: Date.now(),
  },
  group:{
    type: String,
    required: true,
  },
  students: [
    {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      admission: { type: String, required: true, unique: true },
      group: {
        type: String,
        required: true,
      },
      present: {
        type: Boolean,
        default: false,
        required: true,
      },
    },
    {
      timestamps: true,
    },
  ],
});

const StudentAttendance = mongoose.model(
  'StudentAttendance',
  StudentAttendanceSchema
);
module.exports = StudentAttendance;
