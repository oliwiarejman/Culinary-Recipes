const Comment = require("../models/commentModel");
const Recipe = require("../models/recipeModel");

exports.getAllComments = async (req, res) => {
  try {
    const allComments = await Comment.find();
    res.json(allComments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      res.json(comment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createComment = async (req, res) => {
  const { recipe_id, rating, comment_text } = req.body;
  console.log({
    user_id: req.user.userId,
    recipe_id,
    rating,
    comment_text,
  });

  try {
    const newComment = new Comment({
      user_id: req.user.userId,
      recipe_id,
      rating,
      comment_text,
    });
    await newComment.save();

    const allComments = await Comment.find({ recipe_id });

    const ratings = allComments.map((comment) => comment.rating);
    const averageRating = calculateAverageRating(ratings);

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipe_id,
      { $set: { averageRating } },
      { new: true }
    );

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function calculateAverageRating(ratings) {
  if (ratings.length === 0) {
    return 0;
  }

  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const average = sum / ratings.length;
  return parseFloat(average.toFixed(2));
}

exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedComment) {
      res.json(updatedComment);
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (deletedComment) {
      res.json({ message: "Comment deleted" });
    } else {
      res.status(404).json({ message: "Comment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCommentsByRecipeId = async (req, res) => {
  const recipeId = req.params.recipeId;

  try {
    const comments = await Comment.find({ recipe_id: recipeId });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
