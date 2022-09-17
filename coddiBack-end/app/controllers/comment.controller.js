const mongoose = require("mongoose");
const Comment = require("../models/comment.model");
exports.createComment = async (req, res) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      question: req.query.questionId,
      author: req.body.author,
    });
    const com = await comment.save();
    res.status(201).json({
      success: true,
      message: "New Comment created successfully",
      Comment: com,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: err.message,
    });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unwind: {
          path: "$author",
        },
      },{

        $match: {

          question: mongoose.Types.ObjectId(req.query.questionId),

        },

      },

      {

        $sort: {

          createdAt: -1,

        },

      },
    ]);

    res.status(200).json({
      success: true,
      message: "List all lessons",
      Comment: comments,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error. Please try again.",
      error: err.message,
    });
  }
};
