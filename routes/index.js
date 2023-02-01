const express = require('express');
const router = express.Router();
const db = require('../db')

/* GET home page. */
router.get('/', global.authenticationMiddleware(), function (req, res, next) {
  db.findAllUsers((err, docs) => {
    if (err) return console.error(err);    
    res.render('index', { title: req.user.username, docs });
  })

});

module.exports = router;
