import express from "express";
import { sendLoginOtp, createUser, signin } from "../controller/authController.js";

const router = express.Router();

router.post("/send/login-signup-otp", sendLoginOtp);
router.post("/signup", createUser);
router.post("/signin", signin);

export default router;