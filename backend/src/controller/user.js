const User = require('../models/user.js');

module.exports.follow = (req, res) => {
  try {
    const idFriend = req.params.id;
    const condition = { _id: req.user._id };
    const update = {
      $push: {
        following: {
          userId: idFriend,
        },
      },
    };
    User.findOneAndUpdate(condition, update, { new: true }, function (err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        return res.status(200).json({ code: 0, data: result });
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error' });
  }
};
