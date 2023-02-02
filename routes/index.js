const express = require('express');
const router = express.Router();
const db = require('../db')

/* GET home page. */
router.get('/:pagina?', global.authenticationMiddleware(), function (req, res, next) {
  const pagina = parseInt(req.params.pagina || '1')
  db.findAllUsers(pagina, (err, docs) => {
    if (err) return console.error(err);
    res.render('index', { title: req.user.username, docs });
  })

});

module.exports = router;
