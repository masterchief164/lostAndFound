const jwt = require('jsonwebtoken');
const {
  getGoogleOAuthTokens,
  addUser,
  decodeToken,
} = require('../services/user.service');
const {
  createToken,
  createTokenProfile,
} = require('../services/auth.service');
require('dotenv')
  .config();

const googleLogin = async (req, res) => {
  try {
    const code = req.body.tokenId;
    // console.log(code);
    const resp = await getGoogleOAuthTokens(code);
    // console.log(resp.data);
    // eslint-disable-next-line camelcase
    const { id_token } = resp.data;
    const user = jwt.decode(id_token, { complete: false });

    user.access_token = resp.data.access_token;
    user.refresh_token = resp.data.refresh_token;
    user.roll = user.email.split('@')[0];
    user.registeredAt = user.iat;

    const person = await addUser(user);
    const token = person.hallNumber ? await createTokenProfile(person) : await createToken(person);
    const userData = decodeToken(token);
    userData.exp = new Date(Date.now() + 1800000);
    // console.log('login');
    console.log(process.env.NODE_ENV === 'production');
    res.status(202)
      .cookie('token', token, {
        expires: new Date(Date.now() + 1800000),
        httpOnly: true,
        sameSite: 'none',
        // domain: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'localhost',
        secure: process.env.NODE_ENV === 'production',
      })
      .send({ userData });
  } catch (error) {
    console.log(error);
    res.status(500)
      .send({ error });
  }
};

const logout = (req, res) => {
  // console.log('logout');
  res.clearCookie('token')
    .sendStatus(200);
};

module.exports = {
  googleLogin,
  logout,
};
