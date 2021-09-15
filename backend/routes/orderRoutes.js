import express from "express";
import { createOrder, getOrderById, updateOrderToPaid, getMyOrderList, getOrders, updateOrderToDelivered } from "../controllers/orderController.js";
import { verifyUser, isAdmin } from "../middlewares/error-middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(verifyUser, createOrder).get(verifyUser, isAdmin, getOrders)
router.route('/myorders').get(verifyUser, getMyOrderList)
router.route('/:id').get(verifyUser, getOrderById)
router.route('/:id/pay').put(verifyUser, updateOrderToPaid)
router.route('/:id/deliver').put(verifyUser, isAdmin, updateOrderToDelivered)

export default router