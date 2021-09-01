import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";


const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, isAdmin } = req.body
    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(400)
        throw new Error('User already exist in the database')
    }
    const user = await User.create({
        name,
        email,
        password,
        isAdmin
    })

    if (user) {
        console.log(user)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })

    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        const { _id, name, email, isAdmin, token } = user
        return res.json({
            _id,
            name,
            email,
            isAdmin,
            token: generateToken(_id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid login parameter')
    }
});

const getUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            const { _id, name, email, isAdmin } = user

            return res.json({
                _id,
                name,
                email,
                isAdmin,
            })
        }
    } catch (error) {
        console.error(error)
        res.status(404)
        throw new Error('User not found')
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.password) {
            user.password = req.body.password || user.password
        }
        if (req.body.isAdmin) {
            user.isAdmin = req.body.isAdmin || user.isAdmin
        }
        const updatedUser = await user.save()
        const { _id, name, email, isAdmin } = updatedUser
        return res.json({
            _id,
            name,
            email,
            isAdmin,
        })
    }
    else {
        res.status(404);
        throw new Error('User not found')
    }

})


const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(404)
        throw new Error('No users')
    }
})

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})


const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if (req.body.isAdmin) {
            user.isAdmin = req.body.isAdmin
        }
        const updatedUser = await user.save()
        const { _id, name, email, isAdmin } = updatedUser
        return res.status(200).json({
            _id,
            name,
            email,
            isAdmin,
        })
    }
    else {
        res.status(404);
        throw new Error('User not found')
    }

})

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        await user.remove()
        res.status(200).json('User successfully removed')
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export { authUser, createUser, getUserProfile, updateUserProfile, getUsers, getUser, updateUser, deleteUser }