import express from "express";
import authRoutes from "./authRoutes.js";
import assignmentRoutes from "./assignmentRoutes.js";

const v1Routes = express.Router();

v1Routes.use("/auth", authRoutes);
v1Routes.use("/assignments", assignmentRoutes);

export default v1Routes;