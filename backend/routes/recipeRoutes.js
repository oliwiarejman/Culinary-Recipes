const express = require("express");
const router = express.Router();
const recipeController = require("../controllers/recipeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", recipeController.getAllAnime);
router.get("/search", recipeController.searchAnime);
router.get("/:id", recipeController.getAnimeById);
router.post("/", authMiddleware, recipeController.createAnime);
router.put("/:id", authMiddleware, recipeController.updateAnime);
router.delete("/:id", authMiddleware, recipeController.deleteAnime);

module.exports = router;
