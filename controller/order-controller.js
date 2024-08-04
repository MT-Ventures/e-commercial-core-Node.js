import orderModel from "../models/order-model.js";
import productModel from "../models/product-model.js";
import { stripe } from "../index.js";

class OrderController {
  // CREATE ORDERS
  async createOrder(req, res) {
    try {
      const {
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemPrice,
        tax,
        shippingCharges,
        totalAmount,
      } = req.body;
      // validation
      // create order
      await orderModel.create({
        user: req.user._id,
        shippingInfo,
        orderItems,
        paymentMethod,
        paymentInfo,
        itemPrice,
        tax,
        shippingCharges,
        totalAmount,
      });

      // stock update
      for (let i = 0; i < orderItems.length; i++) {
        // find product
        const product = await productModel.findById(orderItems[i].product);
        product.stock -= orderItems[i].quantity;
        await product.save();
      }
      res.status(201).send({
        success: true,
        message: "Order Placed Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Create Order API",
        error,
      });
    }
  }

  // GET ALL ORDERS - MY ORDERS
  async getMyOrders(req, res) {
    try {
      // find orders
      const orders = await orderModel.find({ user: req.user._id });
      // validation
      if (!orders) {
        return res.status(404).send({
          success: false,
          message: "no orders found",
        });
      }
      res.status(200).send({
        success: true,
        message: "your orders data",
        totalOrder: orders.length,
        orders,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In My orders Order API",
        error,
      });
    }
  }

  // GET SINGLE ORDER INFO
  async singleOrderDetails(req, res) {
    try {
      // find orders
      const order = await orderModel.findById(req.params.id);
      // validation
      if (!order) {
        return res.status(404).send({
          success: false,
          message: "no order found",
        });
      }
      res.status(200).send({
        success: true,
        message: "your order fetched",
        order,
      });
    } catch (error) {
      console.log(error);
      // cast error || OBJECT ID
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Get UPDATE Products API",
        error,
      });
    }
  }

  // ACCEPT PAYMENTS
  async acceptPayments(req, res) {
    try {
      // get amount
      const { totalAmount } = req.body;
      // validation
      if (!totalAmount) {
        return res.status(404).send({
          success: false,
          message: "Total Amount is require",
        });
      }
      const { client_secret } = await stripe.paymentIntents.create({
        amount: Number(totalAmount * 100),
        currency: "usd",
      });
      res.status(200).send({
        success: true,
        client_secret,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get UPDATE Products API",
        error,
      });
    }
  }

  // ========== ADMIN SECTION =============

  // GET ALL ORDERS
  async getAllOrders(req, res) {
    try {
      const orders = await orderModel.find({});
      res.status(200).send({
        success: true,
        message: "All Orders Data",
        totalOrders: orders.length,
        orders,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Get UPDATE Products API",
        error,
      });
    }
  }

  // CHANGE ORDER STATUS
  async changeOrderStatus(req, res) {
    try {
      // find order
      const order = await orderModel.findById(req.params.id);
      // validation
      if (!order) {
        return res.status(404).send({
          success: false,
          message: "order not found",
        });
      }
      if (order.orderStatus === "processing") order.orderStatus = "shipped";
      else if (order.orderStatus === "shipped") {
        order.orderStatus = "delivered";
        order.deliveredAt = Date.now();
      } else {
        return res.status(500).send({
          success: false,
          message: "order already delivered",
        });
      }
      await order.save();
      res.status(200).send({
        success: true,
        message: "order status updated",
      });
    } catch (error) {
      console.log(error);
      // cast error || OBJECT ID
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Get UPDATE Products API",
        error,
      });
    }
  }
}

export default new OrderController();
