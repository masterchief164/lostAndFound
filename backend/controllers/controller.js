const {getGoogleOAuthTokens, addUser, decodeToken} = require("../services/userServices");
const jwt = require("jsonwebtoken");
const {createToken} = require("../services/authServices");
require('dotenv').config();

const googleLogin = async (req, res) => {
    const code = req.body.tokenId;
    const resp = await getGoogleOAuthTokens(code)
    const {id_token} = resp.data;
    const user = jwt.decode(id_token, {complete: false});

    user.access_token = resp.data.access_token;
    user.refresh_token = resp.data.refresh_token;
    user.roll = user.email.split("@")[0];
    user.registeredAt = user.iat;

    const person = await addUser(user);
    const token = await createToken(person);
    const userData = decodeToken(token);

    res.status(200).send({token, userData});
}

module.exports = { googleLogin };