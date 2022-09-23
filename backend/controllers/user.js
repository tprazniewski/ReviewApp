const User = require('../models/user')
const emailVerificationToken = require('../models/emailVerificationToken')
const nodemailer = require('nodemailer')

const { isValidObjectId } = require('mongoose');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError } = require('../utils/helper');

const create = async (req, res) => {
    const {name, email, password} = req.body;
    const oldUser = await User.findOne({email});
    // 401 status code for unathorised
    // if(oldUser) return res.status(401).json({error: 'This email is already used'})
    if(oldUser) return sendError(res, 'This email is already used')
    // new User({name: name, email: email, password: password}) // new User mus match the name of require variable
    const newUser = new User({name, email, password})
    await newUser.save()

    //Generate OTP
    let OTP = generateOTP();
    const newEmailVerificationToken = new emailVerificationToken({ owner: newUser._id, token: OTP})
  
    await newEmailVerificationToken.save();

      // Store OPT inside db
    // send that otp to our user
    let transport = generateMailTransporter()
    
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

const verifyEmail = async (req, res) => {
     const {userId, OTP} = req.body;

    //  if(!isValidObjectId(userId)) return res.json({ error: 'invalid user'});
     if(!isValidObjectId(userId)) return sendError(res, 'invalid user')

     const user = await User.findById(userId);

    //  if (!user) return res.json({ error: 'user not found!'})
     if (!user) return sendError(res,'user not found!', 404 )
     if (user.isVerified) return res.json({ error: 'user is already verified'})
     const token = await emailVerificationToken.findOne({ owner: userId })
     if (!token) return res.json({ error: 'token not found!'})
    
    const isMatched = await token.compaireToken(OTP)
    // if(!isMatched) return res.json({ error: 'please submit a valid OTP!'})
    if(!isMatched) return sendError(res,'please submit a valid OTP!' )

    user.isVerified = true;
    // We need to save otherwise it won't be apllied
    await user.save()

    emailVerificationToken.findByIdAndDelete(token._id)

          // Store OPT inside db
    // send that otp to our user
    let transport = generateMailTransporter()
    
      transport.sendMail({
        from: ' verification',
        to: user.email,
        subject: 'Welcome  Email',
        html: `
        <h1> Welcome to our app </h1>
        `
      })

    res.json({ message: "your email is verified"})

}
const resendEmailVerificationToken = async (req,res) => {
    const {userId} = req.body;

    const user = await User.findById(userId);
    // if(!user) return res.json({ error: "user not found"})
    if(!user) return sendError(res, "user not found")

    // if(user.isVerified) return res.json({ error: " This email id is apready verified"})
    if(user.isVerified) return sendError(res, " This email id is apready verified")

    const token = await emailVerificationToken.findOne({
        owner: userId
    })

    // if(token) return res.json({ error: 'After one h you can request for another token as you already have valid token on your email'})
    if(token) return sendError(res, 'After one h you can request for another token as you already have valid token on your email')

      //Generate OTP
    let OTP = generateOTP(6)
    const newEmailVerificationToken = new emailVerificationToken({ owner: user._id, token: OTP})
  
    await newEmailVerificationToken.save();

    let transport = generateMailTransporter()
    
      transport.sendMail({
        from: ' verification',
        to: user.email,
        subject: 'Email Verification',
        html: `
        <p> Your OTP </p>
        <h1> ${OTP} </h1>
        `
      })
    res.json({ message: 'New OTP has been sent to your registered email'})
}

module.exports = {
    create,
    verifyEmail,
    resendEmailVerificationToken
}