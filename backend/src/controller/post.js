const Post = require('../models/post.js');
const User = require('../models/user.js');

module.exports.createPost = (req, res) => {
  try {
    const { title } = req.body;
    let pictures = [];
    if (req.files.length > 0) {
      pictures = req.files.map((file) => {
        return { img: file.filename };
      });
    }

    const post = new Post({
      title: title,
      pictures: pictures,
      postBy: req.user._id,
    });
    post.save(async (error, post) => {
      if (error) return res.status(400).json({ error: 'error when user create post' });
      if (post) {
        await User.findOneAndUpdate({ _id: req.user._id }, { $push: { posts: { postId: post._id } } });
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

module.exports.getPostById = async (req, res) => {
  const idPost = req.params.id;
  if (idPost) {
    Post.findById({ _id: idPost })
      .populate('postBy', ['userName', 'avatar'])
      .populate({ path: 'comments', populate: { path: 'userId', select: ['userName', 'avatar'] } })
      .sort('-updateAt')
      .then((post) => {
        res.status(200).json({
          code: 0,
          data: post,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
      });
  }
};

module.exports.getPosts = async (req, res) => {

  const user = await User.findOne({ _id: req.user._id })
  .populate({ path: 'following', populate: { path: 'userId', select: ['_id', 'status'] } });

  // console.log("user", user.following[0].userId);


  if(user) {
    const listFollowing = user.following.filter((obj) => obj.userId.status !== 2).map((obj) => (obj.userId._id));
    Post.find({ 'postBy' : { $in: listFollowing }, status: 0  })
      .populate('postBy', ['userName', 'avatar', 'status'])
      .populate({ path: 'comments', populate: { path: 'userId', select: 'userName' } })
      // .where('postBy.status').ne(2)
      .sort('-updatedAt')
      .then((posts) => {
        // console.log(posts);
        res.status(200).json({
          code: 0,
          data: posts,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: 'Server error' });
      });
  }
};

module.exports.removePost = async (req, res) => {
  try {
    const idPost = req.params.id;
    const removePost = await Post.findOneAndUpdate({ _id: idPost }, { status: 1 });
      if (removePost) {
        return res.status(200).json({
          code: 0,
          message: 'Delete post success',
        });
      }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports.likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userLike = req.user._id;
    const checkInList = await Post.findOne({ _id: postId, 'likes.userId': userLike });
    const update = checkInList
      ? {
          $pull: {
            likes: {
              userId: userLike,
            },
          },
        }
      : {
          $push: {
            likes: {
              userId: userLike,
            },
          },
        };
    const postUpdate = await Post.findOneAndUpdate({ _id: postId }, update);
    // console.log(postUpdate);
    if (postUpdate) {
      return res.status(200).json({ code: 0, message: 'react post successfully' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports.addComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    // const post = await Post.findOne({ _id: postId });
    const update = {
      $push: {
        comments: {
          userId: req.body.userId,
          content: req.body.content,
        },
      },
    };
    const postUpdate = await Post.findOneAndUpdate({ _id: postId }, update);
    if (postUpdate) {
      return res.status(200).json({ code: 0, message: 'add comment successfully' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports.removeComment = async (req, res) => {
  try {
    const update = {
      $pull: {
        comments: {
          _id: req.body.commentId
        },
      },
    };
    const postUpdate = await Post.findByIdAndUpdate({ _id: req.body.postId }, update);
    if (postUpdate) {
      return res.status(200).json({ code: 0, message: 'remove comment successfully' });
    }
    return res.status(400).json({ code: 1, message: 'post not found' });
  } catch (err) {
    console.log(err);
  }
};
module.exports.getPostForMe = async (req, res) => {
  try {
    const currentId = req.user._id;
    const user = await User.findOne({ _id: currentId });
    if (!user) {
      return res.status(404).json({ message: 'User not find' });
    }
    const posts = await Post.find({ postBy: currentId, status: 0 });
    if (!posts) {
      return res.status(404).json({ message: 'Not find post ' });
    }
    return res.status(200).json({ code: 0, data: posts });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports.getPostForFriend = async (req, res) => {
  try {
    const idFriend = req.params.id;
    const user = await User.findOne({ _id: idFriend });
    if (!user) {
      return res.status(404).json({ message: 'User not find' });
    }
    const posts = await Post.find({ postBy: idFriend });
    if (!posts) {
      return res.status(404).json({ message: 'Not find post ' });
    }
    return res.status(200).json({ code: 0, data: posts });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
