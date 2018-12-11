const mongoose = require('mongoose');
const connection = require('../config/mongo.db');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
    username: {type: String, unique: true, trim: true, required: true},
    password: { type: String, trim: true, required: true },
    firstname: String,
    lastname: String
});

UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;