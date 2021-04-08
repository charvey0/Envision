const router = require('express').Router();
const { User, Artwork, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
  try {
    const artworkData = await Artwork.findByPk(req.params.id);
    if (!artworkData) {
      res.status(404).json({ message: 'I cannot find it... I will check in the back... nope, not here.' });
      return;
    }
    const artwork = artworkData.get({ plain: true });
    res.render('comment-add', { artwork: artwork });
  } catch (err) {
    res.status(500).json(err);
  };
});

// router.post('/post/:id', async (req, res) => {
//   console.log(req.body);
//   try {
//     // const commenter_id = req.session.user.id;
//     // const userData = await User.findByPk(commenter_id);
//     // const commenter_user = userData.get({ plain: true });

//     // const username = commenter_user.username;

//     const commentData = await Comment.create({
//       artwork_id: req.body.artwork_id,
//       comment_text: req.body.comment_text,
//       user_id: req.session.user_id,
//     });
//     const comment = commentData.get({ plain: true });
//     // const redir = '/api/artwork/' + comment.artwork_id;
//     console.log(comment);

//     // res.status(200).redirect(redir);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json(err);
//   }
// });



// router.post('/', withAuth, (req, res) => {

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























// // const router = require('express').Router();
// const Comment = require('../../models/Comment');
// const Post = require('../../models/Post');
// const User = require('../../models/User');


// // routes to get comments by post_id
// router.get('/:id', checkAuthenticated, async (req, res) => {
//   try {
//     const postData = await Post.findByPk(req.params.id);
//     if (!postData) {
//       res.status(404).json({ message: 'No post with this id!' });
//       return;
//     }
//     const post = postData.get({ plain: true });
//     res.render('comment-add', { post: post, layout: 'user' });
//   } catch (err) {
//     res.status(500).json(err);
//   };
// });

// router.post('/:id', checkAuthenticated, async (req, res) => {
//   try {
//     const id = req.user.dataValues.id;
//     const userData = await User.findByPk(id);
//     const user = userData.get({ plain: true });
//     const username = user.username;

//     const commentData = await Comment.create({
//       post_id: req.params.id,
//       body: req.body.body,
//       user_id: req.user.dataValues.id,
//       username: username,
//     });
//     const comment = commentData.get({ plain: true });
//     const redir = '/api/post/' + comment.post_id;

//     res.status(200).redirect(redir);
//   } catch (err) {
//     res.status(400).json({ message: 'not created' });
//   }
// });


// // routes to edit a comment
// router.get('/edit/:id', checkAuthenticated, async (req, res) => {
//   try {
//     const commentData = await Comment.findByPk(req.params.id);
//     if (!commentData) {
//       res.status(404).json({ message: 'No comment with this id!' });
//       return;
//     }
//     const comment = commentData.get({ plain: true });
//     res.render('comment-edit', { comment: comment, layout: 'user' });
//   } catch (err) {
//     res.status(500).json(err);
//   };
// });

// router.post('/edit/:id', checkAuthenticated, async (req, res) => {
//   try {
//     const commentData = await Comment.findByPk(req.params.id);
//     if (!commentData) {
//       res.status(404).json({ message: 'No comment with this id!' });
//       return;
//     }
//     const comment = commentData.get({ plain: true });
//     const redir = '/api/post/' + comment.post_id;

//     await Comment.update(
//       {
//         body: req.body.body
//       },
//       {
//         where: {
//           id: req.params.id,
//         },
//       });
//     res.status(200).redirect(redir);
//     //res.status(200).redirect('/dashboard');
//   } catch (err) {
//     res.status(500).json(err);
//   };
// });


// // routes to delete a comment
// router.get('/delete/:id', checkAuthenticated, async (req, res) => {
//   try {
//     const commentData = await Comment.findByPk(req.params.id);
//     if (!commentData) {
//       res.status(404).json({ message: 'No comment with this id!' });
//       return;
//     }
//     const comment = commentData.get({ plain: true });
//     res.render('comment-delete', { comment: comment, layout: 'user' });
//   } catch (err) {
//     res.status(500).json(err);
//   };
// });

// router.post('/delete/:id', checkAuthenticated, async (req, res) => {
//   try {
//     const commentData = await Comment.findByPk(req.params.id);
//     if (!commentData) {
//       res.status(404).json({ message: 'No comment with this id!' });
//       return;
//     }
//     const comment = commentData.get({ plain: true });
//     const redir = '/api/post/' + comment.post_id;

//     await Comment.destroy(
//       {
//         where: {
//           id: req.params.id,
//         },
//       });
//     res.status(200).redirect(redir);
//   } catch (err) {
//     res.status(500).json(err);
//   };
// });


// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated() && req.session) {
//     return next();
//   }
//   res.redirect('/login');
// }


// module.exports = router;

