import React, { useState, useEffect } from "react";
import CourseService from "../../services/course.service";
import LessonService from "../../services/lesson.service";
import { useParams } from "react-router-dom";
import GetQuestion from "./getQuestionLesson.component";
import { Link } from "react-router-dom";
export default function ShowLesson() {
  const [lesson, setLesson] = useState([]);
  const { id } = useParams();
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
  function TextTransform(props) {
    const text = props.stringText;
    const newText = text.split('\\n').map(
      (str) => <p key={str.toString()}>
        {str.split('\\t').map(
          subStr => <span key={subStr.toString()}>&emsp;{subStr}</span>
        )}
        </p>
      );
    return <div>{newText}</div>;
  }

  return (
    <div className="container pt-4 pb-4">
      
      <h3>Lessons</h3>
      <div className="accordion">
        {lesson.map((text, index) => (
          <div key={index} className="accordion-item" id="accordionExample">
            <h2 className="accordion-header" id="heading">
              <button
                className="accordion-button collapsed"
                style={{ backgroundColor: "#4DD4AC" }}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + index}
                aria-expanded="false"
                aria-controls={"collapse" + index}
              >
                {index + 1 + ". " + text.titleLesson}
              </button>
            </h2>
            <div
              id={"collapse" + index}
              className="accordion-collapse collapse"
              aria-labelledby="heading"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <TextTransform stringText={text.descriptionLesson}></TextTransform>
                <span>
                  <GetQuestion id={text._id} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
