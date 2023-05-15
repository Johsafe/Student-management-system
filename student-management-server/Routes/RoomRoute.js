const express = require('express');
const Room = require('../Models/RoomSchema.js');
const roomRouter = express.Router();

//create new room
roomRouter.post('/room', async (req, res) => {
  try {
    const { capacity, title, block } = req.body;

    //confirm Iif room exists in the system
    const isroom = await Room.findOne({ title });

    if (isroom) {
      res.status(400);
      throw new Error('room already exists');
    }

    const room = await Room.create({
      title: title,
      capacity: capacity,
      block: block,
    });
    const rooms = await room.save();
    res.status(201).send({ message: 'New Room Created', rooms });
  } catch (error) {
    res.status(500).send({
      message: ' Error in Creating Room.',
      error: error.message,
    });
  }
});

//get rooms
roomRouter.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting Rooms.', error: error.message });
  }
});

//get a room
roomRouter.get('/:roomId', async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (room) {
      res.send(room);
    } else {
      res.status(404).send({ message: 'room not found' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: ' Error in getting Room.', error: error.message });
  }
});

//update student room
roomRouter.put('/:roomId', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.roomId,
      {
        $set: req.body,
      },
      //return new updated data
      { new: true }
    );
    const newroom = await room.save();
    res.status(201).send({ success: true, message: 'Room updated', newroom });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: ' Error in Updating Room.',
      error: error.message,
    });
  }
});

module.exports = roomRouter;
