const mongoose = require('mongoose');

const ExamDateSchema = mongoose.Schema({
  month: { type: String, required: true },
  date: { type: Date, required: true },
  day: { type: String, required: true },
});

const ExamDate = mongoose.model('ExamDate', ExamDateSchema);
module.exports = ExamDate;
