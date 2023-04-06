const express = require('express');
const ExamTimetable = require('../Models/ExamTimeTableSchema');
const examRouter = express.Router();

// examRouter.post('/create', async (req, res) => {
//   try {
//     const {
//       title,
//       academicyear,
//       month,
//       department,
//       examdate,
//       starttime,
//       stoptime,
//       group,
//       course,
//       room,
//       noofexaminas,
//       invigilator,
//     } = req.body;
//     const examTimetable = new ExamTimetable({
//       title,
//       academicyear,
//       month,
//       department,
//       examdate,
//       starttime,
//       stoptime,
//       group,
//       course,
//       room,
//       noofexaminas,
//       invigilator,
//     });
//     const examtimetable = await examTimetable.save();
//     res
//       .status(201)
//       .send({ message: 'New Examtimetable Created', examtimetable });
//   } catch (error) {
//     res.status(500).send({
//       message: ' Error in Creating Examtimetable.',
//       error: error.message,
//     });
//   }
// });


//get examtimetables
examRouter.get('/examtimetables', async (req, res) => {
  try {
    const examtimetables = await ExamTimetable.find({}).populate(
      'group course'
    );
    res.send(examtimetables);
  } catch (error) {
    res.status(500).send({
      message: ' Error in getting examtimetables.',
      error: error.message,
    });
  }
});


//get a examtimetable by id
examRouter.get('/:id', async (req, res) => {
  try {
    const examtimetable = await ExamTimetable.findById(req.params.id).populate(
      'group course'
    );
    res.send(examtimetable);
  } catch (error) {
    res.status(500).send({
      message: ' Error in getting examtimetable.',
      error: error.message,
    });
  }
});

//delete a examtimetable
examRouter.delete('/:timetableId', async (req, res) => {
  try {
    ExamTimetable.findByIdAndRemove(req.params.timetableId).then(
      (examtimetable) => {
        if (examtimetable) {
          return res.status(200).json({
            success: true,
            message: 'examtimetable deleted',
            examtimetable,
          });
        } else {
          return res
            .status(404)
            .json({ success: false, message: 'examtimetable not found' });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = examRouter;
