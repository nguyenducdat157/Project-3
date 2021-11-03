const Post = require('../models/post.js');
const User = require('../models/user.js');

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
    const listPost = [];
    const result = [];
    const listFollower = req.user.following; //followwing = [userId: {ObjectID}]
    for (let i = 0; i < listFollower.length; i++) {
      let post = await Post.find({ postBy: listFollower[i].userId });
      if (post.length > 0) {
        listPost.push(post);
      }
    }
    for (let i = 0; i < listPost.length; i++) {
      for (let j = 0; j < listPost[i].length; j++) {
        result.push(listPost[i][j]);
      }
    }
    if (result.length > 0)
      return res.status(200).json({
        code: 0,
        data: result.sort((a, b) => {
          return b.updatedAt - a.updatedAt;
        }),
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
