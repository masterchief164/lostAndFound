const jwt = require("jsonwebtoken");
const {
    getGoogleOAuthTokens,
    addUser,
    decodeToken
} = require("../services/userServices");
const { createToken } = require("../services/authServices");
require("dotenv")
  .config();

const googleLogin = async (req, res) => {
    const code = req.body.tokenId;
    const resp = await getGoogleOAuthTokens(code);
    const { id_token } = resp.data;
    const user = jwt.decode(id_token, { complete: false });

    user.access_token = resp.data.access_token;
    user.refresh_token = resp.data.refresh_token;
    user.roll = user.email.split("@")[0];
    user.registeredAt = user.iat;

    const person = await addUser(user);
    const token = await createToken(person);
    const userData = decodeToken(token);
    console.log("login");

    res.status(202)
      .cookie("token", token, {
          expires: new Date(Date.now() + 1800000),
          httpOnly: true,
          secure: process.env.NODE_ENV === "production"
      })
      .send({ userData });
};

const logout = (req, res) => {
    console.log("logout");
    res.clearCookie("token")
      .sendStatus(200);
};

module.exports = {
    googleLogin,
    logout
};
