const mongoose = require('mongoose');
const connection = require('../config/mongo.db');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
    name: String,
    releaseDate: String,
    genre: String,
    description: String,
    imageUrl:String
    // concerts: [{type: mongoose.Schema.Types.ObjectId,
    //     ref: 'concerts'}]
});

const Game = mongoose.model('Game', GameSchema);

const game1 = new Game({
    name: 'Red dead Redemption',
    releaseDate: '29,01,1998',
    genre: 'Western', 
    description: 'RDR 2 is een western game die veel mensen leuk vinden',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Red_Dead_Redemption_2_Logo.png'
})//.save();

module.exports = Game;