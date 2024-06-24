import bcrypt from "bcryptjs";
import { userModel } from "../database/models/userModel.js";
import generateToken from "../utils/generateToken.js";
const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(409).json({ email: "user already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    if (user) {
      const newUser = await user.save();
      if (newUser) {
        generateToken(newUser._id, res);
        res.status(200).json({
          userId: newUser._id,
          username: newUser.firstName,
        });
      } else {
        res.status(400).send("User creation failed");
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        generateToken(user._id, res);
        res.status(200).json({ userId: user._id, username: user.firstName });
      } else {
        res.status(401).json({ password: "Invalid password" });
      }
    } else {
      res.status(401).json({ email: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

const logOutUser = async (req, res) => {
  res.cookie("jwt", "", {
    maxAge: 0, // Immediately expire the cookie
    httpOnly: true, // Ensure the cookie is not accessible via JavaScript
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export { register, loginUser, logOutUser };
