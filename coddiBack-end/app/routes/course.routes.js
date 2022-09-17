const controller = require("../controllers/course.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/course", controller.createCourse);
  app.get("/api/course", controller.getCourses);
  app.delete("/api/course/:courseId", controller.deleteCourse);
  // app.get("api/course?title=[keyword]", controller.getATitile);
  app.get("/api/course/:courseId", controller.getACourse);
  app.put("/api/course/:courseId", controller.updateCourse);
};
