const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    recieverId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const message = mongoose.model("message", schema);

module.exports = message;
