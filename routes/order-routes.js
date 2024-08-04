import express from "express";
import { isAdmin, isAuth } from "./../middlewares/auth-mid.js";
import OrderController from "../controller/order-controller.js";

const router = express.Router();

// CREATE ORDERS
router.post("/create", isAuth, OrderController.createOrder);

// GET ALL ORDERS - MY ORDERS
router.get("/my-orders", isAuth, OrderController.getMyOrders);

// GET SINGLE ORDER INFO
router.get("/order/:id", isAuth, OrderController.singleOrderDetails);

// ACCEPT PAYMENTS
router.post("/payments", isAuth, OrderController.acceptPayments);

// ========== ADMIN SECTION =============

// GET ALL ORDERS
router.get("/admin/orders", isAuth, isAdmin, OrderController.getAllOrders);

// CHANGE ORDER STATUS
router.put(
  "/admin/order/:id",
  isAuth,
  isAdmin,
  OrderController.changeOrderStatus
);

export default router;
