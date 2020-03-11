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
    database: "bet_webV2"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
            return i;
        }
    }
    return -1;
}

router.get('/csgo/matches/:matchId(*)', (req, res) => {
    const { matchId } = req.params;

    HLTV.getMatch({ id: matchId }).then(response => {
        res.json(response);
    });
});

router.get('/csgo/matches', (req, res) => {

    HLTV.getMatches().then((response) => {
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

router.get('/csgo/bets/user/:userId(*)', (req, res) => {
    const { userId } = req.params;

    con.query("SELECT * FROM bet WHERE user_userId =" + userId, function(err, result) {

        if (err) throw err;

        res.json(result);
    });
});

router.get('/csgo/bets/:betId(*)', (req, res) => {
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

router.get('/csgo/bets', (req, res) => {

    con.query("SELECT * FROM bet", function(err, result) {

        if (err) throw err;

        res.json(result);
    });
});

router.get('/csgo/events', (req, res) => {
    HLTV.getEvents().then(response => {
        res.json(response);
    });
});

/** shows a hardcoded list of available commands */
router.get('/', (req, res) => {
    res.render("api");
});


module.exports = router;