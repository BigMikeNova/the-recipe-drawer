const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Recipe model
class Recipe extends Model {}

Recipe.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ingredients: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipe_instructions: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        recipe_cooktime: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recipe_servings: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        recipe_category: {
            type: DataTypes.STRING,
            references: {
                model: 'category',
                key: 'category_name',
            },
        },
        // recipe_image: {
        //     type: DataTypes.STRING,
        //     allowNull: true,
        // },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe',
    }
);

module.exports = Recipe;