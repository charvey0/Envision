const router = require('express').Router();
const sequelize = require('../config/connection');
const { Artwork, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
router.get('/', withAuth, (req, res) => {
  Artwork.findAll({
    where: {
      user_id: req.session.user_id,
    },
    attributes: [
      'id',
      'title',
      'description',
      'date_created',
      'grade_level',
      'file_path',
    ],
    include: [
      {
        model: Comment,
        attributes: [
          'id',
          'comment_text',
          'post_id',
          'user_id',
          'date_created',
        ],
        include: {
          model: User,
          attributes: ['first_name, last_name'],
        },
      },
      {
        model: User,
        attributes: ['first_name, last_name'],
      },
    ],
  })
    .then((dbArtworkData) => {
      const Artwork = dbArtworkData.map((Artwork) =>
        Artwork.get({ plain: true })
      );
      res.render('profile', { Artwork, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/edit/:id', withAuth, (req, res) => {
  Artwork.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'title', 'description', 'date_created'],
    include: [
      {
        model: User,
        attributes: ['username'],
      },
      {
        model: Comment,
        attributes: [
          'id',
          'comment_text',
          'artwork_id',
          'user_id',
          'date_created',
        ],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
    ],
  })
    .then((dbArtworkData) => {
      if (!dbArtworkData) {
        res.status(404).json({ message: 'No Artwork found with this id' });
        return;
      }

      const Artwork = dbArtworkData.get({ plain: true });
      res.render('edit-artwork', { Artwork, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
