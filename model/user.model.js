const mongoose = require('mongoose');
const connection = require('../config/mongo.db');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: {type: String},
    firstname: String,
    lastname: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;