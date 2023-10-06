const mongoose = require("mongoose");
const unitRegistrationSchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    academicYear: { type: String, required: true },
    unitRegistred: [
      {
        code: { type: String, required: true, unique: true, upperCase: true },
        title: { type: String, required: true },
        group: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group",
          required: true,
        },
        semister: { type: Number, required: true },
        year: { type: Number, required: true },
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UnitReg = mongoose.model("UnitReg", unitRegistrationSchema);
module.exports = UnitReg;
