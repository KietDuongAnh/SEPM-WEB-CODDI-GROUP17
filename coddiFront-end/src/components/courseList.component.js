import React, { Component, useState } from "react";
import CourseService from "../services/course.service";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import NavAdmin from "./nav/navAdmin";

export default class CourseList extends Component {
  constructor(props) {
    super(props);
    this.getCourse = this.getCourse.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCourse = this.setActiveCourse.bind(this);
    this.state = {
      courses: [],
      currentCourse: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.getCourse();
  }
  getCourse() {
    CourseService.getAllCourse()
      .then((response) => {
        this.setState({
          courses: response.data.Course,
        });
        console.log(response.data.Course);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  refreshList() {
    this.getCourse();
    this.setState({
      currentCourse: null,
      currentIndex: -1,
    });
  }

  setActiveCourse(course, index) {
    this.setState({
      currentCourse: course,
      currentIndex: index,
    });
  }

  render() {
    const { courses, currentCourse, currentIndex } = this.state;
    return (
      <div>
        <NavAdmin />
        <div className="container p-4 d-flex flex-row align-items-start">
          <div id="course_list" className="me-4" style={{ flex: "1" }}>
            <h4 className="pt-2">Courses</h4>
            <ol className="list-group list-group-numbered">
              {courses &&
                courses.map((course, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveCourse(course, index)}
                    key={index}
                  >
                    {course.title}
                  </li>
                ))}
            </ol>
          </div>
          <div
            id="course_infor"
            className="card p-4"
            style={{ flex: "3", height: "300px" }}
          >
            {currentCourse ? (
              <div className="container">
                <h4 className="form-title pb-2">Course information</h4>
                <div className="form-body">
                  <div className="form-group">
                    <h5>Title:</h5>
                    <p>{currentCourse.title}</p>
                  </div>
                  <div className="form-group">
                    <h5>Description:</h5>
                    <p>{currentCourse.description}</p>
                  </div>
                </div>
                <div className="form-footer">
                  <Link
                    to={"/admin/course/" + currentCourse._id}
                    className="btn btn-warning"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <p>Please click on a Tutorial...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
