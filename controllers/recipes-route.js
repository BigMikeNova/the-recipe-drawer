const router = require('express').Router();
const { Recipe, User, } = require('../models');

// GET /api/recipes

router.get('/', (req, res) => {
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

// GET /api/recipes/1

router.get('/:id', (req, res) => {
    Recipe.findOne({
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

// POST /api/recipes

router.post('/', (req, res) => {
    Recipe.create({
        recipe_name: req.body.recipe_name,
        ingredients: req.body.ingredients,
        recipe_measurement: req.body.recipe_measurement,
        recipe_instructions: req.body.recipe_instructions,
        recipe_cooktime: req.body.recipe_cooktime,
        recipe_servings: req.body.recipe_servings,
        recipe_category: req.body.recipe_category,
        user_id: req.session.user_id
    })
        .then(dbRecipeData => res.json(dbRecipeData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
}
);

// PUT /api/recipes/1

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

// DELETE /api/recipes/1

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