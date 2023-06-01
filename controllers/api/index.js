const router = require('express').Router();
const userRoutes = require('./user-routes');
const recipeRoutes = require('./recipes-route');
const tagRoutes = require('./tag-routes');


router.use('/users', userRoutes);
router.use('/recipes', recipeRoutes);
router.use('/tags', tagRoutes);

module.exports = router;