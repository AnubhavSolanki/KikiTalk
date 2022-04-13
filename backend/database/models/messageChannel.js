const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    channelId: {
      type: String,
    },
    channelName: {
      type: String,
      required: true,
    },
    channelImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const messageChannel = mongoose.model("messageChannel", schema);

module.exports = messageChannel;
