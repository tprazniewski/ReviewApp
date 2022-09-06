const express = require('express');
const { create } = require('../controllers/user');

const router = express.Router()

router.get('/', (req, res) => {
    res.send('<h1> This is a root route </h1>')
})

router.post('/create', create)

module.exports = router;