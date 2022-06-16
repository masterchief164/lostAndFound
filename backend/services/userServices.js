require('dotenv').config();
const axios = require('axios');
const qs = require('querystring');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const getGoogleOAuthTokens = async (code) => {
  const url = 'https://oauth2.googleapis.com/token';

  const options = {
    code,
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    redirect_uri: 'http://localhost:3000',
    grant_type: 'authorization_code',
  };

  const data = await axios.post(url, qs.stringify(options), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }).catch((err) => {
    console.log(err.message);
  });
  return data;
};

const addUser = async (user) => {
  let person = await User.findOne({ sub: user.sub });

  if (!person) {
    person = new User(user);
    await person.save();
  }

  return person;
};

const decodeToken = (token) => jwt.decode(token, { complete: false });

module.exports = { getGoogleOAuthTokens, addUser, decodeToken };
