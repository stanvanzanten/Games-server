const mongoose = require('mongoose');
const connection = require('../config/mongo.db');
const GameSchema = require('./games.model');
const Schema = mongoose.Schema;
var Game = require('../model/games.model');

const DeveloperSchema = new Schema({
    name: String,
    age: Number,
    games: [{type: mongoose.Schema.Types.ObjectId,
    ref : "Game"}]
});

const Developer = mongoose.model('developer', DeveloperSchema);
// const game1 = new Game({ 
//     name: 'Red dead Redemption',
//     releaseDate: '29,01,1998',
//     genre: 'Western', 
//     description: 'RDR 2 is een western game die veel mensen leuk vinden',
//     imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/22/Red_Dead_Redemption_2_Logo.png'
// }).save()
// .then( 
//     ()=>{
//     return 
const developer1 = new Developer({
    name: 'Yoshida Baramu',
    age: 21
    // games: [game1] //Object.name
});//.save();

module.exports = Developer;