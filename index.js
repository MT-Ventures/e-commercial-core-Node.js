import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Iyzipay from  "iyzipay"
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import cloudinary from "cloudinary";
import connectDB from "./config/dbConnection.js";


import userRoutes from "./routes/user-routes.js";
import productRoutes from "./routes/product-routes.js";
import categoryRoutes from "./routes/category-routes.js";
import orderRoutes from "./routes/order-routes.js";

// dot env config
dotenv.config();

//database connection
connectDB();



//rest object
const app = express();

//cloudinary Config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());


//routes 
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/cat", categoryRoutes);
app.use("/api/v1/order", orderRoutes);

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
