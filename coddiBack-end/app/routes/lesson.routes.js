const controller = require("../controllers/lesson.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/lesson", controller.createLesson);
  app.get("/api/lesson", controller.getLessons);

  app.get("/api/course/:courseId/lesson", controller.getLessonsCourse);

  // app.get("/api/courses/:courseId/lesson", controller.getLessonCourseFor);

  app.get("/api/lesson/:lessonId", controller.getALesson);
  app.put("/api/lesson/:lessonId", controller.updateLesson);
  app.delete("/api/lesson/:lessonId", controller.deleteLesson);
};
