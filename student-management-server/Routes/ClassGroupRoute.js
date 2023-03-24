const express = require('express');
const Group = require('../Models/ClassGroupSchema.js');
const groupRouter = express.Router();

groupRouter.post('/create', async (req, res) => {
  try {
    const { abbr, title, description } = req.body;
    const classGroup = new Group({
      abbr: abbr,
      title: title,
      description: description,
    });
    const newGroup = await classGroup.save();
    res.status(201).send({ message: 'New Group Created', newGroup });
  } catch (error) {
    res
      .status(500)
      .send({
        message: ' Error in Creating ClassGroup.',
        error: error.message,
      });
  }
});

//get classGroup
groupRouter.get('/group', async (req, res) => {
  try {
    const group = await Group.find();
    res.send(group);
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting ClassGroup.', error: error.message });
  }
});

module.exports = groupRouter;
