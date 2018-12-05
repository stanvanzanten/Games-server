var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var Game = require('../model/games.model');

//
// Geef een lijst van alle games.
//
routes.get('/game', function(req, res) {
    res.contentType('application/json');
    Game.find({})
        .then((games) => {
            // console.log(films);
            res.status(200).json(games);
        })
        .catch((error) => res.status(401).json(error));
});

routes.get('/game/:id', function(req, res) {   
    res.contentType('application/json');
    Game.findById(req.params.id)
    .then((game) => {
        // console.log(film);
            res.contentType('application/json');
            var id = req.params.id;
        res.status(200).json(game);
    })
    .catch((error) => res.status(401).json(error));
    });

    routes.put('/game/:id', function(req, res) {
        
        res.contentType('application/json');
        var id = req.params.id;
        
            var update = { 
                "name" : req.body.name, 
                "description" : req.body.description,
                "releaseDate" : req.body.releaseDate,
                "imageUrl" : req.body.imageUrl,
                "genre" : req.body.genre
            };
            Game.findById(id)
                .then( games => {
                   games.set(update);
                    games.save();
                    res.status(200).json(games);
                    
                })
                .catch((error) => res.status(401).json(error));
        });

        routes.post('/game', function(req, res) {
            var new_game = new Game(req.body);
            new_game.save(function(err, task) {
              if (err)
                res.send(err);
                res.json(task);
            });
        });

    routes.delete('/game/:id', function(req, res) {
        var id = req.params.id;
    
        Game.findById(id)
            .then(game => { 
                game.remove();
                res.status(200).send("Game verwijderd");
            })
            .catch(error => res.status(401).json(error));
    });

module.exports = routes;