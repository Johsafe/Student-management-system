const mongoose = require('mongoose');

const classGroupSchema = mongoose.Schema({
  abbr: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  numberOfStudents: {
    type: Number,
    trim: true,
    minlength: 3,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Group = mongoose.model('Group', classGroupSchema);

module.exports = Group;
