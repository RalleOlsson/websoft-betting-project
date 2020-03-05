/**
 * Routes started from /login 
 */
"use strict";

var express = require('express');
var router = express.Router();

// accessed through /login
router.get('/', (req, res) => {
    var data = {};
    res.render("login", data);
});

module.exports = router;