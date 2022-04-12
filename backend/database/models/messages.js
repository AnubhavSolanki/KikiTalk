const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  channelId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const message = mongoose.model("message", schema);

module.exports = message;
