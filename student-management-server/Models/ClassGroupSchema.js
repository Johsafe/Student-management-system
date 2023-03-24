const mongoose = require('mongoose');

const classGroupSchema = mongoose.Schema(
  {
    abbr: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    updatedAt: Date,
  },
  {
    timestamps: true,
  }
);

const Group = mongoose.model('Group', classGroupSchema);

module.exports = Group;
