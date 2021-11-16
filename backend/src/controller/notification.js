const Post = require('../models/post.js');
const User = require('../models/user.js');
const Notification = require('../models/notification.js');

module.exports.likeNotification = async (req, res) => {
  try {
    const idPost = req.params.idPost;
    const userLiked = await User.findOne({ _id: req.user._id });
    if (!userLiked) {
      return res.status(404).json({ status: 'User Not Found' });
    }
    const nameUserLiked = userLiked.userName;
    const post = await Post.findOne({ _id: idPost });
    if (!post) {
      return res.status(404).json({ status: 'Post Not Found' });
    }
    const owner = post.postBy;

    const notification = new Notification({
      otherUser: req.user._id,
      userId: owner,
      content: `đã thích bài viết của bạn`,
      post: post._id,
      status: 0,
    });
    const createNotification = await notification.save();
    if (createNotification) {
      await User.findOneAndUpdate(
        { _id: owner },
        { $push: { notifications: { notificationId: createNotification._id } } },
      );
      return res.status(200).json({
        code: 0,
        data: notification,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: 'Server error',
    });
  }
};

module.exports.commentNotification = async (req, res) => {
  try {
    const idPost = req.params.idPost;
    const userCommented = await User.findOne({ _id: req.user._id });
    if (!userCommented) {
      return res.status(404).json({ status: 'User Not Found' });
    }
    const nameUserCommented = userCommented.userName;
    const post = await Post.findOne({ _id: idPost });
    if (!post) {
      return res.status(404).json({ status: 'Post Not Found' });
    }
    const owner = post.postBy;

    const notification = new Notification({
      otherUser: req.user._id,
      userId: owner,
      content: `đã bình luận bài viết của bạn`,
      post: post._id,
      status: 0,
    });
    const createNotification = await notification.save();
    if (createNotification) {
      await User.findOneAndUpdate(
        { _id: owner },
        { $push: { notifications: { notificationId: createNotification._id } } },
      );
      return res.status(200).json({
        code: 0,
        data: notification,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.followNotification = async (req, res) => {
  try {
    const idUserFollowed = req.params.idUser;
    const currentUser = await User.findOne({ _id: req.user._id });
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    const notification = new Notification({
      otherUser: req.user._id,
      userId: idUserFollowed,
      content: `đã theo dõi bạn`,
      status: 0,
    });
    const createNotification = await notification.save();
    if (createNotification) {
      await User.findOneAndUpdate(
        { _id: idUserFollowed },
        { $push: { notifications: { notificationId: createNotification._id } } },
      );
      return res.status(200).json({ code: 0, data: notification });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports.getNotifications = async (req, res) => {
  try {
    const currentId = req.user._id;
    const listNotification = await Notification.find({ userId: currentId })
      .populate({
        path: 'post',
        select: ['pictures'],
      })
      .populate({ path: 'otherUser', select: ['userName', 'avatar'] });

    if (listNotification) {
      return res.status(200).json({ code: 0, data: listNotification });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
