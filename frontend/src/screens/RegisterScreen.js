import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FormConatianer } from '../components/FormConatianer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [msg, setMsg] = useState(null)
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/';
    const registeredUser = useSelector((s) => s.registerUser)
    const { loading, error, user } = registeredUser

    useEffect(() => {
        if (user) {
            history.push(redirect)
        }
    }, [history, redirect, user])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMsg('your password does not match')
        } else {

            dispatch(register(name, email, password))
        }
    }
    return (
        <FormConatianer >
            <h1>Sign Up </h1>
            {msg && <Message variant='danger'>{msg}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
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
                <Button type='submit' varian='primary' className='mt-2'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already Have an Account ? <Link to={redirect ? `/login/?redirect=${redirect}` : '/login'}>Sign In</Link>
                </Col>
            </Row>
        </FormConatianer>
    )
}


export default RegisterScreen
