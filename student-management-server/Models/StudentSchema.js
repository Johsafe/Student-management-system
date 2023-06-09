const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  studentPhoto: { type: String },
  email: {
    type: String,
    lowerCase: true,
    unique: true,
    validate: {
      validator: function (emailUsed) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailUsed);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  admission: { type: String, required: true, unique: true },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: true,
  },
  gender: { type: String },
  DOB: { type: String },
  presentAddress: { type: String },
  isStudent: { type: Boolean, default: true },
  phone: { type: Number },
  isValidPhone: { type: Boolean, default: false },
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
