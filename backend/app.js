const express = require('express');
const userRouter = require('./routes/user')
const cors = require('cors')
const app = express();
require('./db')

//We need this middleware to parse chunk of data to a redable format
app.use(cors())
app.use(express.json())
app.use('/api/user', userRouter)

app.listen(5000, () => {
    console.log(" Server is running on port 5000")
})