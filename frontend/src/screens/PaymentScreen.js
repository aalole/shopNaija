import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form, Col } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../actions/cartAction'

const PaymentScreen = ({ history }) => {
    const dispatch = useDispatch()

    const cart = useSelector(s => s.cart)
    const { shippingAddress } = cart
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    if (!shippingAddress) {
        history.push('/shipping')
    }
    const handleCheckout = e => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment</h1>
            <Form onSubmit={handleCheckout}>
                <Form.Group >
                    <Form.Label as='legend'> Select Payment Method</Form.Label>
                    <Col>
                        <Form.Check checked type='radio' name='paymentmethod' value='PayPal' label='PayPal' id='Paypal' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                        <Form.Check disabled type='radio' name='paymentmethod' value='Stripe' label='Stripe' id='Stripe' onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'> CONTINUE</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
