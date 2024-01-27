const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: String, required: true },
  preparation_steps: { type: String, required: true },
  preparation_time: { type: String, required: true },
  difficulty: { type: String },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  averageRating: { type: Number, default: 0 },
  date_added: { type: Date, default: Date.now },
});

const RecipeModel = mongoose.model("Recipe", recipeSchema);

module.exports = RecipeModel;
