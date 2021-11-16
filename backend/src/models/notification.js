const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    post: {
      type: ObjectId,
      ref: 'Post',
    },
    otherUser: {
      type: ObjectId,
      ref: 'User',
    },
    status: {
      type: Number,
      required: true,
      // 0: not see
      // 1: seen
    },
  },
  { timestamps: true },
);

var Notification = mongoose.model('Notification', notificationSchema, 'Notification');
module.exports = Notification;
