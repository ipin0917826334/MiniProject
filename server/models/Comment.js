const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: String,
  likes: Number,
  dislikes: Number,
  author: String,
  imgProfile: String,
  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  dislikedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
