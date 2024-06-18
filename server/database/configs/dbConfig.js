import mongoose from "mongoose";

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

export default connectDb;
