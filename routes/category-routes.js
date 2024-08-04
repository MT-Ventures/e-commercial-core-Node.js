import express from "express";
import { isAdmin, isAuth } from "./../middlewares/auth-mid.js";
import CategoryController from "../controller/category-controller.js";

const router = express.Router();

// CREATE CATEGORY
router.post("/create", isAuth, CategoryController.createCategory);
 
// GET ALL CATEGORY
router.get("/get-all", CategoryController.getAllCategories);

// DELETE CATEGORY
router.delete(
  "/delete/:id",
  isAuth,
  isAdmin,
  CategoryController.deleteCategory
);

// UPDATE CATEGORY
router.put("/update/:id", isAuth, isAdmin, CategoryController.updateCategory);

export default router;
