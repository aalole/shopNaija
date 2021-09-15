import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

const createOrder = asyncHandler(async (req, res) => {
    const { taxPrice, totalPrice, shippingPrice, shippingAddress, orderItems, paymentMethod } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('Your cart is empty!!')
    } else {
        const order = new Order({
            orderItems,
            taxPrice,
            user: req.user._id,
            totalPrice,
            paymentMethod,
            shippingPrice,
            shippingAddress,
        })
        const createdOrder = await order.save()
        res.status(201).json({
            message: 'order created successfully',
            data: createdOrder
        })
    }
})

const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.status(200).json(order)
    } else {
        res.status(404)
        throw new Error('order not found')
    }
})


const getMyOrderList = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders)

})

const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.status(200).json(orders)

})

const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true,
            order.paidAt = Date.now(),
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.payer.email_address
            }
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('order not found')
    }
})

const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isDelivered = true;
        order.DeliveredAt = Date.now();

        const updatedOrder = await order.save()
        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('order not found')
    }
})

export { createOrder, getOrderById, updateOrderToPaid, getMyOrderList, getOrders, updateOrderToDelivered }