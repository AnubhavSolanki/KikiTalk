const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  contentType: {
    type: String,
    required: true,
  },
  data: {
    type: JSON,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const content = mongoose.model("content", schema);

module.exports = content;
