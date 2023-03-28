const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const groupRouter = require('./Routes/ClassGroupRoute.js');
const courseRouter = require('./Routes/CourseRoute.js');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({}));

//connecting routes
app.use('/system/classgroup', groupRouter);
app.use('/system/course', courseRouter);

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
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
