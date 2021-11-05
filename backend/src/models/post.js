const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const userSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    likes: [
      {
        userId: { type: ObjectId, ref: 'User' },
      },
    ],
    comments: [
      {
        userId: { type: ObjectId, ref: 'User' },
        content: { type: String },
      },
    ],
    postBy: { type: ObjectId, ref: 'User' },
    userName: { type: String },
    status: {
      type: Number,
      default: 0,
      // 0: public
      // 1: private
    },
    pictures: [
      {
        img: {
          type: String,
          required: true,
        },
      },
    ],
    createAt: Date,
    updateAt: Date,
  },
  { timestamps: true },
);

var Post = mongoose.model('Post', userSchema, 'Post');
module.exports = Post;
