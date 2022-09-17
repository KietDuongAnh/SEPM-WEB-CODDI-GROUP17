import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import CourseService from "../services/course.service";
import ListQuestion from "./questions/listQuestion.component";
function LessonsCourse() {
  const { id } = useParams();
  return (
    <div className="container pt-4">
      <div className="row row-cols-1 row-cols-md-2 g-4">
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">LESSON</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
                <Link className="btn btn-primary" to={`/home/${id}/lesson`}>Select</Link>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">TEST</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
                <Link className="btn btn-primary" to={`/home/${id}/test`}>Select</Link>
              {/* <ListQuestion id={id} /> */}
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">RANKING</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
              <Link className="btn btn-primary">Select</Link>

            </div>
          </div>
        </div>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">LECTURERS PROFILE</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <Link className="btn btn-primary">Select</Link>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonsCourse;
