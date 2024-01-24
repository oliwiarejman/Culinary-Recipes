const Recipe = require("../models/recipeModel");

exports.getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find();
    res.json(allRecipes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedRecipe) {
      res.json(updatedRecipe);
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
    if (deletedRecipe) {
      res.json({ message: "Recipe deleted" });
    } else {
      res.status(404).json({ message: "Recipe not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchRecipes = async (req, res) => {
  const { title, ingredients, difficulty, sortOrder } = req.query;
  const query = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

  if (ingredients) {
    query.ingredients = { $regex: ingredients, $options: "i" };
  }

  if (difficulty) {
    query.difficulty = { $regex: difficulty, $options: "i" };
  }

  let sortDirection = 1;

  if (sortOrder && sortOrder.toLowerCase() === "desc") {
    sortDirection = -1;
  }

  try {
    const results = await Recipe.find(query).sort({
      date_added: sortDirection,
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
