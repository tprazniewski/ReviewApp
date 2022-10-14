const User = require('../models/user')
const emailVerificationToken = require('../models/emailVerificationToken')
const passwordResetToken = require('../models/passwordResetToken')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const { isValidObjectId } = require('mongoose');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError, generateRandomByte } = require('../utils/helper');

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
    // res.status(201).json({message: "please verify your email. OTP has been sent"})
    res.status(201).json({
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    })
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
    
    const isMatched = await token.compareToken(OTP)
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

const forgetPassword = async (req,res) =>{
  const {email} = req.body;

  if(!email) return sendError(res, "Email is missing")

  const user = await User.findOne({email})
  if(!user) return sendError(res, "User not found", 404)
   const alreadyHastoken = await passwordResetToken.findOne({owner: user._id})
  if(alreadyHastoken) return sendError(res,'only after one hout you can request for another token')

  const token = await generateRandomByte()
  const newPasswordResetToken = await passwordResetToken({owner: user._id, token})
  await newPasswordResetToken.save();
  const resetPasswordUrl = `http://localhost:3000/reset-password?token=${token}&id=${user._id}`

  const transport = generateMailTransporter();

  transport.sendMail({
    from: ' security',
    to: user.email,
    subject: 'Reset Password link',
    html: `
    <p> click here to reset password </p>
    <a href =${resetPasswordUrl} > Change password </a>
    `
  })

  res.json({message: "link sent to your email"})
}

const sendResetPasswordtokenStatus = (req,res) => {
  res.json({valid: true})
}


const signIn = (req,res) => {
  const {email,password} = req.body
  
}

module.exports = {
    create,
    verifyEmail,
    resendEmailVerificationToken,
    forgetPassword,
    sendResetPasswordtokenStatus
  }
