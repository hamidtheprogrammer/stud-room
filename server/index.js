import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/userRoutes.js";
import { connectCloudinary, connectDb } from "./database/configs/dbConfig.js";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { roomRouter } from "./routes/room-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: process.env.DOTENV_CONFIG_PATH });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(cookieParser());

connectDb();

connectCloudinary();

const port = process.env.SERVER_PORT;

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use("/api/users", router);
app.use("/api/rooms", roomRouter);
app.listen(port, () => {
  console.log("Server running on " + port);
});
