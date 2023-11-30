const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const {createError} = require('../utils/error')
const asyncHandler = require('express-async-handler')


const registerUser = asyncHandler(async(req, res, next) => {
    const {name, email, password} = req.body
    try {
         if(!name || !email || !password) {
            return next(createError(401, 'Please add all fields'))
        }
        const userExists = await User.findOne({email})
        if(userExists) {
            return next(createError(401, "User already exists"))
        }
    } catch (error) {
        next(error)
    }
       

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })
        if(user) {
            res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
        
            })
        }
    
})
const loginUser = asyncHandler(async(req, res, next) => {
    const {email, password} = req.body

    const user = await User.findOne({email})
    try {
        if(user && (await bcrypt.compare(password,user.password))) {
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    if(email !== user.email || password !== user.password) {
        return next(createError(401, "Invalid username or password"))
    }
    } catch (error) {
        next(error)
    }
    
    
})
const getMe = asyncHandler(async(req, res, next) => {
    res.status(200).json(req.user)
    
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}