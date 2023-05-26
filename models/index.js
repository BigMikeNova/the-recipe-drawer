// import models
const User = require('./user');
const Recipe = require('./recipe');
const RecipeTag = require('./recipe-tag');

// create associations
User.hasMany(Recipe, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Recipe.belongsTo(User, {
    foreignKey: 'user_id'
});

RecipeTag.belongsTo(Recipe, {
    foreignKey: 'recipe_id'
});

Recipe.hasMany(RecipeTag, {
    foreignKey: 'recipe_id',
    onDelete: 'CASCADE'
});

module.exports = { User, Recipe, RecipeTag };