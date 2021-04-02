const router = require('express').Router();
const { User } = require('../../models');
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

router.post('/', (req, res) => {
  console.log(req.body);
  User.create({
    email: req.body.email,
    password: req.body.password,
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    role_id: +req.body.role,
  })

    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.email = dbUserData.email;
        req.session.loggedIn = true;

        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// router.post('/login', (req, res) => {
//   User.findOne({
//     where: {
//       email: req.body.email,
//     },
//   })
//     .then((dbUserData) => {
//       if (!dbUserData) {
//         res.status(400).json({ message: 'No user with that email!' });
//         return;
//       }
//       const validPassword = dbUserData.checkPassword(req.body.password);

//       if (!validPassword) {
//         res.status(400).json({ message: 'Incorrect password!' });
//         return;
//       }
//       req.session.save(() => {
//         req.session.user_id = dbUserData.id;
//         req.session.email = dbUserData.email;
//         req.session.loggedIn = true;

//         res.json({ user: dbUserData, message: 'You are now logged in!' });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.post('/logout', (req, res) => {
//   if (req.session.loggedIn) {
//     req.session.destroy(() => {
//       res.status(204).end();
//     });
//   } else {
//     res.status(404).end();
//   }
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
