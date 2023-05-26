const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create RecipeTag model
class RecipeTag extends Model {}

RecipeTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id',
            },
    },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'recipe',
                key: 'id',
            },
                include: {
                    model: 'recipe',
                    attributes: ['recipe_category'],
            },

        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'recipe_tag',
    }
);

module.exports = RecipeTag;