const router = require('express').Router();

// const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const userRoutes = require('./api');

router.use('/', homeRoutes);
// router.use('/api', apiRoutes);
router.use('/api', userRoutes);
module.exports = router;
