const User = require('../models/user')

const create = async (req, res) => {
    const {name, email, password} = req.body;
    
    // new User({name: name, email: email, password: password})
    const newUser = new User({name, email, password})
    await newUser.save()
    res.json({user: newUser})
} 


module.exports = {
    create
}