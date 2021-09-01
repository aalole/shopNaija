import express from "express";
import {
    authUser,
    createUser,
    getUserProfile,
    getUsers,
    updateUserProfile,
    getUser,
    updateUser,
    deleteUser
} from "../controllers/userController.js";
import { verifyUser, isAdmin } from "../middlewares/error-middleware/authMiddleware.js";

const router = express.Router();

router.route('/').post(createUser).get(verifyUser, isAdmin, getUsers);
router.post('/login', authUser);
router.route('/profile').get(verifyUser, getUserProfile).put(verifyUser, updateUserProfile);
router.route('/:id')
    .delete(verifyUser, isAdmin, deleteUser)
    .get(verifyUser, isAdmin, getUser)
    .patch(verifyUser, isAdmin, updateUser)


export default router