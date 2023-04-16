const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
  title: String,
  description: String,
  likes: Number,
  dislikes: Number,
  author: String,
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  commentCount: {
    type: Number,
    default: 0,
  },
});

const Topic = mongoose.model('Topic', TopicSchema);
module.exports = Topic;