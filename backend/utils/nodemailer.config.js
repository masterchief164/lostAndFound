const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.USER_EMAIL,
    clientId: process.env.CLIENT_ID1,
    clientSecret: process.env.CLIENT_SECRET1,
    refreshToken: process.env.REFRESH_TOKEN,
  }
});

module.exports = transporter;
