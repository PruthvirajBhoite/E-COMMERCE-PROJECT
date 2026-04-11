import express from "express";
import homeCategoryController from "../controller/homeCategoryController.js";

const router = express.Router();

router.post("/categories",homeCategoryController.createHomeCategories);
router.get('/home-category',homeCategoryController.getHomeCategory);
router.patch('/home-category/:id',homeCategoryController.updateHomeCategory);

export default router;