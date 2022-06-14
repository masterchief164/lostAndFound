const {getGoogleOAuthTokens} = require("../services/userServices");
require('dotenv').config();

const googleOAuth = async (req, res) => {
    const code = req.query.code;
    const resp = getGoogleOAuthTokens(code)
    console.log(resp);
}



module.exports = { googleOAuth };