import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import {
  handleProductError,
  notFound,
} from "./middlewares/error-middleware/productError.js";
const app = express();

dotenv.config();

connectDB();

const PORT = process.env.PORT || 4040;

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/products", productRoutes);
app.use(notFound);

app.use(handleProductError);

app.listen(PORT, () => {
  console.log(`app is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
