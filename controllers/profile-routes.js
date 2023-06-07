const router = require('express').Router();
const { User, Recipe } = require('../models');
const withAuth = require('../utils/auth');

// GET /recipes for logged in user
router.get('/', withAuth, async (req, res) => {
    console.log(req.session.user_id);
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Recipe }],
        });
        const user = userData.get({ plain: true });
        console.log(user);
        res.render('userprofile', {
            logged_in: req.session.logged_in,
            user: user,
            recipes: user.recipes,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET /recipes/:id
router.get('/:id', withAuth, async (req, res) => {
    try {
        const recipeData = await Recipe.findByPk(req.params.user_id, {
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

// POST /recipes
router.post('/', withAuth, async (req, res) => {
    try {
        const newRecipe = await Recipe.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.redirect('/profile');
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT /recipes/:id
router.put('/:id', withAuth, async (req, res) => {
    try {
        const recipeData = await Recipe.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!recipeData) {
            res.status(404).json({ message: 'No recipe found with this id!' });
            return;
        }
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE /recipes/:id
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const recipeData = await Recipe.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!recipeData) {
            res.status(404).json({ message: 'No recipe found with this id!' });
            return;
        }
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;