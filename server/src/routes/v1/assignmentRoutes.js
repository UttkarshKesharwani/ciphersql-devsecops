import express from "express";
import { getAssignments, runQuery, getHint, seedAssignments, submitQuery, getAllSubmissionByUser } from "../../controllers/assignmentController.js";
import { protect } from "../../middleware/authMiddleware.js";

const assignmentRoutes = express.Router();

assignmentRoutes.get("/", getAssignments);
assignmentRoutes.post("/seed", seedAssignments);

assignmentRoutes.post("/:assignmentId/query", runQuery);
assignmentRoutes.post("/:assignmentId/hint", getHint);


assignmentRoutes.use(protect);
assignmentRoutes.post("/:assignmentId/submit", submitQuery);
assignmentRoutes.get("/:userId/:assignmentId/submissions", getAllSubmissionByUser);

export default assignmentRoutes;
