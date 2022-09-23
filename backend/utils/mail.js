const nodemailer = require('nodemailer')

      //Generate OTP
      exports.generateOTP = (otp_length = 6)=> {
          let OTP = '';
          for(let i = 1 ; i <=otp_length; i++) {
              const randomVal = Math.round(Math.random() * 9)
              OTP += randomVal;
          } 
        return OTP;
      }

      exports.generateMailTransporter = () =>{
       return nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525, 
            auth: {
              user: "be2db2821ba2ca",
              pass: "532177fb48d064" 
            }
          });
      }