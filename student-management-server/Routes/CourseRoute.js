const express = require("express");
const { default: mongoose } = require("mongoose");
const Group = require("../Models/ClassGroupSchema.js");
const Courses = require("../Models/CoursesSchema.js");
const courseRouter = express.Router();

//create a course
courseRouter.post("/create", async (req, res) => {
  try {
    const { code, title, semister, year } = req.body;

    const course = new Courses({
      code,
      title,
      group: req.body.group,
      department: req.body.department,
      semister,
      year,
    });
    course = await course.save();
    if (!course) return res.status(500).send("Course Cannot Be created");
    res.send(course);
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

//update a course

courseRouter.put("/:id", async (req, res) => {
  try {
    //Validate course id
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send("Invalid Course Id");
    }
    const course = await Courses.findByIdAndUpdate(
      req.params.id,
      {
        code: req.body.code,
        title: req.body.title,
        group: req.body.group,
        department: req.body.department,
        semister: req.body.semister,
        year: req.body.year,
      },
      //return new updated data
      { new: true }
    );
    const newCourse = await course.save();
    res.status(201).send({ message: "Group updated", newCourse });
  } catch (error) {
    res.status(500).send({
      message: " Error in Updating Course.",
      error: error.message,
    });
  }
});

//get courses
courseRouter.get("/courses", async (req, res) => {
  try {
    const courses = await Courses.find({}).populate("department group");
    res.send(courses);
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting Courses.", error: error.message });
  }
});

//get specific details about a course eg title ,group
courseRouter.get("/courses", async (req, res) => {
  try {
    const courses = await Courses.find().select("title group -_id").populate("department group");;
    res.send(courses);
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting Courses.", error: error.message });
  }
});

//get a course  by id
courseRouter.get("/:id", async (req, res) => {
  try {
    const course = await Courses.findById(req.params.id).populate("department group"); 
    res.send(course);
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting Course.", error: error.message });
  }
});

//delete a course
courseRouter.delete("/:courseId", async (req, res) => {
  try {
    Courses.findByIdAndRemove(req.params.courseId).then((course) => {
      if (course) {
        return res
          .status(200)
          .json({ success: true, message: "course deleted", course });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "course not found" });
      }
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

//get all courses from spaecific group/class
courseRouter.get("/group/:groupId/course", async (req, res) => {
  try {
    const courses = await Courses.find({ group: req.params.groupId }).populate(
      "group"
    );
    if (courses.length > 0) {
      res.send(courses);
    } else {
      res.status(404).send({
        message: "No Courses Currently Available. Please add new class courses",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Courses not found",
      error: error.message,
    });
  }
});

//get the number of all courses
courseRouter.get('/coursecount', async (req, res) => {
  const courseCount = await Courses.countDocuments({});
  if (courseCount) {
    res.json(courseCount);
  } else {
    res.status(404).json({ message: "No Courses" });
  }
});

module.exports = courseRouter;
