const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profileUrl: {
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
  image: {
    type: String,
  },
});

const user = mongoose.model("User", schema);

module.exports = user;
