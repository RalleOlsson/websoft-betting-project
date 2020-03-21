const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "bet_webV2"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected1337");
});

function initialize(passport) {
    const authenticateUser = async(email, password, done) => {

        con.query("SELECT * FROM user WHERE email = '" + email + "'", async function(err, result) {
            if (err) done(err);

            /**console.log(result);*/
            if (!result.length) {
                return done(null, false, "No user with that email")
            }

            try {
                if (await bcrypt.compare(password, result[0].password)) {
                    return done(null, result[0])
                } else {
                    return done(null, false, { message: "Password incorrect" })
                }
            } catch (e) {
                return done(e)
            }
        })
    }

    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser));
    passport.serializeUser((user, done) => { done(null, user.userId) })
    passport.deserializeUser((id, done) => {
        con.query("SELECT userId, email, balance, isAdmin FROM user WHERE userId = " + id, function(err, result) {
            return done(err, result[0]);
        })
    });
}

module.exports = initialize