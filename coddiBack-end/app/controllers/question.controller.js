const { query } = require("express");
const Course = require("../models/course.model");
const Question = require("../models/question.model");
const mongoose = require("mongoose");
exports.createQuestion = (req, res) => {
  const question = new Question({
    aQuestion: req.body.aQuestion,
    description: req.body.description,
    answers: req.body.answers,
    correct: req.body.correct,
    lesson: req.query.lessonId,
  });

  // /courses/:id/questions
  question
    .save()
    .then((newQuestion) => {
      return res.status(201).json({
        success: true,
        message: "New question created successfully",
        Question: newQuestion,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

exports.getQuestions = (req, res) => {
  Question.find()
    .select("aQuestion description answers correct lesson")
    .then((allQuestions) => {
      return res.status(200).json({
        success: true,
        message: "List all questions",
        Question: allQuestions,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};

exports.getAllQuestionsLesson = (req, res) => {
  Question.find({ lesson: req.params.lessonId })
    .then((questionLesson) => {
      return res.status(200).json({
        success: true,
        message: "list all questions of a lesson",
        Question: questionLesson,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};

exports.getAllQuestionCourse = (req, res) => {
  const id = req.params.courseId;
  Question.aggregate([
    {
      $lookup: {
        from: "lessons",
        localField: "lesson",
        foreignField: "_id",
        as: "lessonObject",
      },
    },
    {
      $unwind: {
        path: "$lessonObject",
      },
    },
    {
      $match: {
        "lessonObject.course": mongoose.Types.ObjectId(id),
      },
    },
  ])
    .then((aQuestion) => {
      aQuestion.sort(() => Math.random() - 0.5);
      res.status(200).json({
        success: true,
        message: `More on ${aQuestion.title}`,
        Question: aQuestion.slice(0, 15),
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This question does not exist",
        error: err.message,
      });
    });
};
exports.getAQuestion = (req, res) => {
  const id = req.params.questionId;
  Question.findById(id)
    .then((aQuestion) => {
      res.status(200).json({
        success: true,
        message: `More on ${aQuestion.title}`,
        Question: aQuestion,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This question does not exist",
        error: err.message,
      });
    });
};

exports.updateQuestion = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.questionId;
  const updateObject = req.body;
  Question.findByIdAndUpdate(id, updateObject, { useFindAndModify: false })
    .then((newQuestion) => {
      res.status(200).json({
        success: true,
        message: "This question was updated successfully",
        updateQuestion: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This question does not exist",
        error: err.message,
      });
    });
};

exports.deleteQuestion = (req, res) => {
  const id = req.params.questionId;
  Question.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
        message: "This question was deleted successfully",
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};
