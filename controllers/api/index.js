const router = require('express').Router();
const userRoutes = require('./userRoutes');
const artworkPost = require('./postArtwork')
const artworkRoutes = require('./artwork')

router.use('/users', userRoutes);
router.use('/post', artworkPost);
router.use('/artwork', artworkRoutes);

module.exports = router;
