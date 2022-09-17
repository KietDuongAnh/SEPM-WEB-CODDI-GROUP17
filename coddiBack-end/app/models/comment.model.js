const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema(
    {
      text: String,
      question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  )
);
module.exports = Comment;
