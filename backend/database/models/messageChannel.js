const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  channelId: {
    type: String,
    required: true,
  },
  channelName: {
    type: String,
    required: true,
  },
  channelImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const messageChannel = mongoose.model("messageChannel", schema);

module.exports = messageChannel;
