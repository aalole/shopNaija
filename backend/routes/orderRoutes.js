import express from "express";
import { createOrder, getOrderById, updateOrderToPaid, getMyOrderList } from "../controllers/orderController.js";
import { verifyUser} from "../middlewares/error-middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(verifyUser, createOrder)
router.route('/myorders').get(verifyUser, getMyOrderList)
router.route('/:id').get(verifyUser, getOrderById)
router.route('/:id/pay').put(verifyUser, updateOrderToPaid)

export default router