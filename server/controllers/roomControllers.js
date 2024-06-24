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
      res.status(200).json(newRoom);
    } catch (error) {
      console.log(room);
      res.status(401).json({ message: "something went wrong" });
    }
  }
};

export { addRoom };
