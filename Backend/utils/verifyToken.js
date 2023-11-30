const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const asyncHandler = require('express-async-handler')
const { createError } = require('./error')

const protect = asyncHandler(async(req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next()
        } catch (error) {
            console.log(error)
            return next(createError(401, "Not authorized"))
        }
    }
    try {
        if(!token) {
            return next(createError(401,"not authorized, no token"))
        }
    } catch (error) {
        next(error)
    }
    
})

module.exports = {
    protect,
}