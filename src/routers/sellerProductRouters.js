import express from "express";
import ProductController from "../controller/ProductController.js";
import sellerAuthMiddleware from "../middleware/sellerAuthMiddleware.js"
const router = express.Router();

router.get(
    "/",
    sellerAuthMiddleware,
    ProductController.getProductBySellerId
)

router.post(
    "/",
    sellerAuthMiddleware,
    ProductController.createProduct
);

router.delete(
    "/:productId",
    sellerAuthMiddleware,
    ProductController.deleteProduct
);

router.patch(
    "/:productId",
    sellerAuthMiddleware,
    ProductController.updateProduct
);

export default router;

