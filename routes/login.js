const passport = require('passport')

function authenticationMiddleware() {
    return function (req, res, next) {
        if (eq.isAuthenticated()) {
            return next()
        }
        res.redirect('/login?fail=true')
    }
}

const express = require('express');
const router = express.Router();

/* GET login listing. */
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login', message: null })
});

module.exports = router;
