import jwt from "jsonwebtoken";
import User from "../../models/userModel.js";
import asyncHandler from 'express-async-handler'

const verifyUser = asyncHandler(async (req, res, next) => {
    let token
    let reqHeader = req.headers.authorization
    // console.log(reqHeader)
    if (reqHeader && reqHeader.startsWith('Bearer')) {
        try {
            token = reqHeader.split(' ')[1]
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decodedToken.id).select('-password')
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('You are not authorized to use this route!!')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized. Token failed')

    }
})

export default verifyUser