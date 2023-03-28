const mongoose = require('mongoose');

const classGroupSchema = mongoose.Schema({
  abbr: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Group = mongoose.model('Group', classGroupSchema);

module.exports = Group;
