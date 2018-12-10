const mongoose = require('mongoose');
const connection = require('../config/mongo.db');
const GameSchema = require('./games.model');
const Schema = mongoose.Schema;
var Game = require('../model/games.model');

const DeveloperSchema = new Schema({
    name: String,
    age: Number,
    games: [{
        type: Schema.Types.ObjectId,
        ref: 'Game'
    }]
});

const Developer = mongoose.model('Developer', DeveloperSchema);

module.exports = Developer;