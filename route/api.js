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

    if ("matchId" in req.query) {

        var matchId = req.query.matchId;

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
    }
    /** if no url query is found, return all*/
    else {

        con.query("SELECT * FROM competitionMatch", function(err, result) {

            if (err) throw err;

            res.json(result);
        });
    }
});

router.get('/bets', (req, res) => {

    if ("betId" in req.query) {

        var betId = req.query.betId;

        con.query("SELECT * FROM bet WHERE betId = " + betId, function(err, result) {

            if (err) throw err;

            res.json(result);
        });
    }
    /** if no url query is found, return all*/
    else {
        con.query("SELECT * FROM bet", function(err, result) {

            if (err) throw err;

            res.json(result);
        });
    }

});

router.get('/teams', (req, res) => {

    con.query("SELECT * FROM team", function(err, result) {

        if (err) throw err;

        res.json(result);
    });
});

module.exports = router;