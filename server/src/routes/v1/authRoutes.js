import express from "express";
import { registerUser, loginUser } from "../../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/signup", registerUser);
authRoutes.post("/login", loginUser);

export default authRoutes;