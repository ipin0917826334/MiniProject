const Topic = require('../models/Topic');
const Comment = require('../models/Comment');

exports.getTopics = async (req, res) => {
  const topics = await Topic.find().populate('posts');
  res.json(topics);
};

exports.createTopic = async (req, res) => {
  const topic = new Topic(req.body);
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
  await topic.save();

  res.json(comment);
};
