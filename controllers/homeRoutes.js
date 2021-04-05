const router = require('express').Router();
const { User } = require('../models');

router.get('/', (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    first_name: req.session.first_name,
    last_name: req.session.last_name,
  });
});

router.get('/login', (req, res) => {
  res.render('login', { loginOrSignupPage: true });
});

router.get('/signup', (req, res) => {
  res.render('signup', { loginOrSignupPage: true });
});

module.exports = router;
