const express = require('express');
const Period = require('../Models/PeriodSchema.js');
const { isAuth } = require('../Middleware/Auth.js');
const periodRouter = express.Router();

//create new period
periodRouter.post('/period',isAuth, async (req, res) => {
  try {
    const { session,starttime,stoptime } = req.body;

    //confirm Iif period exists in the system
    const isperiod = await Period.findOne({ session });

    if (isperiod) {
      res.status(400);
      throw new Error('period already exists');
    }

    const period = await Period.create({
        session:session,
        starttime:starttime,
        stoptime: stoptime
    });
    const periods = await period.save();
    res.status(201).send({ message: 'New period Created', periods });
  } catch (error) {
    res.status(500).send({
      message: ' Error in Creating period.',
      error: error.message,
    });
  }
});

//get periods
periodRouter.get('/periods', async (req, res) => {
  try {
    const periods = await Period.find({});
    res.send(periods);
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting periods.', error: error.message });
  }
});

//get a period
periodRouter.get('/:periodId', async (req, res) => {
  try {
    const period = await Period.findById(req.params.periodId);
    if (period) {
      res.send(period);
    } else {
      res.status(404).send({ message: 'period not found' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting period.', error: error.message });
  }
});

//update student period
periodRouter.put('/:periodId',isAuth, async (req, res) => {
  try {
    const period = await Period.findByIdAndUpdate(
      req.params.periodId,
      {
        $set: req.body,
      },
      //return new updated data
      { new: true }
    );
    const newperiod = await period.save();
    res.status(201).send({ success: true, message: 'period updated', newperiod });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: ' Error in Updating period.',
      error: error.message,
    });
  }
});

//delete period
periodRouter.delete('/:periodId',isAuth, async (req, res) => {
  try {
    Period.findByIdAndRemove(req.params.periodId).then((period) => {
      if (period) {
        return res
          .status(200)
          .json({ success: true, message: 'period deleted', period });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'period not found' });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting period.', error: error.message });
  }
});

module.exports = periodRouter;
