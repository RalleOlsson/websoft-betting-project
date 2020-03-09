/**
 * Routes started from /api 
 */
"use strict";
var mysql = require("mysql");
const { HLTV } = require('hltv');
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

    HLTV.getMatches().then((response) => {
        res.json(response);
    });

});

router.get('/matches/:matchId(*)', (req, res) => {
    const { matchId } = req.params;

    HLTV.getMatch({ id: matchId }).then(response => {
        res.json(response);
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