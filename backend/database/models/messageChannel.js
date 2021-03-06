const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    friendId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const messageChannel = mongoose.model("messageChannel", schema);

module.exports = messageChannel;
