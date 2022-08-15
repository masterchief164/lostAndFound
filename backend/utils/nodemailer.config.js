const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    clientId: process.env.CLIENTID,
    clientSecret: process.env.MAIL_SECRET,
    refreshToken: process.env.MAIL_REFRESHTOKEN
  }
});


module.exports = transporter;