var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/signup', function (req, res, next) {
  if (req.query.fail)
    res.render('signup', { message: 'Falha ao realizar cadastro do usuário!' })
  else
    res.render('signup', { message: null })
});

router.post('/signup', function (req, res, next) {
  const db = require('../db')
  const { username, password, email } = req.body
  db.createUser(username, password, email, (err, result) => {
    if (err)
      return res.redirect('/users/singup?fail=true')
    else {
      message = `Obrigado por se cadastrar ${username}!`
      subject = 'Cadastro Realizado com sucesso!'
      require('../mail')(email, subject, message)
      res.redirect('/')
    }
  })
});

router.get('/forgot', function (req, res, next) {
  res.render('forgot', {})
});

module.exports = router;
