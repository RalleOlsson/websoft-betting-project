/**
 * Routes started from /api 
 */
"use strict";
var mysql = require("mysql");
const { HLTV } = require('hltv');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bet_webV2"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

function fillDataBase(dataset) {
    for (var i = 0; i < dataset.length; i++) {
        var str = "";
        if ((typeof dataset[i].team1) !== 'undefined') {
            str = "INSERT IGNORE INTO bet_webv2.match (matchId, team1odds, team2odds, team1name, team2name) VALUES" +
                "(" + dataset[i].id + ", '" +
                (Math.floor(Math.random() * 301) + 100) / 100 + "', '" +
                (Math.floor(Math.random() * 301) + 100) / 100 + "'," +
                " '" + dataset[i].team1.name + "'," +
                " '" + dataset[i].team2.name + "')"

            con.query(str,
                function(err, result) {
                    if (err) throw err;
                });
        }
    }
};

HLTV.getMatches().then((response) => {
    fillDataBase(response);
});

function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

router.get('/matches/:matchId(*)/csgo', (req, res) => {
    const { matchId } = req.params;

    HLTV.getMatch({ id: matchId }).then(response => {
        res.json(response);
    });
});

router.get('/matchesraw/csgo', (req, res) => {

    HLTV.getMatches().then((response) => {
        res.json(response);
    });
});

router.get('/matches/csgo', (req, res) => {

    HLTV.getMatches().then((response) => {

        fillDataBase(response);

        var eventList = [];
        var counter = 0;
        /*res.json(response);*/
        for (var i = 0; i < response.length; i++) {
            var event = {};
            // if the event doesnt exist
            if (typeof(response[i].event) !== "undefined") {
                if (findWithAttr(eventList, 'eventName', response[i].event.name) == -1) {
                    event.eventName = response[i].event.name;
                    event.matches = [];
                    event.matches.push(response[i]);
                    eventList.push(event);
                }
                // find index of the existing event
                else {
                    var index = findWithAttr(eventList, 'eventName', response[i].event.name);
                    eventList[index].matches.push(response[i]);
                }
            }

        }

        res.json(eventList);
    });
});

router.get('/bets/user/:userId(*)', (req, res) => {
    const { userId } = req.params;

    con.query("SELECT * FROM bet WHERE user_userId =" + userId + " AND status != 'finished'", function(err, result) {

        if (err) throw err;

        res.json(result);
    });
});

router.get('/bets/:betId(*)', (req, res) => {
    const { betId } = req.params;

    if (betId !== "" && !(isNaN(betId))) {

        con.query("SELECT * FROM bet WHERE betId = " + betId, function(err, result) {

            if (err) throw err;

            res.json(result);
        });
    } else {
        res.json("id must be a number");
    }
});

router.get('/bets', (req, res) => {

    con.query("SELECT * FROM bet", function(err, result) {

        if (err) throw err;

        res.json(result);
    });
});

router.post('/bets/:game(*)', checkAuthenticated, (req, res) => {

    const { game } = req.params;

    con.query("SELECT * from bet WHERE user_userId = " + req.body.userId + " AND match_matchId = " + req.body.matchId + " AND betPlaced = '" + req.body.betPlaced + "'", function(err, result) {
        if (!result.length) {
            var sql = "INSERT INTO bet (user_userId, match_matchId, stake, status, game, betPlaced) VALUES" +
                "(" + req.body.userId + ', ' + req.body.matchId + ', ' + 0 + ', ' + "'standby', '" + game + "', " + "'" + req.body.betPlaced + "'" + ")";
            con.query(sql, function(err, result) {
                if (err) throw (err);

                res.json("bet was added");
            });
        }
    })

    /*
    con.query(req.body.sql, function(err, result) {
        if (err) res.send(err);

        res.json("bet was added");
    });*/

});

router.get('/odds/:matchId(*)', (req, res) => {
    const { matchId } = req.params;

    con.query("SELECT * FROM bet_webv2.match WHERE matchId = " + matchId, function(err, result) {
        res.json(result);
    });
});

/** shows a hardcoded list of available commands */
router.get('/', (req, res) => {
    res.render("api");
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}


module.exports = router;