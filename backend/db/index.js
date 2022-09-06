const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/review')
.then(() => {
    console.log('Db is connected')
})
.catch((err) => {
    console.log('Db connection failes', err)
})