const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
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
    token: {
      type: String,
    },
  },
  { timestamps: true }
);

const user = mongoose.model("User", schema);

module.exports = user;
