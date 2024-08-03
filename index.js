import express from "express";

import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// import Stripe from "stripe";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import connectDB from "./config/dbConnection.js";


import userRoutes from "./routes/user-routes.js";

// dot env config
dotenv.config();

//database connection
connectDB();

//stripe configuration
// export const stripe = new Stripe(process.env.STRIPE_API_SECRET);

//rest object
const app = express();

//middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//route
//routes imports

// import productRoutes from "./routes/productRoutes.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";


app.use("/api/v1/user", userRoutes);

// app.use("/api/v1/product", productRoutes);
// app.use("/api/v1/cat", categoryRoutes);
// app.use("/api/v1/order", orderRoutes);

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome</h1>");
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Server Running On PORT ${process.env.PORT} on ${process.env.NODE_ENV} Mode`
     
  );
});
