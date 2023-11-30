const Task = require('../models/taskModel')
const {createError} = require('../utils/error')
const asyncHandler = require('express-async-handler')


const getTask = asyncHandler(async(req, res, next) => {
    try {
         const tasks = await Task.find({user: req.user.id})
         res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
   
})

const createTask = asyncHandler(async(req, res,next) => {
    try {
        if(!req.body.text) {
        return next(createError(400, 'Please add a task'))
    }
    const task = await Task.create({
        text: req.body.text,
        user: req.user.id
    })
    res.status(200).json(task)
    } catch (error) {
        next(error)
    }
    
})
const updateTask = asyncHandler(async(req, res,next) => {
    try {
        const task = await Task.findById(req.params.id)
    if(!task) {
        return next(createError(400,'task not found'))
    }
    if(!req.user) {
        return next(createError("user not found"))
    }
    if(task.user.toString() !== req.user.id) {
        return next(createError(401, "user not authorized"))
    }
    
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedTask)
    } catch (error) {
        next(error)
    }
    
})
const deleteTask = asyncHandler(async(req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
    if(!task) {
        return next(createError('task not found'))
    }
     if(!req.user) {
        return next(createError("user not found"))
    }
    if(task.user.toString() !== req.user.id) {
        return next(createError(401, "user not authorized"))
    }
    await Task.deleteOne()
    res.status(200).json({id: req.params.id})
    } catch (error) {
        next(error)
    }
    
})


module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTask
}