const express = require('express');
const Group = require('../Models/ClassGroupSchema.js');
const Courses = require('../Models/CoursesSchema.js');
const Student = require('../Models/StudentSchema.js');
const groupRouter = express.Router();

//create new classgroup
groupRouter.post('/group', async (req, res) => {
  try {
    const { abbr, title, description, numberOfStudents } = req.body;

    //confirm Iif group exists in the system
    const isgroup = await Group.findOne({ abbr });

    if (isgroup) {
      res.status(400);
      throw new Error('group already exists');
    }

    const classGroup = await Group.create({
      abbr: abbr,
      title: title,
      description: description,
      numberOfStudents: numberOfStudents,
    });
    const newGroup = await classGroup.save();
    res.status(201).send({ message: 'New Group Created', newGroup });
  } catch (error) {
    res.status(500).send({
      message: ' Error in Creating ClassGroup.',
      error: error.message,
    });
  }
});

//get classGroup
groupRouter.get('/group', async (req, res) => {
  try {
    const group = await Group.find({});
    res.send(group);
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting ClassGroup.', error: error.message });
  }
});

//get a classGroup
groupRouter.get('/group/:groupId', async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);
    if (group) {
      res.send(group);
    } else {
      res.status(404).send({ message: 'classGroup not found' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting ClassGroup.', error: error.message });
  }
});

//update student classGroup
groupRouter.put('/group/:groupId', async (req, res) => {
  try {
    const group = await Group.findByIdAndUpdate(
      req.params.groupId,
      {
        $set: req.body,
      },
      //return new updated data
      { new: true }
    );
    const newGroup = await group.save();
    res.status(201).send({ success: true, message: 'Group updated', newGroup });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: ' Error in Updating ClassGroup.',
      error: error.message,
    });
  }
});

// delete classGroup with students
groupRouter.delete('/group/:groupId', async (req, res) => {
  try {
    const deleteStudents = (group) => {
      Student.deleteMany({ group: req.params.groupId })
        .then(() => group)
        .catch((error) => console.log(error));
    };
    await Group.findByIdAndDelete({ _id: req.params.groupId })
      .then((group) => res.send(deleteStudents(group)))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});
//delete classGroup with  courses

groupRouter.delete('/course/:groupId', async (req, res) => {
  try {
    const deleteCourses = (group) => {
      Courses.deleteMany({ group: req.params.groupId })
        .then(() => group)
        .catch((error) => console.log(error));
    };
    await Group.findByIdAndDelete({ _id: req.params.groupId })
      .then((group) => res.send(deleteCourses(group)))
      .catch((error) => console.log(error));
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = groupRouter;
