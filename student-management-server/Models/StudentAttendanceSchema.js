const mongoose = require('mongoose');

const StudentAttendanceSchema = mongoose.Schema({
  attendanceDate: {
    type: Date,
    default: Date.now(),
  },
  group:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
    unique:true,
  },
  students: [
    {
      firstname: { type: String, required: true },
      lastname: { type: String, required: true },
      admission: { type: String, required: true, unique: true },
      // group: {
      //   type: String,
      //   required: true,
      // },
      status: {
        type: String,
        enum: ['present', 'absent'],
        default: 'absent',
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
