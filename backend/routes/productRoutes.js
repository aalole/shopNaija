import express from "express";
import {
    getAllProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    createProductReview,
    getTopProducts
} from "../controllers/productController.js";
import { verifyUser, isAdmin } from "../middlewares/error-middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(verifyUser, isAdmin, createProduct);
router.get('/top', getTopProducts)
router.post("/:id/review", verifyUser, createProductReview)

router.route("/:id")
    .get(getProductById)
    .delete(verifyUser, isAdmin, deleteProduct)
    .put(verifyUser, isAdmin, updateProduct);

export default router;
