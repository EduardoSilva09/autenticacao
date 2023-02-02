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
  const { username, password, email, profile } = req.body
  db.createUser(username, password, email, profile, (err, result) => {
    if (err)
      return res.redirect('/users/singup?fail=true')
    else {
      let message = `Obrigado por se cadastrar ${username}!`
      let subject = 'Cadastro Realizado com sucesso!'
      require('../mail')(email, subject, message)
      res.redirect('/')
    }
  })
});

router.post('/forgot', function (req, res, next) {
  const db = require('../db')
  const { email } = req.body
  db.resetPassword(email, (err, result, password) => {
    if (err) {
      console.error(err);
      return res.redirect('/login?reset=true')
    } else {
      let message = `Olá, sua nova senha é ${password}. sua senha antiga não tem mais validade!`
      let subject = 'Sua Senha foi alterada'
      require('../mail')(email, subject, message)
      res.redirect('/')
    }
  })
});

router.get('/forgot', function (req, res, next) {
  res.render('forgot', {})
});

module.exports = router;
