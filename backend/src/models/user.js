const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: 'https://cdn0.iconfinder.com/data/icons/instagram-ui-1/24/Instagram-UI_account-512.png',
    },
    followers: [{ userId: { type: ObjectId, ref: 'User' } }],
    following: [{ userId: { type: ObjectId, ref: 'User' } }],
    notifications: [{ type: ObjectId, ref: 'Notification' }],
    role: {
      type: Number,
      default: 0,
      required: true,
      // 0: user, 1: admin,
    },
    status: {
      type: Number,
      default: 0,
      enum: [
        0, // public
        1, //private
        2, //blocked
      ],
    },
    createAt: Date,
  },
  { timestamps: true },
);

var User = mongoose.model('User', userSchema, 'User');
module.exports = User;
