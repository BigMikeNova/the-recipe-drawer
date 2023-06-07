const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('../config/connection');
const app = express();

const PORT = process.env.PORT || 3001;

// Set up sessions with cookies
const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

// Set up handlebars.js engine with custom helpers
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// like button
app.post('/like', async (req, res) => { // Add async keyword here
  const { recipeId } = req.body;
  const userId = 'user_id';

  try {
    // Find the user and recipe based on their IDs
    const user = await User.findByPk(userId);
    const recipe = await Recipe.findByPk(recipeId);

    if (!user || !recipe) {
      return res.status(404).json({ error: 'User or recipe not found' });
    }

    // Check if the user has already liked the recipe
    const existingFavorite = await Favorite.findOne({
      where: {
        user_id: userId,
        recipe_id: recipeId,
      },
    });

    if (existingFavorite) {
      // User has already liked the recipe, so remove it from favorites
      await existingFavorite.destroy();
      return res.sendStatus(200);
    }

    // User has not yet liked the recipe, so add it to favorites
    await Favorite.create({
      user_id: userId,
      recipe_id: recipeId,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// Turn on routes
console.log("routes:");
app.use(routes);

// Turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`));
});
