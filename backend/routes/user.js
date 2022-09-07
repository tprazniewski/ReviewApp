const express = require('express');
// const { userValidator, validate } = require('../../middlewares/validator');
const { check, validationResult } = require('express-validator'); 
const { create, verifyEmail } = require('../controllers/user');

const router = express.Router()

router.get('/', (req, res) => {
    res.send('<h1> This is a root api/user route </h1>')
})

router.post('/create', create)
router.post('/verify-email', verifyEmail)

module.exports = router;