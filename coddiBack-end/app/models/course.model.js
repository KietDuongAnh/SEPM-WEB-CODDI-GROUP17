const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    title: String,
    description: String,
  })
);
module.exports = Course;
