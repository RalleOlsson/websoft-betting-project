/**
 * Routes started from /home 
 */
"use strict";

var express = require('express');
var router = express.Router();


router.get('/', checkAuthenticated, (req, res) => {
    var data = {};

    res.render("account", data);
});



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;