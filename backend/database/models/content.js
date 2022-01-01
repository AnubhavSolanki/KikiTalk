const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    format: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

const content = mongoose.model("content", schema);

module.exports = content;