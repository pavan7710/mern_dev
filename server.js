const express = require('express')
const connectDB = require('./config/db')
const app = express() 
const port = 9000

// connect to  Data  Base 
connectDB()


app.use(express.json())

// Routes 
app.use('/api/users' ,require('./routes/api/users')) // register 
app.use('/api/auth' , require('./routes/api/auth'))  // login  && get user by token
app.use('/api/profile' , require("./routes/api/profile"))


app.listen(port , err => {
    if (err) throw err 
    console.log(`Server is running at  port ${port}  `)
})

