import express from "express";
import {
  roomValidationRules,
  userValidationRules,
  validate,
} from "../middlewares/validateCredentials.js";
import {
  addRoom,
  getRoomById,
  myRooms,
} from "../controllers/roomControllers.js";
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
roomRouter.route("/my-rooms").get(authenticateUser, myRooms);
roomRouter.route("/my-rooms/:id").get(authenticateUser, getRoomById);

export { roomRouter };
