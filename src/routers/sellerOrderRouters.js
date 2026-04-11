import express from "express";
const router = express.Router();
import orderController from "../controller/orderController.js";
import sellerAuthMiddleware from "../middleware/sellerAuthMiddleware.js";

router.get('/',sellerAuthMiddleware,orderController.getSellersOrders);

router.patch(
    '/:orderId/status/:orderStatus',
    sellerAuthMiddleware,
    orderController.updateOrderStatus
);

export default router;