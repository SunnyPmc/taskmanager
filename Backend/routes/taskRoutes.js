const express = require('express')
const router = express.Router()
const {createTask, updateTask, getTask, deleteTask} = require('../controllers/taskController')
const {protect} = require('../utils/verifyToken')

router.post('/',protect,createTask)
router.put('/:id',protect,updateTask)
router.delete('/:id',protect,deleteTask)
router.get('/',protect,getTask)

module.exports = router