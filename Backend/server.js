const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const taskRoutes = require('./routes/taskRoutes')

connectDB()

const port = process.env.PORT || 8000
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use('/api/tasks',taskRoutes )

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "something went wrong !!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack : err.stack
    })
})

app.listen(port, () => console.log(`Server running on port: ${port}`))