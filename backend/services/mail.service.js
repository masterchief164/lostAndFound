const transporter = require("../utils/nodemailer.config");

module.exports.mailSenderService = async (mailOptions) => {
    try {
        await transporter.sendMail(mailOptions, (err, data) => {
            if (err)
                console.log(err);
            else
                console.log('email sent');
        });
    } catch (error) {
        return {
            status: 0,
            data: error
        }
    }

}
