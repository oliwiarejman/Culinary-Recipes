const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", commentController.getAllReviews);
router.get("/:id", commentController.getReviewById);
router.get("/anime/:animeId", commentController.getReviewsByAnimeId);
router.post("/", authMiddleware, commentController.createReview);
router.put("/:id", authMiddleware, commentController.updateReview);
router.delete("/:id", authMiddleware, commentController.deleteReview);

module.exports = router;
