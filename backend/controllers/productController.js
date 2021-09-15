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
    const products = await Product.find({});
    res.json(products);
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


export { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct }