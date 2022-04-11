const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: {
    type: String,
  },
});

const user = mongoose.model("User", schema);

module.exports = user;
