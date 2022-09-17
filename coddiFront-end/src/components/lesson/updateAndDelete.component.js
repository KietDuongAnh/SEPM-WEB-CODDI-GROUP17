import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonService from "../../services/lesson.service";
import NavAdmin from "../nav/navAdmin";
import CreateQuestion from "../questions/createQuestion.component";
export default function UpdateAndDelete() {
  const [title, setTitle] = useState("");
  const [description, setDecription] = useState("");
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    fetchLesson();
  }, []);
  function fetchLesson() {
    LessonService.getALesson(id).then((data) => {
      setTitle(data.data.Lesson.titleLesson);
      setDecription(data.data.Lesson.descriptionLesson);
      console.log(data);
    });
  }
  function updateLesson(e) {
    e.preventDefault();
    LessonService.updateLesson(id, {
      titleLesson: title,
      descriptionLesson: description,
    });
  }

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function onChangeDescription(e) {
    setDecription(e.target.value);
  }

  function deleteLesson(e) {
    LessonService.deleteLesson(id).then(() => {
      setSuccess(true);
    });
  }

  return (
    <div>
      <NavAdmin />
      <div className="container pb-4 pt-4">
        <div className="container d-flex justify-content-center">
          <div id="lesson_menu" className="card pt-4 pb-4" style={{width: "400px"}}>
            <div className="card-title d-flex justify-content-center">
              <h2>{title}</h2>
            </div>
            <div className="card-body">
              <div className="container d-flex flex-column align-items-center">
                <button
                  type="button"
                  className="btn btn-primary w-75"
                  data-bs-toggle="modal"
                  data-bs-target="#create_question"
                >
                  Create a question
                </button>
                <button
                  type="button"
                  className="btn btn-primary mt-4 w-75"
                  data-bs-toggle="modal"
                  data-bs-target="#update_lesson"
                >
                  Update lesson
                </button>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="create_question"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div>
                  <CreateQuestion id={id} />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="update_lesson"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="container">
                  <div className="card border-0 p-4">
                    <h2 className="card-title">Update lesson</h2>
                    <form className="card-body" onSubmit={updateLesson}>
                      <label htmlFor="lesson_title">Title</label>
                      <input
                        id="lesson_title"
                        className="form-control"
                        type="text"
                        onChange={onChangeTitle}
                        value={title}
                      />
                      <label htmlFor="lesson_description">Description</label>
                      <textarea
                        id="lesson_description"
                        className="form-control"
                        type="text"
                        rows="6"
                        style={{ resize: "none" }}
                        onChange={onChangeDescription}
                        value={description}
                      />
                      <button className="btn btn-outline-primary me-4 mt-4">
                        Update
                      </button>
                      {success ? "Successfully" : ""}
                      <button
                        className="btn btn-outline-danger mt-4"
                        type="button"
                        onClick={deleteLesson}
                      >
                        Delete
                      </button>
                      {success ? "Successfully" : ""}
                    </form>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
