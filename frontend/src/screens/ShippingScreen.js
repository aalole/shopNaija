import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartAction'

const ShippingScreen = ({ history }) => {

    const dispatch = useDispatch()

    const cart = useSelector(s => s.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [city, setCity] = useState(shippingAddress.city)
    const [country, setCountry] = useState(shippingAddress.country)

    const handleCheckout = e => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, postalCode, city, country }))
        history.push('/payment')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={handleCheckout}>
                <Form.Group controlId='address'>
                    <Form.Label> Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter your address' onChange={(e) => setAddress(e.target.value)} value={address}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='city'>
                    <Form.Label> City</Form.Label>
                    <Form.Control type='text' placeholder='Enter your city' onChange={(e) => setCity(e.target.value)} value={city}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='postalCode'>
                    <Form.Label> Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Enter your postal code' onChange={(e) => setPostalCode(e.target.value)} value={postalCode}>

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label> Country</Form.Label>
                    <Form.Control type='text' placeholder='Your Country' onChange={(e) => setCountry(e.target.value)} value={country}>

                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-2'> CONTINUE</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
