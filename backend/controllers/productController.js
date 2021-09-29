import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const createProduct = asyncHandler(async (req, res) => {
    const newProduct = await Product.create({
        name: 'Sample Product',
        description: "Sample description",
        price: 0,
        brand: 'Sample Brand',
        user: req.user._id,
        category: 'Sample category',
        image: '/images/newprodimg.jpg',
        countInStock: 0,
        numreviews: 0
    })
    if (newProduct) {
        res.status(201).json(newProduct);
    } else {
        res.status(404);
        throw new Error("Product not created. Something went wrong");
    }
})


const getAllProducts = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const pagesize = 5
    const page = Number(req.query.pageNumber) || 1

    const count = await Product.countDocuments({ ...keyword })

    const products = await Product.find({ ...keyword }).limit(pagesize).skip(
        pagesize * (page - 1)
    )
    res.json({
        products,
        page,
        pages: Math.ceil(count / pagesize)
    });
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
})

const updateProduct = asyncHandler(async (req, res) => {

    const { name, price, description, brand, category, image, countInStock } = req.body

    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name,
            product.image = image,
            product.description = description,
            product.brand = brand,
            product.category = category,
            product.price = price,
            product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(200).json(updatedProduct)

    } else {

        res.status(404);
        throw new Error("Product not updated. Something went wrong");
    }
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove()
        res.json('Product deleted successfully');
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
})


const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id);
    if (product) {
        const userId = req.user._id
        const hasBeenReviewed = product.reviews.find(r => {
            return r.user.toString() === userId.toString()
        })
        if (hasBeenReviewed) {
            res.status(400)
            throw new Error('You have already reviewed this product')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, cItem) => cItem.rating + acc, 0) / product.reviews.length
        await product.save()
        res.status(201).json({
            message: "Review successfully added"
        })
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
})

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({rating: -1}).limit(3);
    res.status(200).json(products)

})
export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, createProductReview, getTopProducts }