const express = require("express");
const Room = require("../Models/RoomSchema.js");
const { isAuth } = require("../Middleware/Auth");
const roomRouter = express.Router();

//create new room
roomRouter.post("/room", isAuth, async (req, res) => {
  try {
    const { capacity, title, block } = req.body;

    //confirm Iif room exists in the system
    const isroom = await Room.findOne({ title });

    if (isroom) {
      res.status(400);
      throw new Error("room already exists");
    }

    const room = await Room.create({
      title: title,
      capacity: capacity,
      block: block,
    });
    const rooms = await room.save();
    res.status(201).send({ message: "New Room Created", rooms });
  } catch (error) {
    res.status(500).send({
      message: " Error in Creating Room.",
      error: error.message,
    });
  }
});

//get rooms
roomRouter.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.send(rooms);
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting Rooms.", error: error.message });
  }
});

//get a room
roomRouter.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);
    if (room) {
      res.send(room);
    } else {
      res.status(404).send({ message: "room not found" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting Room.", error: error.message });
  }
});

//update student room
roomRouter.put("/:roomId", isAuth, async (req, res) => {
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
    res.status(201).send({ success: true, message: "Room updated", newroom });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: " Error in Updating Room.",
      error: error.message,
    });
  }
});

//delete room
roomRouter.delete("/:roomId", isAuth, async (req, res) => {
  try {
    Room.findByIdAndRemove(req.params.roomId).then((room) => {
      if (room) {
        return res
          .status(200)
          .json({ success: true, message: "room deleted", room });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "room not found" });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: " Error in getting Room.", error: error.message });
  }
});

//get the number of all rooms
roomRouter.get("/", async (req, res) => {
  const roomCount = await Room.estimatedDocumentCount({});
  if (roomCount) {
    res.json(roomCount);
  } else {
    res.status(404).json({ message: "No Rooms" });
  }
});

module.exports = roomRouter;
