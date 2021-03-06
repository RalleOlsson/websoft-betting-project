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


router.put('/:userId(*)', checkAuthenticated, (req, res) => {


})

router.delete('/:userId(*)', checkAuthenticated, (req, res) => {


})

router.get('/:userId(*)', checkAuthenticated, (req, res) => {
    var matchData = [];
    var betData = [];

    fetch('http://localhost:1337/api/bets/user/' + req.user.userId)
        .then((response) => {
            return response.json();
        }).then(async(jsonData) => {
            betData = jsonData;
            for (var i = 0; i < betData.length; i++) {
                var bet = betData[i];
                var url2 = 'http://localhost:1337/api/odds/' + bet.match_matchId;

                await fetch(url2).then((response) => {
                    return response.json();
                }).then((data) => {
                    matchData[i] = {
                        matchId: data[0].matchId,
                        team1name: data[0].team1name,
                        team2name: data[0].team2name,
                        team1odds: data[0].team1odds,
                        team2odds: data[0].team2odds
                    }

                });
            }
        }).then(() => {
            res.render("account", {
                email: req.user.email,
                userId: req.user.userId,
                isAdmin: req.user.isAdmin,
                balance: req.user.balance,
                betData: betData,
                matchData: matchData
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