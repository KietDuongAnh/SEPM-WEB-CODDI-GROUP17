const Course = require("../models/course.model");
const Lesson = require("../models/lesson.model");

exports.createLesson = (req, res) => {
  const lesson = new Lesson({
    titleLesson: req.body.titleLesson,
    descriptionLesson: req.body.descriptionLesson,
    course: req.body.course,
  });
  // /courses/:id/questions
  lesson
    .save()
    .then((newLesson) => {
      return res.status(201).json({
        success: true,
        message: "New lesson created successfully",
        Lesson: newLesson,
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

exports.getLessons = (req, res) => {
  Lesson.find()
    .select("titleLesson descriptionLesson course")
    .then((allLessons) => {
      return res.status(200).json({
        success: true,
        message: "List all lessons",
        Lesson: allLessons,
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
exports.getLessonsCourse = (req, res) => {
  Lesson.find({ course: req.params.courseId })
    .then((allLessonsCourse) => {
      return res.status(200).json({
        success: true,
        message: "List all lessons",
        Lesson: allLessonsCourse,
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

// exports.getLessonCourseFor = (req, res) => {
//   const id = req.params.courseId;
//   Lesson.aggregate([
//     {
//       from: "courses",
//       localField: "course",
//       foreignField: "_id",
//       as: "courseObject",
//     },
//     {
//       path: "$courseObject",
//     },
//   ])
//     .then((aLesson) => {
//       res.status(200).json({
//         success: true,
//         message: `More on ${aLesson.title}`,
//         Lesson: aLesson,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         success: false,
//         message: "This lesson does not exist",
//         error: err.message,
//       });
//     });
// };

exports.getALesson = (req, res) => {
  const id = req.params.lessonId;
  Lesson.findById(id)
    .then((aLesson) => {
      res.status(200).json({
        success: true,
        message: `More on ${aLesson.title}`,
        Lesson: aLesson,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This lesson does not exist",
        error: err.message,
      });
    });
};

exports.updateLesson = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.lessonId;
  const updateObject = req.body;
  Lesson.findByIdAndUpdate(id, updateObject, { useFindAndModify: false })
    .then((newLesson) => {
      res.status(200).json({
        success: true,
        message: "This lesson was updated successfully",
        updateLesson: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This lesson does not exist",
        error: err.message,
      });
    });
};

exports.deleteLesson = (req, res) => {
  const id = req.params.lessonId;
  Lesson.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
        message: "This lesson was deleted successfully",
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};
