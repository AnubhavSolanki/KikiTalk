const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const forgotPassword = mongoose.model("ForgotPassword", schema);

module.exports = forgotPassword;
