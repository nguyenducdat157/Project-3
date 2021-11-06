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

module.exports.unFollow = async (req, res) => {
  try {
    const idFriend = req.params.id;
    const currentId = req.user._id;
    const condition1 = {
      _id: currentId,
    };
    const update1 = {
      $pull: {
        following: {
          userId: idFriend,
        },
      },
    };
    const condition2 = {
      _id: idFriend,
    };
    const update2 = {
      $pull: {
        followers: {
          userId: currentId,
        },
      },
    };
    const res1 = await User.findOneAndUpdate(condition1, update1);
    const res2 = await User.findOneAndUpdate(condition2, update2);

    if (res1 && res2) {
      return res.status(200).json({
        code: 0,
        message: 'unfollow success',
      });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports.getListUserSuggestion = async (req, res) => {
  try {
    // const currentId = req.user._id;
    // let listFollowing = [];
    // let result = [];
    // const currentUser = await User.findOne({ _id: currentId });
    // if (currentUser) {
    //   listFollowing = currentUser.following;
    // }
    // if (listFollowing.length > 0) {
    //   const list = listFollowing.map((item) => {
    //     return item.userId;
    //   });
    //   list.push(req.user._id);

    //   result = await User.find({ _id: { $nin: list } });
    // } else {
    //   result = await User.find({ _id: { $ne: currentId } });
    // }
    // return res.status(200).json({
    //   code: 0,
    //   data: result,
    // });
    const currentId = req.user._id;
    let listFollowing = [];
    let list = [];
    let result = [];
    const mySet = new Set();
    const currentUser = await User.findOne({ _id: currentId });
    if (currentUser) {
      listFollowing = currentUser.following;
    }
    if (listFollowing.length > 0) {
      list = listFollowing.map((item) => item.userId.toString());
      for (let i = 0; i < listFollowing.length; i++) {
        const user = await User.findOne({ _id: listFollowing[i].userId });
        if (user) {
          user.following.forEach((item) => {
            if (item.userId.toString() !== currentId && list.includes(item.userId.toString()) === false)
              mySet.add(item.userId._id.toString());
          });
        }
      }
      result = await User.find({ _id: { $in: Array.from(mySet) } });
    } else {
      result = await User.find({ _id: { $ne: currentId } });
    }
    return res.status(200).json({ code: 0, data: result.sort(() => Math.random() - Math.random()).slice(0, 5) });
  } catch (err) {
    return res.status(500).json({ code: 1, error: 'Server error' });
  }
};

module.exports.allUserSuggest = async (req, res) => {
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
    return res.status(500).json({ code: 1, message: 'Server error' });
  }
};

module.exports.searchUser = async (req, res) => {
  try {
    const name = req.params.name;
    const users = await User.find({
      $or: [
        {
          fullName: {
            $regex: name,
            $options: 'i',
          },
        },
        {
          userName: {
            $regex: name,
            $options: 'i',
          },
        },
      ],
    });
    if (!users) {
      return res.status(404).json({
        code: 0,
        message: 'user not found',
      });
    }
    if (users) {
      return res.status(200).json({
        code: 0,
        data: users,
      });
    }
  } catch (err) {
    return res.status(500).json({ code: 1, error: 'Server error' });
  }
};
