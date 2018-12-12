var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Developer = require('../model/developers.model');
const Game = require('../model/games.model')

//
// Geef een lijst van alle developers.
//
routes.get('/developer', function (req, res) {
    res.contentType('application/json');
    Developer.find({}).populate('games')
        .then((developers) => {
            // console.log(films);
            res.status(200).json(developers);
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/developer/:id', function (req, res) {
    res.contentType('application/json');
    Developer.findById(req.params.id)
        .then((developer) => {
            // console.log(film);
            res.contentType('application/json');
            var id = req.params.id;
            res.status(200).json(developer);
        })
        .catch((error) => res.status(401).json(error));
});

routes.put('/developer/:id', function (req, res) {

    res.contentType('application/json');
    var id = req.params.id;

    var update = {
        "name": req.body.name,
        "age": req.body.age,
        "games": req.body.games
    };
    Developer.findById(id)
        .then(developers => {
            developers.set(update);
            developers.save();
            res.status(200).json(developers);

        })
        .catch((error) => res.status(401).json(error));
});

routes.post('/game/:id/developer', async function (req, res) {
    const game = await Game.findById(req.params.id)
    if (!game) return res.status(404).send({ error: 'cannot add developer', message: 'Game not found' })
    var new_developer = new Developer(req.body)
    new_developer.games = game;
    new_developer.save(function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
});

routes.delete('/developer/:id', function (req, res) {
    var id = req.params.id;

    Developer.findById(id)
        .then(developer => {
            developer.remove();
            res.status(200).send("Developer verwijderd");
        })
        .catch(error => res.status(401).json(error));
});

module.exports = routes;