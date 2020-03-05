/**
 * Routes started from /home 
 */
"use strict";

var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    var data = {};
    res.render("home", data);
});

router.get("/about", (req, res) => {
    res.send("About something");
});

module.exports = router;