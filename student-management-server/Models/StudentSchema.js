const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    lowerCase: true,
    default:"student@gmail.com",
    validate: {
      validator: function (emailUsed) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailUsed);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: { type: String, required: true, minLength: 6 },
  admission: { type: String, required: true, unique: true },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  },
  gender: { type: String },
  school: { type: String },
});

const Student = mongoose.model('Student', StudentSchema);
module.exports = Student;
