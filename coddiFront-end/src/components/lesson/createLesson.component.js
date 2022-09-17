import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LessonService from "../../services/lesson.service";

export default function CreateLesson() {
  const { id } = useParams();
  const [titleLesson, setTitleLesson] = useState("");
  const [descriptionLesson, setDescriptionLesson] = useState("");
  const [course, setCourse] = useState(id);
  const [success, setSuccess] = useState(false);

  function saveLesson() {
    var data = {
      titleLesson,
      descriptionLesson,
      course,
    };
    LessonService.createLesson(data, id)
      .then((response) => {
        
        setSuccess(true);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onChangeTitle(e) {
    setTitleLesson(e.target.value);
  }
  function onChangeDescription(e) {
    setDescriptionLesson(e.target.value);
  }
  return (
    <div>
      <h4>Create Lesson</h4>
      <p>Writing a title for lesson</p>
      <input
        className="form-control"
        onChange={onChangeTitle}
        value={titleLesson}
      />
      <p>Writing a description of lesson</p>
      <textarea
        className="form-control"
        rows="6"
        style={{resize: "none"}}
        onChange={onChangeDescription}
        value={descriptionLesson}
      />
      <button className="btn btn-success mt-4" onClick={saveLesson}>
        Submit
      </button>
    </div>
  );
}
