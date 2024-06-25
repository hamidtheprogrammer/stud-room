import jwt from "jsonwebtoken";
import { userModel } from "../database/models/userModel.js";

const authenticateUser = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    try {
      if (decoded) {
        const user = await userModel
          .findById(decoded.userId)
          .select("-password");

        if (user) {
          req.userId = user._id;

          next();
        } else {
          res.status(401).json({ message: "user not found" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "no token" });
  }
};
const verifyToken = async (req, res) => {
  let token = req.cookies.jwt;

  if (token) {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    try {
      if (decoded) {
        const user = await userModel
          .findById(decoded.userId)
          .select("-password");

        if (user) {
          req.userId = user._id;
          res.status(200).json({ userId: user._id, username: user.firstName });
        } else {
          res.status(401).json({ message: "user not found" });
        }
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(401).json({ message: "no token" });
  }
};

export { authenticateUser, verifyToken };
