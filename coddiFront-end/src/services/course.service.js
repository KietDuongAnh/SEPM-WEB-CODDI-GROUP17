import axios from "axios";
const API_URL = "http://localhost:8080/api/";
class CourseService {
  createCourse(data) {
    return axios.post(API_URL + "course", data);
  }
  getAllCourse() {
    return axios.get(API_URL + "course");
  }
  getACourse(courseId) {
    return axios.get(API_URL + `course/${courseId}`);
  }
  deleteCourse(courseId) {
    return axios.delete(API_URL + `course/${courseId}`);
  }
  updateCourse(courseId, data) {
    return axios.put(API_URL + `course/${courseId}`, data);
  }
}

export default new CourseService();
