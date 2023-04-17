const Topic = require('../models/Topic');
const Comment = require('../models/Comment');


exports.getTopics = async (req, res) => {
  const topics = await Topic.find().populate('posts');
  res.json(topics);
};

exports.createTopic = async (req, res) => {
  const { title, description, author, posts , vehicles, likes, dislikes, start, destination } = req.body;

  const topic = new Topic({
    title,
    description,
    author,
    posts,
    likes,
    dislikes,
    start,
    destination,
    vehicles
  });
  await topic.save();

  res.json(topic);
};

exports.getTopicById = async (req, res) => {
  const topic = await Topic.findById(req.params.id).populate('posts');
  res.json(topic);
};

exports.createComment = async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();

  const topic = await Topic.findById(req.params.id);
  topic.posts.push(comment._id);
  topic.commentCount = topic.commentCount + 1;
  await topic.save();

  res.json(comment);
};
exports.updateCommentLikesDislikes = async (req, res) => {
  const userId = req.body.userId; // Assuming you have the user in the request object
  const commentId = req.params.comment_id;
  const { likes, dislikes, action } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      res.status(404).json({ message: "Comment not found." });
    } else {
      // Update the likedBy and dislikedBy arrays based on the user's action
      if (action === "like") {
        if (!comment.likedBy.includes(userId)) {
          comment.likedBy.push(userId);
          comment.dislikedBy.pull(userId);
        } else {
          comment.likedBy.pull(userId);
        }
      } else if (action === "dislike") {
        if (!comment.dislikedBy.includes(userId)) {
          comment.dislikedBy.push(userId);
          comment.likedBy.pull(userId);
        } else {
          comment.dislikedBy.pull(userId);
        }
      }

      comment.likes = comment.likedBy.length;
      comment.dislikes = comment.dislikedBy.length;

      await comment.save();
      res.status(200).json(comment);
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating comment." });
  }
};
  

