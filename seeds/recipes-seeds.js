const { Recipe } = require('../models');

const recipeSeeds = [
  {
    recipe_name: 'Spaghetti Carbonara',
    ingredients: 'Spaghetti, eggs, bacon, Parmesan cheese, black pepper',
    recipe_measurement: 'grams',
    recipe_instructions: 'Cook spaghetti, fry bacon, mix eggs and cheese, combine all ingredients, season with pepper, serve hot.',
    recipe_cooktime: '20 minutes',
    recipe_servings: 2,
    recipe_category: 'Pasta/Noodles',
    user_id: 1,
  },
  {
    recipe_name: 'Roasted Vegetable Quinoa Salad',
    ingredients: 'Quinoa, bell peppers, zucchini, eggplant, cherry tomatoes, feta cheese, olive oil, balsamic vinegar',
    recipe_measurement: 'cups',
    recipe_instructions: 'Cook quinoa, roast vegetables, prepare dressing, combine all ingredients, crumble feta cheese, drizzle dressing, toss well, serve chilled.',
    recipe_cooktime: '30 minutes',
    recipe_servings: 4,
    recipe_category: 'Salad',
    user_id: 2,
  },
  {
    recipe_name: 'Black Bean Tacos',
    ingredients: 'Black beans, tortillas, lettuce, tomatoes, avocado, salsa, sour cream',
    recipe_measurement: 'cans',
    recipe_instructions: 'Heat black beans, warm tortillas, chop lettuce and tomatoes, slice avocado, assemble tacos with beans and toppings, serve with salsa and sour cream.',
    recipe_cooktime: '15 minutes',
    recipe_servings: 3,
    recipe_category: 'Vegetarian',
    user_id: 1,
  },
  {
    recipe_name: 'Gluten-Free Banana Bread',
    ingredients: 'Ripe bananas, gluten-free flour blend, baking powder, baking soda, salt, eggs, sugar, vegetable oil',
    recipe_measurement: 'cups',
    recipe_instructions: 'Mash bananas, mix dry ingredients, beat eggs and sugar, combine all ingredients, pour batter into loaf pan, bake until golden, cool before slicing.',
    recipe_cooktime: '1 hour',
    recipe_servings: 8,
    recipe_category: 'Gluten Free',
    user_id: 3,
  },
  {
    recipe_name: 'Chicken Tikka Masala',
    ingredients: 'Chicken, yogurt, lemon juice, garlic, ginger, spices, tomatoes, cream, butter, cilantro',
    recipe_measurement: 'pounds',
    recipe_instructions: 'Marinate chicken, grill or cook in a skillet, prepare sauce with tomatoes and spices, simmer chicken in sauce, add cream and butter, garnish with cilantro, serve with rice or naan.',
    recipe_cooktime: '40 minutes',
    recipe_servings: 6,
    recipe_category: 'Dinner',
    user_id: 2,
  },
];

const seedRecipes = () => Recipe.bulkCreate(recipeSeeds);

module.exports = seedRecipes;
