const Task = require('../models/taskModel')
const {createError} = require('../utils/error')

const createTask = async(req, res,next) => {
    try {
        if(!req.body.text) {
        // res.status(400).json('Please add a task')
        return next(createError(400, 'Please add a task'))
    }
    const task = await Task.create({
        text: req.body.text,
    })
    res.status(200).json(task)
    } catch (error) {
        next(error)
    }
    
}
const updateTask = async(req, res,next) => {
    try {
        const task = await Task.findById(req.params.id)
    if(!task) {
        res.status(400).json('task not found')
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(updatedTask)
    } catch (error) {
        next(error)
    }
    
}
const deleteTask = async(req, res, next) => {
    try {
        const task = await Task.findById(req.params.id)
    if(!task) {
        res.status(400).json('task not found')
    }
    await Task.deleteOne()
    res.status(200).json({id: req.params.id})
    } catch (error) {
        next(error)
    }
    
}
const getTask = async(req, res, next) => {
    try {
         const tasks = await Task.find()
         res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
   
}

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    getTask
}