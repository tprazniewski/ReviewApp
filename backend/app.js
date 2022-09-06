const express = require('express');
const userRouter = require('./routes/user')
const app = express();
require('./db/index')

//We need this middleware to parse chunk of data to a redable format
app.use(express.json())
app.use('/api/user', userRouter)

app.listen(3000, () => {
    console.log(" Server is running on port 3000")
})