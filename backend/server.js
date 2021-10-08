import path from 'path'
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import morgan from 'morgan';
import {
  handleProductError,
  notFound,
} from "./middlewares/error-middleware/productError.js";
const app = express();

dotenv.config();

connectDB();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT || 4000;

app.use(express.json())

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.use(notFound);

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(handleProductError);

app.listen(PORT, () => {
  console.log(`app is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
