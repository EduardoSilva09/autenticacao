const passport = require('passport')

const express = require('express');
const router = express.Router();

/* GET login listing. */
router.get('/', function (req, res, next) {
    res.render('login', { title: 'Login', message: null })
});

router.get('/login', function (req, res, next) {
    if (req.query.fail)
        res.render('login', { title: 'Login', message: 'Usuário e/ou senha incorretos!', error: true })
    else if (req.query.reset)
        res.render('login', { title: 'Login', message: 'A sua nova senha chegará em instantes!', error: false })
    else
        res.render('login', { title: 'Login', message: null })
});

router.post('/login',
    passport.authenticate('local', { successRedirect: '/index', failureRedirect: '/login?fail=true' })
)

router.post('/logoff', function (req, res, next) {
    req.logOut(function (err) {
        if (err)
            return next(err)
        res.redirect('/login')
    })
})

module.exports = router;
