const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const profileRoutes = require('./profile-routes.js');
const viewRecipesRoutes = require('./view-recipes.js');

router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/view-recipes', viewRecipesRoutes);
router.use('/api', apiRoutes);

module.exports = router;