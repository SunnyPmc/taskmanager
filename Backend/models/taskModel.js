const mongoose = require('mongoose')

const taskSchema =  mongoose.Schema ({
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true 
  },
    text: {
        type: String,
        required: [true, 'please add a task']
    },
},{
    timestamps: true
})

module.exports = mongoose.model('Task',taskSchema)