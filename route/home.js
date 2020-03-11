/**
 * Routes started from /home 
 */
"use strict";
const fetch = require("node-fetch");

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var data = {};

    fetch('http://localhost:1337/api/csgo/bets')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
        });

    res.render("home", data);
});

router.get("/about", (req, res) => {
    res.send("About something");
});
module.exports = router;