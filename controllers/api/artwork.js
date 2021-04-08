const router = require('express').Router();
const { Artwork, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/:id', async (req, res) => {
  try {
    const artData = await Artwork.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password']
          }
        },
      ],
    });
    if (!artData) {
      res.status(404).json({ message: 'Could not find this piece, try the Louvre...' });
      return;
    }
    const art = artData.get({ plain: true });

    const commentData = await Comment.findAll({
      where: {
        artwork_id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password']
          }
        },
      ],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    comments.forEach((comment) => {
      let owner = false;
      if (req.session.user_id == comment.user_id) {
        owner = true;
      }
      comment.owner = owner;
    });

    res.render('art', {
      art: art,
      comments: comments,
      loggedIn: req.session.loggedIn,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
      session_profile_picture: req.session.profile_picture
    });
    console.log(comments);
    console.log(art);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  };
});

router.post('/post/comment/:id', async (req, res) => {
  console.log(req.body);
  try {
    // const commenter_id = req.session.user.id;
    // const userData = await User.findByPk(commenter_id);
    // const commenter_user = userData.get({ plain: true });

    // const username = commenter_user.username;

    const commentData = await Comment.create({
      artwork_id: req.body.artwork_id,
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
    });
    const comment = commentData.get({ plain: true });
    // const redir = '/api/artwork/' + comment.artwork_id;
    console.log(comment);

    // res.status(200).redirect(redir);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// router.post('/post', withAuth, async (req, res) => {
//   console.log(req.body);
//   if (req.session) {
//     Comment.create({
//       comment_text: req.body.comment_text,
//       artwork_id: req.body.artwork_id,
//       user_id: req.session.user_id,
//     })
//       .then((dbCommentData) => res.json(dbCommentData))
//       .catch((err) => {
//         console.log(err);
//         res.status(400).json(err);
//       });
//   }
// });

// router.put('/:id', withAuth, (req, res) => {
//   Comment.update(
//     {
//       comment_text: req.body.comment_text,
//     },
//     {
//       where: {
//         id: req.params.id,
//       },
//     }
//   )
//     .then((dbCommentData) => {
//       if (!dbCommentData) {
//         res.status(404).json({ message: 'No comment found with this id' });
//         return;
//       }
//       res.json(dbCommentData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// router.delete('/:id', withAuth, (req, res) => {
//   Comment.destroy({
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((dbCommentData) => {
//       if (!dbCommentData) {
//         res.status(404).json({ message: 'No comment found with this id' });
//         return;
//       }
//       res.json(dbCommentData);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });
module.exports = router;


// router.get('/:id', async (req, res) => {
//   try {
//     const artData = await Artwork.findByPk(req.params.id, {
//       include: [
//         {
//           model: Comment,
//           where: {
//             artwork_id: req.params.id
//           }
//           // include: {
//           //   model: User,
//           //   attributes: ['first_name', 'last_name']
//           // }
//         },
//         {
//           model: User,
//           // exclude: ['password']
//         },

//       ],
//     });
//     if (!artData) {
//       res.status(404).json({ message: 'Could not find this piece, try the Louvre...' });
//       return;
//     }
//     const art = artData.get({ plain: true });

//     // const commentData = await Comment.findAll(
//     //   {
//     //     where: {
//     //       artwork_id: req.params.id,
//     //     },
//     //   },
//     // );

//     // const comments = commentData.map((comment) => comment.get({ plain: true }));

//     // comments.array.forEach((comment) => {
//     //   let owner = false;
//     //   if (req.session.user_id == comment.user_id) {
//     //     owner = true;
//     //   }
//     //   comment.owner = owner;
//     // });

//     //res.status(200).json(art).render('art', { art: art, comments: comments });

//     res.render('art', {
//       art: art,
//       loggedIn: req.session.loggedIn,
//       first_name: req.session.first_name,
//       last_name: req.session.last_name

//     });
//     console.log(art);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   };
// });