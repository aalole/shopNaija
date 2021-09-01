import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import {
  handleProductError,
  notFound,
} from "./middlewares/error-middleware/productError.js";
const app = express();

dotenv.config();

connectDB();

const PORT = process.env.PORT || 4040;
app.use(express.json())
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.use(notFound);

app.use(handleProductError);

app.listen(PORT, () => {
  console.log(`app is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
