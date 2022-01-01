const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    message : {
        type : String,
        required : true
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
});

const comment = mongoose.model("comment", schema);

module.exports = comment;