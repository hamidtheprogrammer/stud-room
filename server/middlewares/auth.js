import jwt from "jsonwebtoken";
import { userModel } from "../database/models/userModel.js";

const authenticateUser = async (req, res, next) => {
  let token = req.cookies.jwt;

  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  if (decoded) {
    const user = await userModel.findById(decoded.userId).select("-password");

    if (user) {
      res.status(200).json({ userId: user._id, username: user.firstName });
      next();
    } else {
      res.status(401).send("user not found");
    }
  }
};

export { authenticateUser };
