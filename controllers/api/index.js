const router = require('express').Router();
const userRoutes = require('./userRoutes');
const artworkPost = require('./post-deleteArtwork');
const artworkRoutes = require('./artwork');
const artworkComments = require('./comment-routes');

router.use('/users', userRoutes);
router.use('/post-artwork', artworkPost);
router.use('/artwork', artworkRoutes);
router.use('/comment', artworkComments);

module.exports = router;
