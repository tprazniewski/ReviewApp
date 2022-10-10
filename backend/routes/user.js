const express = require('express');
// const { userValidator, validate } = require('../../middlewares/validator');
const { check, validationResult } = require('express-validator'); 
const { create, verifyEmail, resendEmailVerificationToken, forgetPassword, sendResetPasswordtokenStatus } = require('../controllers/user');
const {isValidPasswordResetToken} = require('../middlewares/user')

const router = express.Router()

router.get('/', (req, res) => {
    res.send('<h1> This is a root api/user route </h1>')
})

router.post('/create', create)
router.post('/verify-email', verifyEmail)
router.post('/resend-email-verification-token', resendEmailVerificationToken)
router.post('/forget-password', forgetPassword)
router.post('/verify-password-reset-token', isValidPasswordResetToken, sendResetPasswordtokenStatus)

module.exports = router;