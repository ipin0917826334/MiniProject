const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  title: String,
  description: String,
  likes: Number,
  dislikes: Number,
  author: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

const Topic = mongoose.model('Topic', TopicSchema);
module.exports = Topic;