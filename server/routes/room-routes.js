import express from "express";
import {
  roomValidationRules,
  userValidationRules,
  validate,
} from "../middlewares/validateCredentials.js";
import { addRoom } from "../controllers/roomControllers.js";
import { authenticateUser } from "../middlewares/auth.js";
import multer from "multer";

const roomRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

roomRouter
  .route("/addroom")
  .post(
    roomValidationRules(),
    validate,
    upload.array("imageFiles", 6),
    authenticateUser,
    addRoom
  );

export { roomRouter };
