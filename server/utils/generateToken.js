import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.SECRET_KEY;

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, key, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 8400000,
  });

  return token;
};

export default generateToken;
