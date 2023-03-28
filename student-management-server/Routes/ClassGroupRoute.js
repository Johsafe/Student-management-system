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
    res.status(500).send({
      message: ' Error in Creating ClassGroup.',
      error: error.message,
    });
  }
});

groupRouter.put('/:id', async (req, res) => {
  try {
    const { abbr, title, description } = req.body;
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      {
        abbr: abbr,
        title: title,
        description: description,
      },
      //return new updated data
      { new: true }
    );
    const newGroup = await group.save();
    res.status(201).send({ message: 'Group updated', newGroup });
  } catch (error) {
    res.status(500).send({
      message: ' Error in Updating ClassGroup.',
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

//delete classGroup
groupRouter.delete('/:groudId', async (req, res) => {
  try {
    Group.findByIdAndRemove(req.params.groudId).then((group) => {
      if (group) {
        return res
          .status(200)
          .json({ success: true, message: 'group deleted', group });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'group not found' });
      }
    });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = groupRouter;
