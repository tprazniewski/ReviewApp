const User = require('../models/user')

const create = async (req, res) => {
    const {name, email, password} = req.body;
    const oldUser = await User.findOne({email});
    // 401 status code for unathorised
    if(oldUser) res.status(401).json({error: 'This email is already used'})
    // new User({name: name, email: email, password: password}) // new User mus match the name of require variable
    const newUser = new User({name, email, password})
    await newUser.save()
    res.status(201).json({user: newUser})
} 


module.exports = {
    create
}