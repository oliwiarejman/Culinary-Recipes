const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  recipe_id: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment_text: { type: String, required: true },
});

const CommentModel = mongoose.model("Comment", commentSchema);

module.exports = CommentModel;
