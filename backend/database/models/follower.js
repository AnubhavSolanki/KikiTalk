const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  followerId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const follower = mongoose.model("Follower", schema);

module.exports = follower;
