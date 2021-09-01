import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FormContainer } from '../components/FormContainer'
import { getUserProfile, updateUser } from '../actions/userActions'

import { USER_UPDATE_RESET } from '../constants/userconstants'

const UserEditScreen = ({ match, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userId = match.params.id

    const userDetails = useSelector((s) => s.user)
    const { loading, error, user } = userDetails

    const adminUpdateUser = useSelector((s) => s.adminUpdateUser)
    const { loading: updateLoading, error: updateError, isSuccessful } = adminUpdateUser

    useEffect(() => {
        if (isSuccessful) {
            dispatch({ type: USER_UPDATE_RESET })
            history.push('/admin/userlist')
        } else {
            if (!user.name || user._id !== userId) {
                dispatch(getUserProfile(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, user, userId, history, isSuccessful])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }
    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'> Go Back</Link>

            <FormContainer >
                <h1>Edit User </h1>
                {updateLoading && <Loader />}
                {updateError && <Message variant='danger'>{updateError}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
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
                        <Form.Group controlId='isAdmin'>
                            <Form.Check type='checkbox' onChange={(e) => setIsAdmin(e.target.checked)} value={isAdmin} checked={isAdmin}>

                            </Form.Check>
                        </Form.Group>
                        <Button type='submit' varian='primary' className='mt-2'>Update User Record</Button>
                    </Form>
                )}

            </FormContainer>
        </>
    )
}


export default UserEditScreen
