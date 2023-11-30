const mongoose = require('mongoose')

const taskSchema =  mongoose.Schema ({
    text: {
        type: String,
        required: [true, 'please add a task']
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Task',taskSchema)