const express = require('express');
const ExamDate = require('../Models/ExamDateSchema.js');
const examdateRouter = express.Router();

//create new examdate
examdateRouter.post('/examdates', async (req, res) => {
  try {
    const { month, date, day ,week } = req.body;

    //confirm if date exists in the system
    const isexamdate = await ExamDate.findOne({ date });

    if (isexamdate) {
      res.status(400);
      throw new Error('examdate already exists');
    }

    const examdate = await ExamDate.create({
      month,
      date,
      day,
      week
    });
    const examdates = await examdate.save();
    res.status(201).send({ message: 'New examdate Created', examdates });
  } catch (error) {
    res.status(500).send({
      message: ' Error in Creating examdate.',
      error: error.message,
    });
  }
});

//get examdates
examdateRouter.get('/examdates', async (req, res) => {
  try {
    const examdates = await ExamDate.find({});
    res.send(examdates);
  } catch (error) {
    res 
      .status(500)
      .send({ message: ' Error in getting examdates.', error: error.message });
  }
});

//get a examdate
examdateRouter.get('/:examdateId', async (req, res) => {
  try {
    const examdate = await ExamDate.findById(req.params.examdateId);
    if (examdate) {
      res.send(examdate);
    } else {
      res.status(404).send({ message: 'examdate not found' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting examdate.', error: error.message });
  }
});

//update examdate
examdateRouter.put('/:examdateId', async (req, res) => {
  try {
    const examdate = await ExamDate.findByIdAndUpdate(
      req.params.examdateId,
      {
        $set: req.body,
      },
      //return new updated data
      { new: true }
    );
    const newexamdate = await examdate.save();
    res
      .status(201)
      .send({ success: true, message: 'examdate updated', newexamdate });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: ' Error in Updating examdate.',
      error: error.message,
    });
  }
});
//delete exam date
examdateRouter.delete('/:examdateId', async (req, res) => {
  try {
    ExamDate.findByIdAndRemove(req.params.examdateId).then((examdate) => {
      if (examdate) {
        return res
          .status(200)
          .json({ success: true, message: 'examdate deleted', examdate });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'examdate not found' });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({
        message: ' Error in deleting examdate.',
        error: error.message,
      });
  }
});
module.exports = examdateRouter;
