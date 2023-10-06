const mongoose = require("mongoose");

const ExamTitleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },
  academicYear: { type: String, required: true },
  month: { type: String, required: true },
  examStartdate: { type: Date, required: true },
  examStopdate: { type: Date, required: true },
});

const ExamTitle = mongoose.model("ExamTitle", ExamTitleSchema);
module.exports = ExamTitle;
