const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    likedBy: {
      type: Array,
      default: [],
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
  },
  { timestamps: true }
);

const content = mongoose.model("content", schema);

module.exports = content;
