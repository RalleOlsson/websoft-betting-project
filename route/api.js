/**
 * Routes started from /api 
 */
"use strict";

var mysql = require("mysql");
var express = require('express');
var router = express.Router();


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bet_web"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


/** shows a hardcoded list of available commands */
router.get('/', (req, res) => {
    res.render("api");
});


router.get('/matches', (req, res) => {

    con.query("SELECT * FROM competitionMatch", function(err, result) {

        if (err) throw err;

        res.json(result);
    });

});

router.get('/matches/:matchId(*)', (req, res) => {
    const { matchId } = req.params;

    var finalResult = null;

    con.query("SELECT * FROM competitionMatch WHERE matchId = " + matchId, function(err, result) {

        if (err) throw err;

        finalResult = result;
    });

    con.query("SELECT team.teamName FROM team_has_match, team WHERE competitionMatch_matchId = " + matchId + " and team_teamId = team.teamId", function(err, result) {

        if (err) throw err;

        if (typeof result[0] !== 'undefined') {

            finalResult[1] = {
                teams: [
                    result[0].teamName,
                    result[1].teamName
                ]
            };

            res.json(finalResult);

        } else {
            res.json("No match with that id");
        }


    });
})

router.get('/bets', (req, res) => {

    con.query("SELECT * FROM bet", function(err, result) {

        if (err) throw err;

        res.json(result);
    });
});

router.get('/bets/:betId(*)', (req, res) => {
    const { betId } = req.params;

    con.query("SELECT * FROM bet WHERE betId = " + betId, function(err, result) {

        if (err) throw err;

        res.json(result);
    });
});

router.get('/teams', (req, res) => {

    con.query("SELECT * FROM team", function(err, result) {

        if (err) throw err;

        res.json(result);
    });
});

module.exports = router;