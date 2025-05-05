const { validationResult } = require("express-validator");
const Room = require("../models/Room");

const createRoom = async (req, res) => {
    const { roomCode, password } = req.body;

    const room = await Room.findOne({ code: roomCode });

    if (room) {
        if (room.password !== password) {
            return res.status(400).json({ status: false, message: "Incorrect password" });
        }

        if (room.users.length >= 2) {
            return res.status(400).json({ status: false, message: "Room is full" });
        }

        // Room exists and has less than 2 users — allow entry
        return res.status(200).json({ status: true, message: "Joined existing room" });
    }

    // Room doesn't exist — create it
    const newRoom = new Room({ code: roomCode, password, users: [] });
    await newRoom.save();

    res.status(201).json({ status: true, message: "Room created" });
};


const verifyRoom = async (req, res) => {
    const { roomCode, password } = req.body;

    const room = await Room.findOne({ code: roomCode });

    if (!room) return res.status(400).json({ status: false, message: "Room does not exist" });
    if (room.password !== password) return res.status(400).json({ status: false, message: "Incorrect password" });
    if (room.users.length >= 2) return res.status(400).json({ status: false, message: "Room is full" });

    res.status(200).json({ status: true, message: "Room verified" });
};

module.exports = { createRoom, verifyRoom };
