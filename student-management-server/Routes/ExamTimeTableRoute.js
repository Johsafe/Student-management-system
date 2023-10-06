const express = require("express");
const ExamTimetable = require("../Models/ExamTimeTableSchema");
const ExamTitle = require("../Models/ExamTitleSchema");
const examRouter = express.Router();

//EXAM TITLE ROUTES
//create
examRouter.post("/examtitle", async (req, res) => {
  try {
    const {
      title,
      department,
      academicYear,
      month,
      examStartdate,
      examStopdate,
    } = req.body;

    const examTitle = new ExamTitle({
      title,
      department,
      academicYear,
      month,
      examStartdate,
      examStopdate,
    });
    const examtitle = await examTitle.save();
    res.status(201).send({ message: "New ExamTitle Created", examtitle });
  } catch (error) {
    res.status(500).send({
      message: " Error in Creating ExamTitle.",
      error: error.message,
    });
  }
});

//get examtitle
examRouter.get("/examtitles", async (req, res) => {
  try {
    const examtitle = await ExamTitle.find({}).populate("department");
    res.send(examtitle);
  } catch (error) {
    res.status(500).send({
      message: " Error in getting examtitle.",
      error: error.message,
    });
  }
});

//get a examtitle by id
examRouter.get("/:examtitleId", async (req, res) => {
  try {
    const examtitle = await ExamTitle.findById(req.params.examtitleId);
    res.send(examtitle);
  } catch (error) {
    res.status(500).send({
      message: " Error in getting examtitle.",
      error: error.message,
    });
  }
});

// delete examtible
examRouter.delete("/:examtitleId", async (req, res) => {
  try {
    ExamTitle.findByIdAndRemove(req.params.examtitleId).then((examtitle) => {
      if (examtitle) {
        return res
          .status(200)
          .json({ success: true, message: "examtitle deleted", examtitle });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "examtitle not found" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting examtitle.", error: error.message });
  }
});

//EXAM TITLETABLE ROUTES
examRouter.post("/create", async (req, res) => {
  try {
    const {
      name,
      examdate,
      timeOfday,
      period,
      group,
      course,
      year,
      venue,
      noofexaminas,
      invigilator,
    } = req.body;
    const examTimetable = new ExamTimetable({
      name,
      examdate,
      timeOfday,
      period,
      group,
      course,
      year,
      venue,
      noofexaminas,
      invigilator,
    });
    const examtimetable = await examTimetable.save();
    res
      .status(201)
      .send({ message: "New Examtimetable Created", examtimetable });
  } catch (error) {
    res.status(500).send({
      message: " Error in Creating Examtimetable.",
      error: error.message,
    });
  }
});

//get examtimetables
examRouter.get("/examtimetables", async (req, res) => {
  try {
    const examtimetables = await ExamTimetable.find({}).populate(
      "name examdate period group course venue"
    );
    res.send(examtimetables);
  } catch (error) {
    res.status(500).send({
      message: " Error in getting examtimetables.",
      error: error.message,
    });
  }
});

//get a examtimetable by id
examRouter.get("/:timetableId", async (req, res) => {
  try {
    const examtimetable = await ExamTimetable.findById(req.params.id).populate(
      "group course"
    );
    res.send(examtimetable);
  } catch (error) {
    res.status(500).send({
      message: " Error in getting examtimetable.",
      error: error.message,
    });
  }
});

examRouter.put("/:timetableId", async (req, res) => {
  try {
  } catch (error) {}
});
//delete a examtimetable
examRouter.delete("/:timetableId", async (req, res) => {
  try {
    ExamTimetable.findByIdAndRemove(req.params.timetableId).then(
      (examtimetable) => {
        if (examtimetable) {
          return res.status(200).json({
            success: true,
            message: "examtimetable deleted",
            examtimetable,
          });
        } else {
          return res
            .status(404)
            .json({ success: false, message: "examtimetable not found" });
        }
      }
    );
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

module.exports = examRouter;
