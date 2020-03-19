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
            var matchData = {};
            for (var i = 0; i < jsonData.length; i++) {
                var bet = jsonData[i];
                var url1 = 'http://localhost:1337/api/matches/' + bet.match_matchId + "/" + bet.game;
                var url2 = 'http://localhost:1337/api/odds/' + bet.match_matchId;
                Promise.all([fetch(url1), fetch(url2)]).then(function(results) {
                    matchData.team1name = results[0].team1[0].name;
                    matchData.team2name = results[0].team2[0].name;
                    matchData.team1Odds = results[1].team1odds;
                    matchData.team2Odds = results[1].team2odds;
                });
            }
            res.render("account", {
                email: req.user.email,
                userId: req.user.userId,
                isAdmin: req.user.isAdmin,
                balance: req.user.balance,
                betData: jsonData,
                matchData: matchData
            });
        });


});

function fetchMatchData(jsonData) {

}

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;