import axios from "axios";
const API_URL = "http://localhost:8080/api/";
class LessonService {
  getAllLesson() {
    return axios.get(API_URL + "lesson");
  }
  getAllLessonCourse(courseId) {
    return axios.get(API_URL + `course/${courseId}/lesson`);
  }
  getALesson(lessonId) {
    return axios.get(API_URL + `lesson/${lessonId}`);
  }
  createLesson(data, courseId) {
    return axios.post(API_URL + `lesson?courseId=${courseId}`, data);
  }
  updateLesson(lessonId, data) {
    return axios.put(API_URL + `lesson/${lessonId}`, data);
  }
  deleteLesson(lessonId) {
    return axios.delete(API_URL + `lesson/${lessonId}`);
  }
}
export default new LessonService();
