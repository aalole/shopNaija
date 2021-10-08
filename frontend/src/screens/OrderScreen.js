import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Col, Row, Card, Image, ListGroup, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import CheckoutSteps from '../components/CheckoutSteps'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'

import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstant'

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { isSuccessful: isSuccessfulPay, loading: loadingPay } = orderPay

    const orderDeliver = useSelector(state => state.orderDeliver)
    const { isSuccessful: isSuccessfulDeliver, loading: loadingDeliver } = orderDeliver

    const loginUser = useSelector(state => state.loginUser)
    const { userInfo } = loginUser

    if (!loading) {
        const addTwoDecimalsToNum = num => Math.round((num * 100) / 100).toFixed(2)
        order.totalItemsPrice = addTwoDecimalsToNum(order.orderItems.reduce((acc, currentItem) => acc + currentItem.price * currentItem.qty, 0))
    }
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }

            document.body.appendChild(script)
        }
        if (!userInfo) {
            history.push('/login')
        }
        if (!order || isSuccessfulPay || isSuccessfulDeliver || order._id !== orderId) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }

    }, [dispatch, orderId, isSuccessfulPay, isSuccessfulDeliver, order, userInfo, history])

    const handlePaymentSuccesss = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

    const setDeliveredToTrue = () => {
        dispatch(deliverOrder(order))
    }
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2> Orders: {order._id}</h2>
                            <p>
                                <strong>Name:</strong>
                                {order.user.name}
                            </p>
                            <p>
                                <strong>Email:</strong>
                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}, {order.shippingAddress.postalCode}, {order.shippingAddress.city}, {order.shippingAddress.country}
                            </p>
                            {
                                order.isDelivered ? <Message variant='success'>Delivered on {order.updatedAt.substring(0, 16)}</Message> : <Message variant='danger'>Not Delivered yet</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2> Payment Method</h2>
                            <p>
                                <strong>Method:</strong>
                                {order.paymentMethod}
                            </p>
                            {
                                order.isPaid ? <Message variant='success'>Paid On {order.paidAt.substring(0, 10)}</Message> : <Message variant='danger'>Not Paid</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2> Order Items</h2>
                            {
                                order.orderItems.length === 0 ? <Message variant='primary'>You have no pending orders</Message> :
                                    (
                                        order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`} > {item.name}</Link>
                                                    </Col>

                                                    <Col md={4}>
                                                        {item.qty} x {item.price} = {item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))
                                    )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <ListGroup variant='flush'>
                        <Card>
                            <ListGroup.Item>
                                <h2> Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.totalItemsPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice} </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total Price</Col>
                                    <Col>${order.totalPrice} </Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={handlePaymentSuccesss} />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button type='button' className='btn btn-block' onClick={setDeliveredToTrue} style={{ width: '100%' }}>Set To Delivered</Button>
                                </ListGroup.Item>
                            )}
                        </Card>
                    </ListGroup>
                </Col>
            </Row>

        </>
}


export default OrderScreen
