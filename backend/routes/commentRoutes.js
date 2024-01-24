const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", commentController.getAllComments);
router.get("/:id", commentController.getCommentById);
router.get("/recipes/:recipeId", commentController.getCommentsByRecipeId);
router.post("/", authMiddleware, commentController.createComment);
router.put("/:id", authMiddleware, commentController.updateComment);
router.delete("/:id", authMiddleware, commentController.deleteComment);

module.exports = router;
