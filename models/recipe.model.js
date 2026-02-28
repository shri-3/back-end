const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Intermediate", "Difficult"],
    },
    prepTime: { type: Number }, // in minutes
    cookTime: { type: Number }, // in minutes
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    imageUrl: { type: String, required: true },
  },
  { timestamps: true },
);

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;
