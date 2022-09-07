const User = require('../models/user')
const emailVerificationToken = require('../models/emailVerificationToken')
const nodemailer = require('nodemailer')

const create = async (req, res) => {
    const {name, email, password} = req.body;
    const oldUser = await User.findOne({email});
    // 401 status code for unathorised
    if(oldUser) return res.status(401).json({error: 'This email is already used'})
    // new User({name: name, email: email, password: password}) // new User mus match the name of require variable
    const newUser = new User({name, email, password})
    await newUser.save()

    //Generate OTP
    let OTP = '';
    for(let i = 0 ; i <=5; i++) {
        const randomVal = Math.round(Math.random() * 9)
        OTP += randomVal;
    }
    const newEmailVerificationToken = new emailVerificationToken({ owner: newUser._id, token: OTP})
  
    await newEmailVerificationToken.save();

      // Store OPT inside db
    // send that otp to our user
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "be2db2821ba2ca",
          pass: "532177fb48d064"
        }
      });
    
      transport.sendMail({
        from: ' verification',
        to: newUser.email,
        subject: 'Email Verification',
        html: `
        <p> Your OTP </p>
        <h1> ${OTP} </h1>
        `
      })
    res.status(201).json({message: "please verify your email. OTP has been sent"})
} 


module.exports = {
    create
}