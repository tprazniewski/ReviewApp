const express = require('express');
const { createUser } = require('../controllers/user');

const router = express.Router()

router.get('/', (req, res) => {
    res.send('<h1> This is a root route </h1>')
})

router.post('/user-create', createUser)

module.exports = router;