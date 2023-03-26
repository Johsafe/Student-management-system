const express = require('express');
const Courses = require('../Models/CoursesSchema.js');
const courseRouter = express.Router();

courseRouter.post('/create', async (req, res) => {
  // try {
  //   const { code, title, group, semister, year } = req.body;

  //   const course = new Courses({
  //     code,
  //     title,
  //     group,
  //     semister,
  //     year,
  //   });
  //   const newCourse = await course.save();
  //   res.status(201).send({ message: 'New Course Created', newCourse });
  // } catch (error) {
  //   res.status(500).send({
  //     message: ' Error in Creating New Course.',
  //     error: error.message,
  //   });
  // }
});

//get courses
courseRouter.get('/courses', async (req, res) => {
  try {
    const courses = await Courses.find({});
    res.send(courses);
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting Courses.', error: error.message });
  }
});

module.exports = courseRouter;
