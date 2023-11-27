const express = require("express");
const Group = require("../Models/ClassGroupSchema.js");
const Courses = require("../Models/CoursesSchema.js");
const Student = require("../Models/StudentSchema.js");
const groupRouter = express.Router();
const upload = require("../utils/multer.js");
const cloudinary = require("../Utils/cloudinary.js");
const path = require("path");
const { isAuth } = require("../Middleware/Auth.js");

// *add a new group image with cloudinary*
groupRouter.post("/group",isAuth, upload.single("classPhoto"), async (req, res) => {
  const {
    abbr,
    title,
    description,
    numberOfStudents,
    classPhoto,
    academicYear,
  } = req.body;
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const classGroup = await Group.create({
      abbr,
      title,
      description,
      numberOfStudents,
      academicYear,
      classPhoto: result.secure_url,
      cloudinary_id: result.public_id,
    });
    const newGroup = await classGroup.save();
    res.status(201).json({
      success: true,
      newGroup,
    });
  } catch (error) {
    res.status(500).send({
      message: " Error in Creating ClassGroup.",
      error: error.message,
    });
  }
});

//get classGroup
groupRouter.get("/group", async (req, res) => {
  try {
    const group = await Group.find();
    res.send(group);
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting ClassGroup.", error: error.message });
  }
});

//get a classGroup
groupRouter.get("/group/:groupId", async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (group) {
      res.send(group);
    } else {
      res.status(404).send({ message: "classGroup not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting ClassGroup.", error: error.message });
  }
});

//update class + image
groupRouter.put("/group/:groupId",isAuth, upload.single("classPhoto"), async (req, res) => {
  try {
    const groupexist = await Group.findById(req.params.groupId);
    await cloudinary.uploader.destroy(groupexist.cloudinary_id);
    // Upload new image to cloudinary
    let result;
    if(req.file){
      result = await cloudinary.uploader.upload(req.file.path);
    }
    // const result = await cloudinary.uploader.upload(req.file.path);
    const data = {
      abbr: req.body.abbr || groupexist.abbr,
      classPhoto: result?.secure_url || groupexist.classPhoto,
      cloudinary_id: result?.public_id || groupexist.cloudinary_id,
      title: req.body.title || groupexist.title,
      description: req.body.description || groupexist.description,
      numberOfStudents: req.body.numberOfStudents || groupexist.numberOfStudents,
      academicYear: req.body.academicYear || groupexist.academicYear,
    };
    const group = await Group.findByIdAndUpdate(req.params.groupId, data, {
      new: true,
    });
    const newGroup = await group.save();
    res.status(201).send({ success: true, message: "Group updated", newGroup });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: " Error in Updating ClassGroup.",
      error: error.message,
    });
  }
});

//delete class + profile image
groupRouter.delete("/group/:groupId",isAuth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    // Delete image from cloudinary
    await cloudinary.uploader.destroy(group.cloudinary_id);
    // Delete class from db
    await group.deleteOne();
    // const rmGroup = await Group.findByIdAndDelete(req.params.groupId);
    return res
      .status(200)
      .json({ success: true, message: "class deleted", group });
  } catch (error) {
    res.status(500).send({
      message: " Error in deleting class.",
      error: error.message,
    });
  }
});

// delete classGroup with students
// groupRouter.delete("/group/:groupId", async (req, res) => {
//   try {
//     const deleteStudents = (group) => {
//       Student.deleteMany({ group: req.params.groupId })
//         .then(() => group)
//         .catch((error) => console.log(error));
//     };
//     await Group.findByIdAndDelete({ _id: req.params.groupId })
//       .then((group) => res.send(deleteStudents(group)))
//       .catch((error) => console.log(error));
//   } catch (error) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// });
//delete classGroup with  courses

// groupRouter.delete('/course/:groupId', async (req, res) => {
//   try {
//     const deleteCourses = (group) => {
//       Courses.deleteMany({ group: req.params.groupId })
//         .then(() => group)
//         .catch((error) => console.log(error));
//     };
//     await Group.findByIdAndDelete({ _id: req.params.groupId })
//       .then((group) => res.send(deleteCourses(group)))
//       .catch((error) => console.log(error));
//   } catch (error) {
//     res.status(500).send({ success: false, error: error.message });
//   }
// });

//get the number of all groups
groupRouter.get("/groupcount", async (req, res) => {
  const groupcount = await Group.countDocuments({});
  if (groupcount) {
    res.json(groupcount);
  } else {
    res.status(404).json({ message: "No Groups" });
  }
});
module.exports = groupRouter;
