const mongoose = require('mongoose');
const connection = require('../config/mongo.db');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: String,
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