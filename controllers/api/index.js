const router = require('express').Router();
const userRoutes = require('./userRoutes');
const artworkPost = require('./post-deleteArtwork')
const artworkRoutes = require('./artwork')

router.use('/users', userRoutes);
router.use('/post-artwork', artworkPost);
router.use('/artwork', artworkRoutes);

module.exports = router;
