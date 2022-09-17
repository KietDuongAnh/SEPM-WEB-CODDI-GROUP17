const mongoose = require("mongoose");
const Lesson = mongoose.model(
  "Lesson",
  new mongoose.Schema({
    titleLesson: String,
    descriptionLesson: String,

    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  })
);

module.exports = Lesson;
