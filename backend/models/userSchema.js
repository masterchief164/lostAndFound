const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    access_token: String,
    refresh_token: String,
    email: String,
    password: String,
    picture: String,
    registeredAt:{
        type: Date,
        default: Date.now
    }
})

const user = mongoose.model('User', userSchema);
module.exports= user;