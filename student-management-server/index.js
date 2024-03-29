const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
// const __dirname = path.resolve();

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));

const groupRouter = require('./Routes/ClassGroupRoute.js');
const courseRouter = require('./Routes/CourseRoute.js');
const examRouter = require('./Routes/ExamTimeTableRoute.js');
const studentRouter = require('./Routes/StudentRoute.js');
const examdateRouter = require('./Routes/ExamDateRoute.js');
const roomRouter = require('./Routes/RoomRoute.js');
const departmentRouter = require('./Routes/DepartmentRoute.js');
const authRouter = require('./Routes/AuthenticationRoute.js');
const periodRouter = require('./Routes/PeriodRoute.js');
const attendanceRouter = require('./Routes/StudentAttendanceRoute.js');
const unitRegRouter = require('./Routes/UnitRegistrationRoute.js');

//connecting routes
const api = '/system';
app.use(express.static(path.join(__dirname, 'uploads')));

app.use(`${api}/classgroup`, groupRouter);
app.use(`${api}/course`, courseRouter);
app.use(`${api}/authenicate`,authRouter);
app.use(`${api}/timetable`, examRouter);
app.use(`${api}/student`, studentRouter);
app.use(`${api}/room`, roomRouter);
app.use(`${api}/examdates`, examdateRouter);
app.use(`${api}/department`, departmentRouter);
app.use(`${api}/period`, periodRouter);
app.use(`${api}/attendance`, attendanceRouter);
app.use(`${api}/unitreg`, unitRegRouter);


//connect to mongodb
// mongodb://localhost:27017/SchoolSystem
// process.env.MONGODB_URI

mongoose
  .connect('mongodb://127.0.0.1:27017/SchoolSystem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //run server
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });