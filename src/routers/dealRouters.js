import express from "express";
import dealController from "../controller/dealController.js";

const router = express.Router();

router.get("/",dealController.getAllDeals);
router.post("/",dealController.createDeal);
router.put("/:id",dealController.updateDeal);
router.delete("/:id",dealController.deleteDeals);  

export default router;