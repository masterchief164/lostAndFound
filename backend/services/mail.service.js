const transporter = require("../utils/nodemailer.config");

module.exports.mailSenderService = async (mailOptions) =>{
  try {
    const data = await transporter.sendMail(mailOptions);
    if(data){
      return {
        status: 1,
        data: data
      }
    }else{
      return {
        status: 0,
        data: null
      }
    }
  } catch (error) {
    return {
      status: 0,
      data: error
    }
  }
   
}