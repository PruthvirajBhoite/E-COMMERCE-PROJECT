import express from "express";
import sellerMiddleware from "../middleware/sellerAuthMiddleware.js";
import sellerReportController from "../controller/sellerReportController.js";

const router = express.Router();

router.get('/',sellerMiddleware,sellerReportController.getSellerReport);

export default router;