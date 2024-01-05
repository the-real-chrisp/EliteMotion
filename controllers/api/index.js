const router = require('express').Router();
const profileRoutes = require('./profileRoutes');
const userRoutes = require('./userRoutes')

router.use('/profile', profileRoutes);
router.use('/user', userRoutes);

module.export = router;