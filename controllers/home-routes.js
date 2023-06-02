const router = require('express').Router();
const { Recipe, User, } = require('../models');
const withAuth = require('../utils/auth');

// GET /recipes
router.get('/', async (req, res) => {
    console.log("homeRoutes GET/");
   
    try {
        const recipeData = await Recipe.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],    
        });
        const recipes = recipeData.map((recipe) => recipe.get({ plain: true }));
        
        res.render('homepage', {
            recipes,
            logged_in: req.session.logged_in
        });
    
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET /recipes/1
// router.get('/:id', withAuth, async (req, res) => {
//     try {
//         const recipeData = await Recipe.findByPk(req.params.id, {
//             include: [
//                 {
//                     model: User,
//                     attributes: ['username']
//                 },
//             ],
//         });
//         const recipe = recipeData.get({ plain: true });
//         res.render('recipe', {
//             ...recipe,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// Use withAuth middleware to prevent access to route
// router.get('/', withAuth, async (req, res) => {
//     try {
//         // Find the logged in user based on the session ID
//         const userData = await User.findByPk(req.session.user_id, {
//             attributes: { exclude: ['password'] },
//             include: [{ model: Recipe }],
//         });
//         const user = userData.get({ plain: true });
//         res.render('userprofile', {
//             ...user,
//             logged_in: true
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// GET /login
router.get('/login', (req, res) => {
    try{
        //  If the user is already logged in, redirect the request to another route
        console.log("sessionHere: " + req.session.logged_in);
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }  
});


module.exports = router;
