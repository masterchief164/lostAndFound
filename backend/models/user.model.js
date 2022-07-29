const mongoose = require('../bin/mongoose.util');

const userSchema = new mongoose.Schema({
  name: String,
  access_token: String,
  refresh_token: String,
  email: String,
  picture: String,
  registeredAt: Number,
  roll: String,
  sub: Number,
  locale: String,
  given_name: String,
  family_name: String,
  phoneNumber: String,
  batch: String,
  hallNumber: String,
  roomNumber: String,
});

const userModel = mongoose.model('User', userSchema);
module.exports = { userModel, userSchema };
