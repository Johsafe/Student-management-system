const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    studentPhoto: {
      type: String,
    },
    cloudinary_id: {
      type: String,
    },
    email: {
      type: String,
      lowerCase: true,
      // unique: true,
      validate: {
        validator: function (emailUsed) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailUsed);
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: {
      type: String,
      trim: true,
      required: [true, "Please add a Password"],
      // minlength: [6, 'password must have at least six(6) characters'],
      // match: [
      //     /^(?=.*\d)(?=.*[@#\-_$%^&+=§!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=§!\?]+$/,
      //     'Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and a special characters'
      // ]
    },
    admission: { type: String, required: true, unique: true },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    gender: { type: String },
    DOB: { type: String },
    presentAddress: { type: String },
    isStudent: { type: Boolean, default: true },
    phone: { type: Number },
    isValidPhone: { type: Boolean, default: false },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    // attendance: {
    //   type: String,
    //   enum: ["present", "absent", "excused"],
    //   default: "absent",
    // },
    //   enrolledCourses:[
    //     {
    //         type:mongoose.Schema.Types.ObjectId,
    //         ref:"Courses"
    //     }
    // ],
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
