const mongoose = require("mongoose");
const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    aQuestion: String,
    description: String,
    answers: [],
    correct: String,

    lesson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  })
);

module.exports = Question;
