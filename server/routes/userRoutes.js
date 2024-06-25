import express from "express";
import { test } from "../controllers/test.js";
import {
  userValidationRules,
  validate,
} from "../middlewares/validateCredentials.js";
import {
  logOutUser,
  loginUser,
  register,
} from "../controllers/userControllers.js";
import { authenticateUser, verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(test);
router.route("/register").post(userValidationRules(), validate, register);
router
  .route("/login")
  .post(userValidationRules({ login: true }), validate, loginUser);
router.route("/verify-token").get(verifyToken);
router.route("/logout").post(logOutUser);

export { router };
