const mongoose= require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

//When ever We save this file, before We save this file , we want to run function
userSchema.pre('save', async function(next){
    if (this.isModified('password')) {
      const hash = await bcrypt.hash(this.password, 10)  
      this.password = hash;
    }
    
    next();
} )

module.exports = mongoose.model("User", userSchema)