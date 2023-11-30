const express = require('express')
const router = express.Router()
const {createTask, updateTask, getTask, deleteTask} = require('../controllers/taskController')

router.post('/',createTask)
router.put('/:id',updateTask)
router.delete('/:id',deleteTask)
router.get('/',getTask)

module.exports = router