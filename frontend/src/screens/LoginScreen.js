import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FormContainer } from '../components/FormContainer'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((s) => s.loginUser)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    return (
        <FormContainer >
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={handleSubmit}>
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
                <Button type='submit' varian='primary' className='mt-2'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer ? <Link to={redirect ? `/register/?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
