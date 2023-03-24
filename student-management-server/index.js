const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const cors = require('cors');
app.use(cors());
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

const mongoose = require('mongoose');
require('dotenv').config();
const groupRouter = require('./Routes/ClassGroupRoute.js');

//connect to mongodb
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

//connecting routes
app.use('/system/classgroup', groupRouter);

//run server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server has started at http://localhost:${port}`);
});
