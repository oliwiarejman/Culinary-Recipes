const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", recipeController.getAllRecipes);
router.get("/search", recipeController.searchRecipes);
router.get("/:id", recipeController.getRecipeById);
router.post("/", authMiddleware, recipeController.createRecipe);
router.put("/:id", authMiddleware, recipeController.updateRecipe);
router.delete("/:id", authMiddleware, recipeController.deleteRecipe);

module.exports = router;
