const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const socket = mongoose.model("socket", schema);

module.exports = socket;
