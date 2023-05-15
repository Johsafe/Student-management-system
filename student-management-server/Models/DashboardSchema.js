const mongoose = require('mongoose');

const DashboardSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Dashboard = mongoose.model('Dashboard', DashboardSchema);
module.exports = Dashboard;
