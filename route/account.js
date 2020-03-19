/**
 * Routes started from /home 
 */
"use strict";

var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');


router.get('/', checkAuthenticated, (req, res) => {
    res.redirect('/account/' + req.user.userId);
});

router.get('/:userId(*)', checkAuthenticated, (req, res) => {
    fetch('http://localhost:1337/api/bets/user/' + req.user.userId)
        .then((response) => {
            return response.json();
        }).then((jsonData) => {
            res.render("account", {
                email: req.user.email,
                userId: req.user.userId,
                isAdmin: req.user.isAdmin,
                balance: req.user.balance,
                data: jsonData
            });
        });


});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;