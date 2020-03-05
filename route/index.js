/**
 * Routes starting from /
 */
"use strict";

var express = require('express');
var router = express.Router();

// Will simply redirect to the homepage
router.get('/', (req, res) => {
    res.redirect('/home');
});

module.exports = router;