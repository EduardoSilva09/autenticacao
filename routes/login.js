const passport = require('passport')

const express = require('express');
const router = express.Router();

/* GET login listing. */
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login', message: null })
});

router.get('/login', function (req, res, next) {
    if (req.query.fail)
        res.render('login', { message: 'Usuário e/ou senha incorretos!' })
    else
        res.render('login', { message: null })
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/index', failureRedirect: '/login?fail=true' })
)

module.exports = router;
