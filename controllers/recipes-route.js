const router = require('express').Router();
const { Recipe, User, } = require('../models');

// GET /recipes

router.get('', (req, res) => {
    Recipe.findAll({
        attributes: [
            'id',
            'recipe_name',
            'ingredients',
            'recipe_measurement',
            'recipe_instructions',
            'recipe_cooktime',
            'recipe_servings',
            'recipe_category',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(dbRecipeData => res.json(dbRecipeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);

// GET /recipes/1

router.get('/:id', withAuth, async (req, res) => {
    try {
        const dbRecipeData = await Recipe.findByPk(req.params.id, {
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'recipe_name',
            'ingredients',
            'recipe_measurement',
            'recipe_instructions',
            'recipe_cooktime',
            'recipe_servings',
            'recipe_category',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    });
    const recipe = dbRecipeData.map(recipe => recipe.get({ plain: true }));
    res.render('view-recipe', {
        recipe,
        loggedIn: req.session.loggedIn
    });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);
//         .then(dbRecipeData => {
//             if (!dbRecipeData) {
//                 res.status(404).json({ message: 'No recipe found with this id' });
//                 return;
//             }
//             res.json(dbRecipeData);
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// }
// );

// POST /recipes

router.post('/', withAuth, async (req, res) => {
    try {
        const dbRecipeData = await Recipe.create({
        recipe_name: req.body.recipe_name,
        ingredients: req.body.ingredients,
        recipe_measurement: req.body.recipe_measurement,
        recipe_instructions: req.body.recipe_instructions,
        recipe_cooktime: req.body.recipe_cooktime,
        recipe_servings: req.body.recipe_servings,
        recipe_category: req.body.recipe_category,
        user_id: req.session.user_id
    });
    res.json(dbRecipeData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}
);
//         .then(dbRecipeData => res.json(dbRecipeData))
//         .catch(err => {
//             console.log(err);
//             res.status(500).json(err);
//         });
// }
// );

// PUT /recipes/1

router.put('/:id', (req, res) => {
    Recipe.update(
        {
            recipe_name: req.body.recipe_name,
            ingredients: req.body.ingredients,
            recipe_measurement: req.body.recipe_measurement,
            recipe_instructions: req.body.recipe_instructions,
            recipe_cooktime: req.body.recipe_cooktime,
            recipe_servings: req.body.recipe_servings,
            recipe_category: req.body.recipe_category
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }
            res.json(dbRecipeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);

// DELETE /recipes/1

router.delete('/:id', (req, res) => {
    Recipe.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbRecipeData => {
            if (!dbRecipeData) {
                res.status(404).json({ message: 'No recipe found with this id' });
                return;
            }
            res.json(dbRecipeData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);

module.exports = router;