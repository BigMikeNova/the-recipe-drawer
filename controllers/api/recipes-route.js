const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const { Recipe, User } = require("../../models");
const withAuth = require("../../utils/auth");

// GET /recipes

router.get("/", (req, res) => {
  Recipe.findAll({
    attributes: [
      "id",
      "recipe_name",
      "ingredients",
      "recipe_measurement",
      "recipe_instructions",
      "recipe_cooktime",
      "recipe_servings",
      "recipe_category",
      "created_at",
    ],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbRecipeData) => res.json(dbRecipeData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// GET /1
router.get("/:id", async (req, res) => {
  try {
    const dbRecipeData = await Recipe.findByPk(req.params.id, {
      attributes: [
        "id",
        "recipe_name",
        "ingredients",
        "recipe_measurement",
        "recipe_instructions",
        "recipe_cooktime",
        "recipe_servings",
        "recipe_category",
        "created_at",
      ],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.status(200).json(dbRecipeData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST
router.post("/", withAuth, async (req, res) => {
  try {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error uploading image' });
      }

      const { recipe_image } = files;
      const { recipe_name, ingredients, recipe_measurement, recipe_instructions, recipe_cooktime, recipe_servings, recipe_category } = fields;

      // Move the uploaded image to a permanent storage folder
      const targetPath = `public/images/recipes/${recipe_image.name}`;
      fs.renameSync(recipe_image.path, targetPath);

      const dbRecipeData = await Recipe.create({
        recipe_name,
        recipe_image: targetPath,
        ingredients,
        recipe_measurement,
        recipe_instructions,
        recipe_cooktime,
        recipe_servings,
        recipe_category,
        user_id: req.session.user_id,
      });
      
      res.json(dbRecipeData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT /1
router.put("/:id", (req, res) => {
  Recipe.update(
    {
      recipe_name: req.body.recipe_name,
      ingredients: req.body.ingredients,
      recipe_measurement: req.body.recipe_measurement,
      recipe_instructions: req.body.recipe_instructions,
      recipe_cooktime: req.body.recipe_cooktime,
      recipe_servings: req.body.recipe_servings,
      recipe_category: req.body.recipe_category,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({ message: "No recipe found with this id" });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// DELETE /1
router.delete("/:id", (req, res) => {
  Recipe.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbRecipeData) => {
      if (!dbRecipeData) {
        res.status(404).json({ message: "No recipe found with this id" });
        return;
      }
      res.json(dbRecipeData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
