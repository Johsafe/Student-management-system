const mongoose = require('mongoose');

const PeriodSchema = mongoose.Schema({
 session: { type: Number, required: true },
 starttime: { type: String, required: true },
 stoptime: { type: String, required: true },
});

const Period = mongoose.model('Period', PeriodSchema);
module.exports = Period;
