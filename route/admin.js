"use strict";

var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');


router.get('/', checkAuthenticated, (req, res) => {
    res.render('admin', {
        email: req.user.email,
        userId: req.user.userId,
        isAdmin: req.user.isAdmin
    });
});

router.post('/', checkAuthenticated, (req, res) => {
    var betsList = {};
    fetch('http://localhost:1337/api/bets/notFinished')
        .then((response) => {
            return response.json();
        }).then(async(bets) => {
            betsList = bets;
            for (var i = 0; i < betsList.length; i++) {
                await fetch('http://localhost:1337/api/matches/' + betsList[i].match_matchId + "/" + bets[i].game)
                    .then((response) => {
                        return response.json();
                    }).then(async(match) => {
                        if (typeof(match.winnerTeam) !== 'undefined') {
                            if (match.winnerTeam.name === betsList[i].betPlaced) {
                                var team;
                                if (match.winnerTeam.name === match.team1.name) {
                                    team = match.team1.name;
                                } else if (match.winnerTeam === match.team2.name) {
                                    team = match.team2.name;
                                }

                                await fetch('http://localhost:1337/api/odds/' + betsList[i].match_matchId)
                                    .then((response) => {
                                        return response.json();
                                    }).then((odds) => {
                                        if (team === odds[0].team1name) {
                                            return odds[0].team1odds;
                                        } else if (team === odds[0].team2name) {
                                            return odds[0].team2odds;
                                        }
                                    }).then(async(multiplier) => {
                                        var data = {};
                                        var payment = betsList[i].stake * parseFloat(multiplier);

                                        await fetch('http://localhost:1337/api/user/' + betsList[i].user_userId, {
                                            method: 'PUT',
                                            headers: {
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({ payment: payment })
                                        }).then(() => {
                                            console.log("balance done");
                                        });
                                    });
                            }
                        }
                        for (var n = 0; n < betsList.length; n++) {
                            var finishedBet = betsList[n];
                            finishedBet.status = 'finished';
                            await fetch('http://localhost:1337/api/bets/' + finishedBet.betId, {
                                method: 'PUT',
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    status: finishedBet.status,
                                    stake: finishedBet.stake
                                })
                            }).then(() => {
                                console.log("bets done");
                            });
                        }
                    });
            }
        });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;