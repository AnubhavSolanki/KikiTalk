const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  notificationText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const notification = mongoose.model("notification", schema);

module.exports = notification;
