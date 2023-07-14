const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
  title: { type: String, required: true, unique: true },
  abbr: { type: String, required: true },
});

const Department = mongoose.model('Department', DepartmentSchema);
module.exports = Department;
