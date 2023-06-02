const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');

// GET /recipes/:id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        });
        const recipe = recipeData.get({ plain: true });
        res.render('recipe', {
            ...recipe,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
