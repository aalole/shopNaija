import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserProfile, updateUserProfile } from '../actions/userActions'

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
    const userProfile = useSelector((s) => s.userProfileUpdate)
    const { isSuccessful } = userProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserProfile('profile'))
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
        <Row className='py-3' md={3}>
            <Col>
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
                        <Form.Control type='email' placeholder='Enter email address' onChange={(e) => setEmail(e.target.value)} value={email}>

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
            <Col md={9}></Col>
        </Row>

    )
}


export default ProfileScreen
