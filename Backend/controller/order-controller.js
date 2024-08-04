import orderModel from "../models/order-model.js";
import productModel from "../models/product-model.js";
import userModel from "../models/user-model.js";
import Iyzipay from "iyzipay";

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
      const { cardNumber, expireMonth, expireYear, cardHolderName, cvc } =
        req.body;

      const formatDate = (date) => {
        return new Date(date).toISOString().replace("T", " ").slice(0, 19);
      };

      // Ensure all required payment fields are present
      if (
        !cardNumber ||
        !expireMonth ||
        !expireYear ||
        !cardHolderName ||
        !cvc
      ) {
        return res.status(400).send({
          success: false,
          message: "All card details are required",
        });
      }

      // Fetch the logged-in user's details
      const user = await userModel.findById(req.user._id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      // Fetch the order details
      const orders = await orderModel.find({ user: req.user._id });
      if (orders.length === 0) {
        return res.status(404).send({
          success: false,
          message: "No orders found for this user",
        });
      }

      // Combine all items into basketItems
      const basketItems = orders.flatMap((order) =>
        order.orderItems.map((item) => ({
          id: item.product.toString(),
          name: item.name,
          category1: "Collectibles",
          itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
          price: item.price,
        }))
      );

      // Calculate total item price and total amount from all orders
      const totalItemPrice = basketItems.reduce(
        (total, item) => total + item.price,
        0
      );
      const totalAmount = orders.reduce(
        (total, order) => total + order.totalAmount,
        0
      );

      // Iyzipay configuration
      const iyzico = new Iyzipay({
        apiKey: process.env.IYZICO_KEY,
        secretKey: process.env.IYZICO_SECRET_KEY,
        uri: process.env.IYZICO_BASE_URL,
      });

      const request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: "123456789",
        price: totalItemPrice, // Total item price from basketItems
        paidPrice: totalAmount, // Total amount from orders
        currency: Iyzipay.CURRENCY.TRY,
        installment: "1",
        basketId: "B67832",
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        callbackUrl: "http://your-callback-url", // Replace with your callback URL
        paymentCard: {
          cardHolderName: cardHolderName,
          cardNumber: cardNumber,
          expireMonth: expireMonth,
          expireYear: expireYear,
          cvc: cvc,
        },
        buyer: {
          id: user._id.toString(), // Use actual user ID from the request
          name: user.name, // Use actual user name
          surname: user.surname, // Optionally add surname
          gsmNumber: user.phone, // Use actual user phone number
          email: user.email, // Use actual user email
          identityNumber: "74300864791", // Optionally add identity number
          lastLoginDate: formatDate(new Date()), // Optionally add last login date
          registrationDate: formatDate(user.createdAt), // Use user registration date
          registrationAddress: user.address, // Use actual address
          ip: req.ip, // User's IP address
          city: user.city, // Use actual city
          country: user.country, // Use actual country
          zipCode: "", // Optionally add zip code
        },
        shippingAddress: {
          contactName: user.name, // Use actual shipping contact name
          city: orders[0].shippingInfo.city, // Use city from the first order
          country: orders[0].shippingInfo.country, // Use country from the first order
          address: orders[0].shippingInfo.address, // Use address from the first order
          zipCode: "", // Optionally add shipping zip code
        },
        billingAddress: {
          contactName: user.name, // Use actual billing contact name
          city: orders[0].shippingInfo.city, // Use city from the first order
          country: orders[0].shippingInfo.country, // Use country from the first order
          address: orders[0].shippingInfo.address, // Use address from the first order
          zipCode: "", // Optionally add billing zip code
        },
        basketItems: basketItems,
      };

      // Create payment
      iyzico.threedsInitialize.create(request, function (err, result) {
        if (err) {
          console.error("Payment error:", err);
          return res.status(500).send({
            success: false,
            message: "Payment processing error",
            error: err,
          });
        }

        if (result.status === "success") {
          let buff = Buffer.from(result.threeDSHtmlContent, "base64");
          const decodedString = buff.toString("utf8");
          return res.status(200).json({ page: decodedString });
        } else {
          console.error("Payment error:", result.errorMessage);
          return res.status(500).send({
            success: false,
            message: result.errorMessage,
          });
        }
      });
    } catch (error) {
      console.error("Internal server error:", error);
      res.status(500).send({
        success: false,
        message: "Internal server error",
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
