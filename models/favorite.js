// Purpose: Favorite model for sequelize ORM
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); //  Sequelize database connection

class Favorite extends Model {}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipe_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favorites', // Make sure this matches your actual table name
  }
);

module.exports = Favorite;
