const router = require('express').Router();
const userRoutes = require('./userRoutes');
const artworkPost = require('./postArtwork')

router.use('/users', userRoutes);
router.use('/post', artworkPost);

module.exports = router;
