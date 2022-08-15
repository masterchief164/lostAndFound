const transporter = require("../utils/nodemailer.config");

module.exports.mailSenderService = (mailOptions) =>{
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully" , data);
        }
      });
}