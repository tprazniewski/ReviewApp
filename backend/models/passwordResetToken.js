const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const passwordResetTokenSchema = mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now()
         
    }

})

passwordResetTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        this.token = await bcrypt.hash(this.token, 10)
    }

    next();
})

// Create a new method called compaireToken
passwordResetTokenSchema.methods.compaireToken = async function (token) {
    // token from the user and hashed token from DB
   const result =  await bcrypt.compare(token, this.token)
   return result;
 }
module.exports = mongoose.model( "passwordResetTokenSchema" , passwordResetTokenSchema)