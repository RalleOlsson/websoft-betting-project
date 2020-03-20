"use strict";

var express = require('express');
var router = express.Router();


router.get('/', checkAuthenticated, (req, res) => {
    res.render('admin', {
        email: req.user.email,
        userId: req.user.userId,
        isAdmin: req.user.isAdmin
    });
});

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

module.exports = router;