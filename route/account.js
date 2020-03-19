/**
 * Routes started from /home 
 */
"use strict";

var express = require('express');
var router = express.Router();


router.get('/', checkAuthenticated, (req, res) => {
    res.redirect('/account/' + req.user.userId);
});

router.get('/:userId(*)', checkAuthenticated, (req, res) => {

    res.render("account", {
        email: req.user.email,
        userId: req.user.userId,
        balance: req.user.balance
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;