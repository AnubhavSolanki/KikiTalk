const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  user_DOB: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const user = mongoose.model("User", schema);

module.exports = user;