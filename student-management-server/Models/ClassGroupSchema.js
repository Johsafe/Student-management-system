const mongoose = require("mongoose");

const classGroupSchema = mongoose.Schema({
  // classPhoto: {
  //   public_id: {
  //     type: String,
  //     required: true,
  //   },
  //   url: {
  //     type: String,
  //     required: true,
  //   },
  // },
    classPhoto: {
    type: String,
    },
    cloudinary_id: {
    type: String,
    },
  abbr: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  numberOfStudents: {
    type: Number,
    trim: true,
    minlength: 3,
  },
  academicYear: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Group = mongoose.model("Group", classGroupSchema);

module.exports = Group;
