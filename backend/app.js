const express = require('express');
const userRouter = require('./routes/user')
const app = express();

//Wee need this middleware to parse json file we use in post method
app.use(express.json())
app.use('/api/user', userRouter)

app.listen(3000, () => {
    console.log(" Server is running on port 3000")
})