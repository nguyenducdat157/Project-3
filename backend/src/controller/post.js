const Post = require('../models/post.js');

module.exports.createPost = (req, res) => {
  try {
    const { title, body } = req.body;
    let pictures = [];
    if (req.files.length > 0) {
      pictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    const post = new Post({
      title: title,
      body: body,
      pictures: pictures,
      postBy: req.user._id,
    });
    post.save((error, post) => {
      if (error) return res.status(400).json({ error: 'error when user create post' });
      if (post) {
        res.status(201).json({
          code: 0,
          data: post,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts)
      return res.status(200).json({
        code: 0,
        data: posts,
      });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports.removePost = async (req, res) => {
  try {
    const idPost = req.params.id;
    Post.findOneAndDelete({ _id: idPost }, (err, post) => {
      if (err) {
        return res.status(500).json({ error: 'Server error' });
      }
      if (post) {
        return res.status(200).json({
          code: 0,
          message: 'Delete post success',
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};
