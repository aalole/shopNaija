import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Row, Col, Button, Form } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserProfile, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'


const ProfileScreen = ({ history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setconfirmPassword] = useState('')
	const [msg, setMsg] = useState(null)

	const dispatch = useDispatch()

	const loginUser = useSelector((s) => s.loginUser)
	const { userInfo } = loginUser

	const userDetails = useSelector((s) => s.user)
	const { loading, error, user } = userDetails

	const myOrderList = useSelector((s) => s.myOrderList)
	const { loading: LoadingOrderList, error: errorOrderList, orders } = myOrderList


	const userProfile = useSelector((s) => s.userProfileUpdate)
	const { isSuccessful } = userProfile

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user.name) {
				dispatch(getUserProfile('profile'))
				dispatch(listMyOrders())
			} else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [dispatch, history, userInfo, user])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMsg('your password does not match')
		} else {

			dispatch(updateUserProfile({ id: user._id, name, email, password }))
		}
	}
	return (
		<Row className='py-3'>
			<Col md={3}>
				<h1>User Profile </h1>
				{msg && <Message variant='danger'>{msg}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{isSuccessful && <Message variant='success'>Profile updated successfully</Message>}
				{loading && <Loader />}
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId='name'>
						<Form.Label> User Name</Form.Label>
						<Form.Control type='text' placeholder='Enter your name' onChange={(e) => setName(e.target.value)} value={name}>

						</Form.Control>
					</Form.Group>
					<Form.Group controlId='email'>
						<Form.Label> Email Address</Form.Label>
						<Form.Control type='email' placeholder='Enter email address' onChange={(e) => setEmail(e.target.value)} value={email} disabled>

						</Form.Control>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Password </Form.Label>
						<Form.Control type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} value={password}>

						</Form.Control>
					</Form.Group>
					<Form.Group controlId='password'>
						<Form.Label>Password </Form.Label>
						<Form.Control type='password' placeholder='confirm your password' onChange={(e) => setconfirmPassword(e.target.value)} value={confirmPassword}>

						</Form.Control>
					</Form.Group>
					<Button type='submit' varian='primary' className='mt-2'>Update Profile</Button>
				</Form>

			</Col>
			<Col md={9}>
				<h2>My Order Details</h2>
				{LoadingOrderList ? < Loader /> : errorOrderList ? <Message variant='danger'> {errorOrderList}</Message> : (
					<Table hover bordered striped responsive className='table-sm'>
						<thead>
							<tr>
								<th>Id</th>
								<th>Date</th>
								<th>Total</th>
								<th>Paid On</th>
								<th>Delivered On</th>
								<th></th>
							</tr>
						</thead>

						<tbody>
							{orders.length > 0 && orders.map(order => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>{order.totalPrice}</td>
									<td>{order.isPaid ? order.paidAt.substring(0, 10) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}</td>
									<td>{order.isDelivered ? order.DeliveredAt.substring(0, 10) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}</td>
									<td>
										<LinkContainer to={`order/${order._id}`}>
											<Button variant='light' className='btn-sm'>Details</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>

	)
}


export default ProfileScreen
