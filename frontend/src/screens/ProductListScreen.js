import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listProducts, deleteProduct, createProduct } from '../actions/productActions'

import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListScreen = ({ history }) => {
    const dispatch = useDispatch()

    const productList = useSelector(s => s.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(s => s.productDelete)
    const { loading: loadingDelete, error: errorDelete, isSuccessful } = productDelete

    const productCreate = useSelector(s => s.productCreate)
    const { loading: loadingCreate, error: errorCreate, isSuccessful: isSuccessfulCreate, product } = productCreate

    const loginUser = useSelector(s => s.loginUser)
    const { userInfo } = loginUser

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            history.push('/login')
        }
        if (isSuccessfulCreate) {
            history.push(`/admin/product/${product._id}/edit`)
        } else {
            dispatch(listProducts())
        }
    }, [dispatch, history, userInfo, isSuccessful, isSuccessfulCreate, product])

    const handleDeleteProduct = id => {
        if (window.confirm('Are you sure??')) {
            dispatch(deleteProduct(id))
        }
    }

    const handleCreateProduct = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col ><h1>Products</h1></Col>
                <Col className='text-right'>
                    <Button className='btn btn-dark my-3' onClick={handleCreateProduct}><i className='fas fa-plus'></i> Add New Product</Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Table bordered hover striped responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products && products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>${product.price}</td>
                                <td>
                                    <LinkContainer to={`product/${product._id}/edit`}>
                                        <Button variant='light' className='btn-sm'><i className='fas fa-edit' style={{ color: 'blue' }}></i></Button>
                                    </LinkContainer>
                                    <Button variant='damger' type='button' className='btn-sm' onClick={() => handleDeleteProduct(product._id)}><i className='fas fa-trash' style={{ color: 'red' }}></i></Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    )
}

export default ProductListScreen
