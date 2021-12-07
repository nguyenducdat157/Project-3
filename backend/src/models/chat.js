const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    createAt: Date,
  },
  { timestamps: true },
);

var Chat = mongoose.model('Chat', chatSchema, 'Chat');
module.exports = Chat;
