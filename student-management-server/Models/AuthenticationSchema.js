const mongoose = require('mongoose');

const authenticationSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
    validate: {
      validator: function (emailUsed) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailUsed);
      },
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: { type: String, required: true, minLength: 6 },
  isAdmin: { type: Boolean, required: true, default: false },
  status: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending',
  },
  isEmailVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Authenticate = mongoose.model('Authenticate', authenticationSchema);
module.exports = Authenticate;

// confirmationCode: {
//   type: String,
//   unique: true,
// },
