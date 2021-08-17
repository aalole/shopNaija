import express from "express";
import { authUser, createUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import verifyUser from "../middlewares/error-middleware/authMiddleware.js";

const router = express.Router();

router.post('/', createUser);
router.post('/login', authUser);
router.route('/profile').get(verifyUser, getUserProfile).put(verifyUser, updateUserProfile);

export default router