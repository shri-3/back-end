const express = require("express");
const app = express();

const connectDB = require("./db/db.connect");
const Recipes = require("./models/recipe.model");

// Connect to the database
connectDB();

/**
 * Creates a new recipe in the database
 */
app.post("/recipes", async (req, res) => {
  const newRecipe = req.body;
  if (
    !newRecipe.title ||
    !newRecipe.author ||
    !newRecipe.prepTime ||
    !newRecipe.cookTime ||
    !newRecipe.ingredients ||
    !newRecipe.instructions ||
    !newRecipe.imageUrl
  ) {
    res.status(400).json({
      error:
        "Title, author, difficulty, prep time, cook time, ingredients and instructions are required to create a recipe.",
    });
  } else {
    try {
      const createdRecipe = await Recipes.create(newRecipe);
      res.status(201).json({
        message: "Recipe created successfully.",
        recipe: createdRecipe,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to create recipe." });
    }
  }
});

/**
 * Fetches all recipes from the database
 */
app.get("/recipes", async (req, res) => {
  try {
    const recipes = await Recipes.find();
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

/**
 * Fetches a recipe by its title from the database
 */
app.get("/recipes/:title", async (req, res) => {
  const recipeTitle = req.params.title;
  console.log(recipeTitle);

  if (!recipeTitle) {
    return res.status(400).json({ error: "Invalid recipe title." });
  } else {
    try {
      const recipe = await Recipes.findOne({ title: recipeTitle });
      if (recipe) {
        res.json(recipe);
      } else {
        res.status(404).json({ error: "Recipe not found." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the recipe." });
    }
  }
});

/**
 * Fetches a recipe by its author from the database
 */
app.get("/recipes/author/:author", async (req, res) => {
  const recipeAuthor = req.params.author;
  console.log(recipeAuthor);

  if (!recipeAuthor) {
    return res.status(400).json({ error: "Invalid recipe author." });
  } else {
    try {
      const recipes = await Recipes.find({ author: recipeAuthor });
      if (recipes.length > 0) {
        res.json(recipes);
      } else {
        res.status(404).json({ error: "No recipes found for this author." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "An error occurred while fetching the recipes." });
    }
  }
});

/**
 * Fetches recipes by its Easy difficulty from the database
 */
app.get("/recipes/difficulty/easy", async (req, res) => {
  try {
    const recipes = await Recipes.find({ difficulty: "Easy" });
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch easy difficulty recipes." });
  }
});

/**
 * Fetches recipes by update by its id from the database
 */
app.put("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;
  const updatedRecipe = req.body;

  try {
    const recipe = await Recipes.findByIdAndUpdate(recipeId, updatedRecipe, {
      new: true,
    });
    if (recipe) {
      res.json({ message: "Recipe updated successfully.", recipe: recipe });
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the recipe." });
  }
});

/**
 * Deletes a recipe by its id from the database
 */
app.delete("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
    const deletedRecipe = await Recipes.findByIdAndDelete(recipeId);
    if (deletedRecipe) {
      res.json({
        message: "Recipe deleted successfully.",
        recipe: deletedRecipe,
      });
    } else {
      res.status(404).json({ error: "Recipe not found." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the recipe." });
  }
});

module.exports = app;
