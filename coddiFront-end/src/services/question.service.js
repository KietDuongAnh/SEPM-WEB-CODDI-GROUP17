import axios from "axios";
const API_URL = "http://localhost:8080/api/";
class Question {
  createQuestion(data, lessonId) {
    return axios.post(API_URL + `question?lessonId=${lessonId}`, data);
  }
  getAllQuestion() {
    return axios.get(API_URL + "question");
  }
  getAllQuestionLesson(lessonId) {
    return axios.get(API_URL + `lesson/${lessonId}/question`);
  }
  getAllQuestionCourse(courseId) {
    return axios.get(API_URL + `course/${courseId}/question`);
  }
}
export default new Question();
