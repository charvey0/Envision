const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    res.render('artwork', {
        loggedIn: req.session.loggedIn
    })
})

module.exports = router;