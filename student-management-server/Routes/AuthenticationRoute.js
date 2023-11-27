const express = require("express");
const Authenticate = require("../Models/AuthenticationSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuth = require("../Middleware/Auth");
const authRouter = express.Router();
const sendEmail = require("../Utils/sendEmail");
const { generateToken } = require("../Utils/GenerateToken");
const tokenSchema = require("../Models/tokenSchema");
const crypto = require("crypto");

//Create new User

authRouter.post("/create", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    //confirm is user exists in the system
    const userExists = await Authenticate.findOne({ email });
    if (userExists)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    // create new user
    const user = await Authenticate.create({
      firstname,
      lastname,
      email,
      password: bcrypt.hashSync(password, 10),
    });

    const newuser = await user.save();
    const token = await new tokenSchema({
      userId: newuser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();
    const url = `${process.env.BASE_URL}authenicate/${newuser.id}/verify/${token.token}`;
    await sendEmail(newuser.email, "Verify Email", url);
    res.status(201).send({
      newuser,
      message: "An Email sent to your account please verify",
    });
    res.status(201).json(newuser);
  } catch (error) {
    res.status(500).send({
      message: "User registration failure",
      error: error.message,
    });
  }
});

//verify mail
authRouter.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await Authenticate.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await tokenSchema.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await Authenticate.updateOne({ _id: user._id, verified: true });
    await token.deleteOne();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Email Verification Failure",
      error: error.message,
    });
  }
});

//login
//check if email is verified (login) if not resend email
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const user = await Authenticate.findOne({ email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Email or Password" });

    if (!user.verified) {
      let token = await tokenSchema.findOne({ userId: user._id });
      if (!token) {
        token = await new tokenSchema({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const url = `${process.env.BASE_URL}authenicate/${user.id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);
        // await sendEmail(
        //   user.email,
        //   user.firstname  ,
        //   "Please confirm your account",
        //   // url
        //   text
        // );
      }
      return res
        .status(400)
        .send({ message: "An Email sent to your account please verify" });
    }

    const token = generateToken(user);
    res.status(200).send({ token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({
      message: "Encountered An Error",
      error: error.message,
    });
  }
});

//get users
authRouter.get("/users", async (req, res) => {
  try {
    const userList = await Authenticate.find().select("-password");
    res.send(userList);
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting userList.", error: error.message });
  }
});

//User Details Update
authRouter.put("/profile", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send({
      message: "Encountered An Error",
      error: error.message,
    });
  }
});

//User Delete Details
authRouter.delete("/:userId", async (req, res) => {
  try {
    Authenticate.findByIdAndRemove(req.params.userId).then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "user deleted", user });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "user not found" });
      }
    });
  } catch (error) {
    res.status(500).send({
      message: "Cannot Delete User",
      error: error.message,
    });
  }
});

//forgot-password

authRouter.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await Authenticate.findOne({ email });
  if (!user) return res.status(401).send({ message: "Invalid Email" });

  const token = user.generateToken();
  const url = `${process.env.BASE_URL}authenicate/reset_password/${user.id}/${token.token}`;
  await sendEmail(user.email, "Reset Password", url);
  res.status(201).send({
    user,
    message: "An Email sent to your account",
  });
});

//reset password
authRouter.post("/reset-password/:userId/:token", (req, res) => {
  const { userId, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, "jwt_secret_key", (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          UserModel.findByIdAndUpdate({ _id: userId }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});
module.exports = authRouter;
