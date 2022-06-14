const mongoose = require('mongoose');

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
})

const user = mongoose.model('User', userSchema);
module.exports = user;