const { isValidObjectId } = require('mongoose')
const PasswordResetToken = require('../models/passwordResetToken')
const { sendError } = require('../utils/helper')

exports.isValidPasswordResetToken = async (req,res,next) => {
    const {token,userid} = req.body;
    if(!token.trim() || !isValidObjectId(userid)) sendError(res,'iNvalid REquest')
    const resetToken = await PasswordResetToken.findOne({owner: userid})
    if(!resetToken) sendError(res, 'Invalid request')

    const matched = await resetToken.compareToken(token)

    if(!matched) sendError(res,' Unauthorised aceess')

    res.resetToken = resetToken
    next()
} 