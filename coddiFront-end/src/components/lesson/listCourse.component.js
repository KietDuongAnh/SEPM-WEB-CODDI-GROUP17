import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CourseService from "../../services/course.service";
import NavAdmin from "../nav/navAdmin";
import CreateLesson from "./createLesson.component";
import LessonService from "../../services/lesson.service";
export default function ListLesson({ id }) {
  const [lessons, setLesson] = useState([]);
  // const { id } = useParams();
  useEffect(() => {
    getLessons();
  }, []);

  function getLessons() {
    LessonService.getAllLessonCourse(id)
      .then((response) => {
        setLesson(response.data.Lesson);
        console.log(response.data.Lesson);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <div className="container pt-4 pb-4">
        <div className="accordion">
          <ol className="list-group list-group-numbered">
            {lessons.map((lesson, index) => (
              <li className="list-group-item" key={index}>
                <Link to={"/admin/lesson/" + lesson._id}>
                  {lesson.titleLesson}
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
