import express from "express";
import getUserProfileByJwt from "../controller/userController.js"; // ✅ default import
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfileByJwt);

export default router;