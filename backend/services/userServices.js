require("dotenv").config();
const axios = require("axios");
const qs = require("querystring");

const getGoogleOAuthTokens = async (code) => {
    const url = "https://oauth2.googleapis.com/token";

    const options = {
        code,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        redirect_uri: 'http://localhost:3000',
        grant_type: "authorization_code",
    }
    console.log(url+"?"+qs.stringify(options));

    require('axios-debug-log')
    const res = await axios.post(url, qs.stringify(options), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }).catch((err) => {
        console.log(err.message);
    });
    return res;
}

module.exports = { getGoogleOAuthTokens };