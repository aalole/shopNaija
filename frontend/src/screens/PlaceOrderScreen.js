import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Row, Card, Image, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'

import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {

	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)
	const { shippingAddress, cartItems, paymentMethod } = cart

	// total items price
	const addTwoDecimalsToNum = num => Math.round((num * 100) / 100).toFixed(2)
	cart.totalItemsPrice = addTwoDecimalsToNum(cartItems.reduce((acc, currentItem) => acc + currentItem.price * currentItem.qty, 0))
	cart.taxPrice = addTwoDecimalsToNum(cart.totalItemsPrice * 0.05)

	const shippingFee = cart.totalItemsPrice < 1000 ? cart.totalItemsPrice * 0.05 : cart.totalItemsPrice > 1000 && cart.totalItemsPrice < 5000 ? cart.totalItemsPrice * 0.1 : cart.totalItemsPrice * 0.15
	cart.shippingPrice = addTwoDecimalsToNum(Number(shippingFee))

	cart.totalPrice = +cart.totalItemsPrice + +cart.taxPrice + +cart.shippingPrice


	const orderCreate = useSelector(s => s.createOrder)
	const { order, isSuccessful, error } = orderCreate

	useEffect(() => {
		if (isSuccessful) {
			history.push(`/order/${order.data._id}`)
		}
		// eslint-disable-nextline
	}, [history, isSuccessful, order])

	const handlePlaceOrder = e => {
		dispatch(createOrder({
			orderItems: cart.cartItems,
			shippingAddress,
			paymentMethod: cart.paymentMethod,
			totalItemsPrice: cart.totalItemsPrice,
			totalPrice: cart.totalPrice,
			shippingPrice: cart.shippingPrice,
			taxPrice: cart.taxPrice,
		}))
	}

	return (
		<>

			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2> Shipping Details</h2>
							<p>
								<strong>Address:</strong>
								{shippingAddress.address}, {shippingAddress.postalCode}, {shippingAddress.city}, {shippingAddress.country}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2> Payment Method</h2>
							<p>
								<strong>Method:</strong>
								{paymentMethod}
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2> Cart Items</h2>
							{
								cartItems.length === 0 ? <Message variant='primary'>Your cart is empty</Message> :
									(
										cartItems.map((item, index) => (
											<ListGroup.Item key={index}>
												<Row>
													<Col md={1}>
														<Image src={item.image} alt={item.name} fluid rounded />
													</Col>
													<Col>
														<Link to={`/products/${item.product}`} > {item.name}</Link>
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
									<Col>${cart.totalItemsPrice} </Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${cart.shippingPrice} </Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${cart.taxPrice} </Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total Price</Col>
									<Col>${cart.totalPrice} </Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								{error && <Message variant='danger'>{error}</Message>}
								{isSuccessful && <Message variant='success'>{order.message}</Message>}
							</ListGroup.Item>

							<ListGroup.Item >
								<Button style={{ width: '100%' }} type='button' className='btn-block' disabled={cartItems === 0} onClick={handlePlaceOrder}>Place Order</Button>
							</ListGroup.Item>
						</Card>
					</ListGroup>
				</Col>
			</Row>

		</>

	)
}

export default PlaceOrderScreen
