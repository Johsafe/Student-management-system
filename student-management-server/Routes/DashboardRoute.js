const express = require('express');
const Dashboard = require('../Models/DashboardSchema');

const dashboardRouter = express.Router();

dashboardRouter.get('/dashboard', async (req, res) => {
  const items = await Dashboard.find();
  console.log(items);
  res.send(items);
});


module.exports = dashboardRouter;

