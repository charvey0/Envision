const router = require('express').Router();
const { User, Artwork } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  res.render('homepage', {
    loggedIn: req.session.loggedIn,
    first_name: req.session.first_name,
    last_name: req.session.last_name,
  });
});

router.get('/home-gallery', async (req, res) => {

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Artwork }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('homepage', {
      ...user,
      loggedIn: req.session.loggedIn,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/api/users/artworks');
    return;
  }
  res.render('login', { loginOrSignupPage: true });
});

router.get('/signup', (req, res) => {
  res.render('signup', { loginOrSignupPage: true });
});

module.exports = router;
