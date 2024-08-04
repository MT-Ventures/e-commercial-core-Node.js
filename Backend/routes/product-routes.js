import express from "express";
import { isAdmin, isAuth } from "../middlewares/auth-mid.js";

import ProductController from "../controller/product-controller.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

// GET ALL PRODUCTS
router.get("/get-all", ProductController.getAllProductsController);

// GET TOP PRODUCTS
router.get("/top", ProductController.getTopProductsController);

// GET SINGLE PRODUCTS
router.get("/:id", ProductController.getSingleProductController);

// CREATE PRODUCT
router.post(
  "/create",
  isAuth,

  singleUpload,
  ProductController.createProductController
);

// UPDATE PRODUCT
router.put("/:id", isAuth, isAdmin, ProductController.updateProductController);

// UPDATE PRODUCT IMAGE
router.put(
  "/image/:id",
  isAuth,
  isAdmin,
  singleUpload,
  ProductController.updateProductImageController
);

// delete product image
router.delete(
  "/delete-image/:id",
  isAuth,
  isAdmin,
  ProductController.deleteProductImageController
);

// delete product
router.delete(
  "/delete/:id",
  isAuth,
  isAdmin,
  ProductController.deleteProductController
);

// REVIEW PRODUCT
router.put("/:id/review", isAuth, ProductController.productReviewController);

export default router;
