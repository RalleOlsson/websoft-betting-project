/**
 * Routes started from /home 
 */
"use strict";
const fetch = require("node-fetch");

var express = require('express');
var router = express.Router();


router.get('/', checkAuthenticated, (req, res) => {

    res.render("home", {
        email: req.user.email,
        userId: req.user.userId
    });
});

router.get("/about", checkAuthenticated, (req, res) => {
    res.render("about", {
        email: req.user.email,
        userId: req.user.userId
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;