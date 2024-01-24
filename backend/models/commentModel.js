const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipe_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment_text: { type: String, required: true },
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
