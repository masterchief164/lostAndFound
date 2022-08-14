require('dotenv').config();
const axios = require('axios');
const qs = require('querystring');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model').userModel;

const getGoogleOAuthTokens = async (code) => {
  const url = 'https://oauth2.googleapis.com/token';

  const options = {
    code,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: `${process.env.FRONTEND_URL}/google`,
    grant_type: 'authorization_code',
  };

  return axios.post(url, qs.stringify(options), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .catch((err) => {
      console.log(err.message);
    });
};

const addUser = async (user) => {
  let person = await User.findOne({ sub: user.sub });

  if (!person) {
    person = new User(user);
    await person.save();
  }
  // console.log(person);

  return person;
};

const decodeToken = (token) => jwt.decode(token, { complete: false });

module.exports = { getGoogleOAuthTokens, addUser, decodeToken };
