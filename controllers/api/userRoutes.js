const router = require('express').Router();
const { User, Artwork } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/artworks', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Artwork }],
    });

    const user = userData.get({ plain: true });

    res.render('artworks', {
      ...user,
      loggedIn: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/allartworks', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const artworkData = await Artwork.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        }
      ],
    });

    // Serialize data so the template can read it
    const artworks = artworkData.map((artwork) => artwork.get({ plain: true }));

    console.log(artworks);

    res.render('allArtworks', {
      artworks,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/artworks/:id', async (req, res) => {
  try {
    const artworkData = await Artwork.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['first_name'],
        }
      ],
    });

    const artwork = artworkData.get({ plain: true });
    console.log(artworkData);
    res.render('artworks', {
      ...artwork,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  // console.log(req.body);
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      role_id: +req.body.role,
    });
    // console.log(newUser);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.email = newUser.email;
      req.session.loggedIn = true;
    });
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Log in page
router.post('/login', async (req, res) => {
  // console.log('POST started');
  // console.log(req.body);
  try {
    const userDB = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    // console.log(`user_email: ${userDB}`);
    if (!userDB) {
      res.status(400).json({ message: 'Email or password is incorrect' });
      return;
    }

    const validPassword = await userDB.checkPassword(req.body.password);
    console.log(`password: ${validPassword}`);
    console.log('validPassword: ', validPassword);
    if (!validPassword) {
      res.status(400).json({ message: 'Email or password is incorrect' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userDB.id;
      req.session.email = userDB.email;
      req.session.first_name = userDB.first_name;
      req.session.last_name = userDB.last_name;
      req.session.role_id = userDB.role_id;
      req.session.loggedIn = true;
      // console.log('userDB', userDB);
      res
        .status(200)
        .json({ user: userDB.dataValues, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//Profile route
router.get('/profile', (req, res) => {
  if (req.session.loggedIn) {
    res.status(200);
    console.log('signed into profile!');
  }
  res.render('profilepage');
});
//Post, Comment
// router.get('/', (req, res) => {
//   User.findAll({
//     attributes: { exclude: ['[password'] },
//   })
//     .then((dbUserData) => res.json(dbUserData))
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.get('/:id', (req, res) => {
//   User.findOne({
//     attributes: { exclude: ['password'] },
//     where: {
//       id: req.params.id,
//     },
//     include: [
//       {
//         model: Post,
//         attributes: ['id', 'title', 'content', 'created_at'],
//       },

//       {
//         model: Comment,
//         attributes: ['id', 'comment_text', 'created_at'],
//         include: {
//           model: Post,
//           attributes: ['title'],
//         },
//       },
//       {
//         model: Post,
//         attributes: ['title'],
//       },
//     ],
//   })
//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.put('/:id', (req, res) => {
//   User.update(req.body, {
//     individualHooks: true,
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbUserData) => {
//       if (!dbUserData[0]) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete('/:id', (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

module.exports = router;
