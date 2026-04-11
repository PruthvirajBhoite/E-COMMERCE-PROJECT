import express from "express";
import CartController from "../controller/cartController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', authMiddleware, CartController.findUserCartHandler);
router.put('/add', authMiddleware, CartController.addItemToCart);
router.delete('/item/:cartItemId', authMiddleware, CartController.deleteCartItemHandler);
router.put('/item/:cartItemId', authMiddleware, CartController.updateCartItemHandler);

export default router;