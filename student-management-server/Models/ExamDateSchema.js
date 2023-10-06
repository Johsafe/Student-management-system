const mongoose = require("mongoose");

const ExamDateSchema = mongoose.Schema({
  month: { type: String, required: true },
  date: { type: Date, required: true },
  day: { type: String, required: true },
  week: { type: String, required: true },
  // timeOfday: { type: String, required: true, unique: true },
  // examTaken: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExamTimetable" }],
});

const ExamDate = mongoose.model("ExamDate", ExamDateSchema);
module.exports = ExamDate;
