const mongoose = require('mongoose');
const connection = require('../config/mongo.db');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: {type: String, unique: true, required: true},
    releaseDate: String,
    genre: String,
    description: String,
    imageUrl: String,
    developer: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;