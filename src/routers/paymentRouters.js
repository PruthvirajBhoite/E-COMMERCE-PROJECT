import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import paymentController from "../controller/paymentController.js";

const router = express.Router();

router.get('/:paymentId',authMiddleware,paymentController.paymentSuccessHandler);

export default router;