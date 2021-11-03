const User = require('../models/user.js');

module.exports.follow = async (req, res) => {
  try {
    const idFriend = req.params.id;
    const condition1 = { _id: req.user._id };
    const update1 = {
      $push: {
        following: {
          userId: idFriend,
        },
      },
    };
    const condition2 = { _id: idFriend };
    const update2 = {
      $push: {
        followers: {
          userId: req.user._id,
        },
      },
    };
    const res1 = await User.findOneAndUpdate(condition1, update1);
    const res2 = await User.findOneAndUpdate(condition2, update2);

    if (res1 && res2) {
      return res.status(200).json({ code: 0, message: 'follow success' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports.getListUserSuggestion = async (req, res) => {
  try {
    const currentId = req.user._id;
    let listFollowing = [];
    let result = [];
    const currentUser = await User.findOne({ _id: currentId });
    if (currentUser) {
      listFollowing = currentUser.following;
    }
    if (listFollowing.length > 0) {
      const list = listFollowing.map((item) => {
        return item.userId;
      });
      list.push(req.user._id);

      result = await User.find({ _id: { $nin: list } });
    } else {
      result = await User.find({ _id: { $ne: currentId } });
    }
    return res.status(200).json({
      code: 0,
      data: result,
    });
  } catch (err) {
    return res.status(500).json({ code: 1, error: 'Server error' });
  }
};
