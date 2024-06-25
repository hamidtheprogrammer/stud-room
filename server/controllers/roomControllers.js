import cloudinary from "cloudinary";
import { roomModel } from "../database/models/roomModel.js";

const addRoom = async (req, res) => {
  const files = req.files;
  const room = req.body;

  room.userId = req.userId;

  // if (!files || files.length === 0) {
  //   return res.status(400).send("No files uploaded.");
  // }
  if (files) {
    try {
      const uploadImages = files.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);

        return res.url;
      });

      const imageUrl = await Promise.all(uploadImages);
      room.imageUrl = imageUrl;
      console.log(room);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "something went wrong" });
    }
  } else {
    try {
      const newRoom = await roomModel(room);
      await newRoom.save();
      console.log(newRoom);
      res.status(200).json({ message: "Room posted" });
    } catch (error) {
      console.log(room);
      console.log(error);
      res.status(401).json({ message: "something went wrong" });
    }
  }
};

const myRooms = async (req, res) => {
  try {
    const rooms = await roomModel.find({ userId: req.userId });
    if (rooms) {
      res.status(200).json(rooms);
    } else {
      res.status(404).json({ message: "no rooms" });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
    console.log(error);
  }
};

const getRoomById = async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const room = await roomModel.findById(id);
      if (room) {
        res.status(200).json(room);
      } else {
        res.status(404).json({ message: "Room not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "something went wrong" });
      console.log(error);
    }
  } else {
    res.status(404).json({ message: "No id provided" });
  }
};

export { addRoom, myRooms, getRoomById };
