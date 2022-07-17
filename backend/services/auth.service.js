require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  const newUser = {
    name: user.name,
    email: user.email,
    picture: user.picture,
    sub: user.sub,
    roll: user.roll,
    registeredAt: user.registeredAt,
    locale: user.locale,
    given_name: user.given_name,
    family_name: user.family_name,
    _id: user._id,
  };

  return jwt.sign(newUser, process.env.CLIENT_SECRET, { expiresIn: '1800s' });
};

module.exports = { createToken };
