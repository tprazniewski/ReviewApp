const express = require('express');
const app = express();
const userRouter = require('./routes/user')

app.use('/api/user', userRouter)

app.listen(3000, () => {
    console.log(" Server is running on port 3000")
})