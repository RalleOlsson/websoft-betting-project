/**
 * Routes starting from /
 */
"use strict";

var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var mysql = require('mysql');
const passport = require('passport');
const methodOverride = require('method-override');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('./../passport-config');
initializePassport(
    passport
);

router.use(express.urlencoded({ extended: false }));
router.use(flash());
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

router.use(passport.initialize());
router.use(passport.session());
router.use(methodOverride('_method'));

// Will simply redirect to the homepage
router.get('/', checkAuthenticated, (req, res) => {
    res.redirect('/home');
});

router.get('/login', checkNotAthenticated, (req, res) => {
    var data = {};
    res.render("login", data);
});

router.post('/login', passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/register', checkNotAthenticated, (req, res) => {
    var data = {};
    res.render("register", data);
});

router.post('/register', checkNotAthenticated, async(req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "root",
            database: "bet_webV2"
        });

        con.connect(function(err) {
            if (err) throw err;
            //console.log("Connected2!");
        });

        var sqlStr = "INSERT INTO user (email, password, balance, isAdmin) VALUES ('" +
            req.body.email + "', '" + hashedPassword + "', " + 0 + ", " + 0 + ")";

        //console.log(sqlStr);

        con.query(sqlStr, function(err, result) {

            if (err) throw err;

            //console.log("entered user into db");
        });

        res.redirect('/login');
    } catch (e) {
        console.log(e);
        res.redirect('/register');
    }
});

router.delete('/logout', (req, res) => {
    req.logOut();
    res.redirect('login');
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/login');
}

function checkNotAthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();

}

module.exports = router;