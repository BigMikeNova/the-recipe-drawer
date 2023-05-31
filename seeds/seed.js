const sequelize = require('../config/connection');
const seedRecipes = require('./recipes-seeds');
const seedUsers = require('./user-seeds');
const seedRecipeTags = require('./tag-seeds');

const seedAll = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();

    await seedRecipes();

    await seedRecipeTags();

    process.exit(0);
}

seedAll();