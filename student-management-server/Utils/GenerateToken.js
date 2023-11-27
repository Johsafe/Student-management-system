const jwt = require("jsonwebtoken");

exports.generateToken = (student) => {
  return jwt.sign(
    {
      _id: student._id,
      admission: student.admission,
      firstname: student.firstname,
    },

    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};
