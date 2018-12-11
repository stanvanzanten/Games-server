var express = require('express');
var routes = express.Router();
var mongodb = require('../config/mongo.db');
var User = require('../model/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

routes.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
})

// routes.post('/login', function(req, res){
//     var username = req.body.username;
//     var password = req.body.password;

//     User.findOne({username: username, password: password}, function(err, user){
//         if(err){
//             console.log(err);
//             return res.status(500).send();
//         }

//         if(!user){
//             return res.status(404).send();
//         }

//         req.session.user = user;
//         return res.status(200).send();
//     })
// });
routes.post('/register', function (req, res, next) {
    User.create({ username: req.body.username, password: req.body.password, firstname: req.body.firstname, lastname: req.body.lastname }, function (err, result) {
        if (err)
            next(err);
        else
            res.json({ status: "success", message: "User added successfully!", data: null });

    });
})

routes.post('/authenticate', function (req, res, next) {
    User.findOne({ username: req.body.username }, function (err, userInfo) {
        if (err) {
            next(err);
        } else {
            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '20h' });
                res.json({data: { user: userInfo, token: token } });
            } else {
                res.json({ status: "error", message: "Invalid username/password!!!", data: null });
            }
        }
    });
});

routes.get('/dashboard', function (req, res) {
    if (!req.session.user) {
        return res.status(401).send();
    }

    return res.status(200).send("Welcome to super secret API");
});

routes.get('/logout', function (req, res) {
    req.session.destroy();
    return res.status(200).send();
});

// routes.post('/register', function(req, res){
//     var username = req.body.username;
//     var password = req.body.password;
//     var firstname = req.body.firstname;
//     var lastname = req.body.lastname;

//     var newuser = new User();
//     newuser.username = username;
//     newuser.password = password;
//     newuser.firstname = firstname;
//     newuser.lastname = lastname;
//     newuser.save(function(err, savedUser){
//         if(err){
//             console.log(err);
//             return res.status(500).send();
//         }

//         return res.status(200).send();
//     })
// });

module.exports = routes;