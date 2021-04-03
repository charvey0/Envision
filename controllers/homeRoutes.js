const router = require('express').Router();
const { User } = require('../models');

router.get('/', (req, res) => {
    res.render('homepage')
})

router.get('/login', (req, res) => {
    res.render('login', { loginOrSignupPage: true });
});

router.get('/signup', (req, res) => {
    res.render('signup', { loginOrSignupPage: true })
})

module.exports = router;