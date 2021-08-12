import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

const getAllProducts = asyncHandler(async () => {
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

export { getAllProducts, getProductById }