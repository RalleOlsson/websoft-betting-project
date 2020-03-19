"use strict";

var express = require('express');
var router = express.Router();


router.get('/', checkAuthenticated, (req, res) => {
    res.send("hej");
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;