import express from "express";
import sellerAuthMiddleware from "../middleware/sellerAuthMiddleware.js";
import transactionController from "../controller/transactionController.js";

const router = express.Router();

router.get('/seller',sellerAuthMiddleware,transactionController.getTransactionsBySellerId);

export default router;