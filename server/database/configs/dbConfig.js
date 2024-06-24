import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

const connectDb = async () => {
  let isConnected = false;

  if (isConnected) {
    console.log("using existing connection");
    return;
  }
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: "housebooking",
      bufferCommands: false,
    });
    console.log("database connected");
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};

const connectCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export { connectCloudinary, connectDb };
