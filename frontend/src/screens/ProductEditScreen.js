import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { FormContainer } from '../components/FormContainer'
import { singleProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'


const ProductEditScreen = ({ match, history }) => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [brand, setBrand] = useState('')
    const [image, setImage] = useState('')
    const [countInStock, setCountInStock] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const productId = match.params.id

    const productDetails = useSelector((s) => s.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((s) => s.productUpdate)
    const { loading: updateLoading, error: updateError, isSuccesssful: isSuccessfulUpdate } = productUpdate

    useEffect(() => {
        if (isSuccessfulUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push('/admin/productlist')
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(singleProductDetails(productId))
            } else {
                setName(product.name)
                setPrice(product.price)
                setCategory(product.category)
                setDescription(product.description)
                setBrand(product.brand)
                setImage(product.image)
                setCountInStock(product.countInStock)
            }
        }

    }, [dispatch, product, productId, history, isSuccessfulUpdate])

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProduct({
            _id: productId,
            name,
            price,
            category,
            description,
            image,
            countInStock,
            brand
        }))
    }
    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light my-3'> Go Back</Link>

            <FormContainer >
                <h1>Update Product </h1>
                {updateLoading && <Loader />}
                {updateError && <Message variant='danger'>{updateError}</Message>}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId='name'>
                            <Form.Label> Product Name</Form.Label>
                            <Form.Control type='text' placeholder='Enter product name' onChange={(e) => setName(e.target.value)} value={name}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='price'>
                            <Form.Label> Price</Form.Label>
                            <Form.Control type='number' placeholder='Enter Price' onChange={(e) => setPrice(e.target.value)} value={price}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='Category'>
                            <Form.Label> Category</Form.Label>
                            <Form.Control type='text' placeholder='Enter Category' onChange={(e) => setCategory(e.target.value)} value={category}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='description'>
                            <Form.Label> Description</Form.Label>
                            <Form.Control type='text' placeholder='Enter Product Description' onChange={(e) => setDescription(e.target.value)} value={description}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='brand'>
                            <Form.Label>Product Brand</Form.Label>
                            <Form.Control type='text' placeholder='Enter Product Brand' onChange={(e) => setBrand(e.target.value)} value={brand}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId='image'>
                            <Form.Label> Image</Form.Label>
                            <Form.Control type='text' placeholder='Enter Image Url' onChange={(e) => setImage(e.target.value)} value={image}>

                            </Form.Control>
                        </Form.Group>
                        <Form.File id='img-upload' label='Choose file ' custom onChange={handleImageUpload}></Form.File>
                        {uploading && <Loader />}
                        <Form.Group controlId='countInStock'>
                            <Form.Label> Number In Stock</Form.Label>
                            <Form.Control type='Number' placeholder='Enter CountInStock' onChange={(e) => setCountInStock(e.target.value)} value={countInStock}>

                            </Form.Control>
                        </Form.Group>
                        <Button type='submit' varian='primary' className='mt-2' >Update Product</Button>
                    </Form>
                )}

            </FormContainer>
        </>
    )
}


export default ProductEditScreen
