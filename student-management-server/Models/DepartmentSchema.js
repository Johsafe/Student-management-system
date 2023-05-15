const mongoose = require('mongoose');

const DepartmentSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    academicyear: { type: String, required: true },
    month: { type: String, required: true },
    school: { type: String, required: true },
});

const Department = mongoose.model('Department', DepartmentSchema);
module.exports = Department;