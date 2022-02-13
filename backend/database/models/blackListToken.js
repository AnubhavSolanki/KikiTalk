const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    index: { expires: "3h" },
    default: Date.now,
  },
});

const blackListToken = mongoose.model("blackListToken", schema);

module.exports = blackListToken;
