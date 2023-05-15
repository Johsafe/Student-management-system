const mongoose = require('mongoose');

const RoomSchema = mongoose.Schema({
  title: { type: String, required: true },
  capacity: { type: Number, required: true, trim: true, minlength: 3 },
  block: { type: String, required: true },
});

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;
