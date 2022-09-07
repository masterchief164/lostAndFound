const {google} = require("googleapis");
const nodemailer = require("nodemailer");
const OAuth2 = google.auth.OAuth2;

module.exports.mailSenderService = async (mailOptions) => {
    try {

        console.log("mail Requested");
        const oauth2Client = new OAuth2(
            process.env.CLIENT_ID1,
            process.env.CLIENT_SECRET1,
            "https://frontend-gamma-sage.vercel.app/google"
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.REFRESH_TOKEN
        });

        const accessToken = await oauth2Client.getAccessToken();

        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: process.env.USER_EMAIL,
                accessToken: accessToken.token,
            },
        });

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
