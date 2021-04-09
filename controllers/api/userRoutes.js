const router = require('express').Router();
const { User, Artwork } = require('../../models');
const withAuth = require('../../utils/auth');

var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dz52vqg3p',
  api_key: '412443397181723',
  api_secret: 'q-mf7e4S7u-oJqmK9BeXOqne7oU',
})


router.get('/my-artworks', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Artwork }],
    });

    const user = userData.get({ plain: true });

    res.render('artworks', {
      ...user,
      loggedIn: req.session.loggedIn,
      user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/all-artworks', withAuth, async (req, res) => {
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
      loggedIn: req.session.loggedIn,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
      user_id: req.session.user_id

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
      loggedIn: req.session.loggedIn,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
      user_id: req.session.user_id
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.post('/sign-up', async (req, res) => {
  // console.log(req.body);
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      role_id: +req.body.role,
      profile_picture: "https://workhound.com/wp-content/uploads/2017/05/placeholder-profile-pic.png"
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
    console.log(err.message);
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
      req.session.loggedIn = true;
      req.session.user_id = userDB.id;
      req.session.email = userDB.email;
      req.session.first_name = userDB.first_name;
      req.session.last_name = userDB.last_name;
      req.session.role_id = userDB.role_id;
      req.session.profile_picture = userDB.profile_picture;

      // console.log('userDB', userDB);
      res.status(200).json({ user: userDB.dataValues, message: 'You are now logged in!' });
    });
    // res.status(200).json({ user: userDB.dataValues, message: 'You are now logged in!' });
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


router.get('/profile-img', async (req, res) => {
  // console.log(req.params.id);
  if (req.session.loggedIn) {
    try {
      const userDB = await User.findOne({
        where: {
          id: req.session.user_id,
        },
      })
      console.log("180 DB received: ", userDB);
      res.render('profile-picture', {
        profile_picture: userDB.profile_picture,
        loggedIn: req.session.loggedIn,
        user_id: userDB.id
      });
    } catch (err) {
      console.log(err);
    }
  }
  // if (req.session.loggedIn) {
  //   res.status(200);
  //   console.log('profile picture page');
  //   console.log(req.session);
  // }
  // res.render('profile-picture', {
  //   profile_picture: req.session.profile_picture,
  //   loggedIn: req.session.loggedIn,
  //   user_id: req.session.user_id
  // });
});

router.put('/profile-img-upload/:id', withAuth, async (req, res) => {
  // console.log(req.files.path);
  const filePath = req.body.file.path;
  console.log(filePath);
  // console.log(req.files);
  var fileNewUrl;
  await cloudinary.uploader.upload(filePath, async (err, result) => {
    if (err) {
      res.status(500).json(err)
      res.render('profile-picture', {
        msg: err
      })
    } else {
      console.log(result);

    }
    if (!result.url) {
      fileNewUrl = 'https://workhound.com/wp-content/uploads/2017/05/placeholder-profile-pic.png'
    } else {
      fileNewUrl = result.url;
    }

    try {

      const userForImg = await User.update({ profile_picture: fileNewUrl },
        {
          where: {
            id: req.params.id,
          },


        },

      )

      // const userForImgg = userForImg.get({ plain: true });
      // req.session.save(() => {
      //   // req.session.loggedIn = true;
      //   // user_id = req.session.user_id
      //   req.session.profile_picture = result.url;

      //   // console.log('userDB', userDB);
      //   // res.status(200).json({ user: userDB.dataValues, message: 'You are now logged in!' });

      // });
      // res.render('profile-picture', {
      //   user_id: req.session.user_id,
      //   profile_picture: fileNewUrl
      // })
      console.log("result", userForImg);

      res.status(200).json(fileNewUrl);


      // console.log("pr pic rendered: ", profile_picture);
      console.log("from upload function: ", fileNewUrl);
    } catch (err) {
      console.log(err);

      res.status(500).json(err)
    }
  })



})

//Profile route
router.get('/profile', (req, res) => {
  if (req.session.loggedIn) {
    res.status(200);
    console.log('signed into profile!');
  }
  res.render('profilepage', {
    user_id: req.session.user_id
  });
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
