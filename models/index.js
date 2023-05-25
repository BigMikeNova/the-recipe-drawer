// import models
const User = require('./user');
const Recipe = require('./recipe');
const Category = require('./category');
const RecipeTag = require('./recipe-tag');

// create associations
User.hasMany(Recipe, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id'
});

Category.hasMany(Recipe, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE'
});

Recipe.belongsTo(Category, {
    foreignKey: 'category_id'
});

Recipe.belongsToMany(Category, {
    through: RecipeTag,
    foreignKey: 'recipe_id'
});

Category.belongsToMany(Recipe, {
    through: RecipeTag,
    foreignKey: 'category_id'
});

module.exports = { User, Recipe, Category, RecipeTag };