import React, { Component } from "react";
import CourseService from "../services/course.service";
import CreateQuestion from "./questions/createQuestion.component";
import CreateLesson from "./lesson/createLesson.component";
import NavAdmin from "./nav/navAdmin";
import ListLesson from "./lesson/listCourse.component";
import { useState } from "react";
import courseService from "../services/course.service";
export default class Course extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getACourse = this.getACourse.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.state = {
      currentCourse: {
        id: null,
        title: "",
        description: "",
      },
      message: "",
    };
  }
  componentDidMount() {
    this.getACourse(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;
    this.setState(function (prevState) {
      return {
        currentCourse: {
          ...prevState.currentCourse,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentCourse: {
        ...prevState.currentCourse,
        description: description,
      },
    }));
  }

  getACourse(id) {
    CourseService.getACourse(id)
      .then((response) => {
        this.setState({
          currentCourse: response.data.Course,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateCourse() {
    CourseService.updateCourse(
      this.state.currentCourse._id,
      this.state.currentCourse
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!",
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  //   this.state.currentCourse.id
  deleteCourse() {
    CourseService.deleteCourse(this.state.currentCourse._id)
      .then((response) => {
        console.log(response.data.Course);
        this.props.history.push("/admin/question");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentCourse } = this.state;

    return (
      <div>
        <NavAdmin />
        <div className="container pt-4 pb-4">
          {currentCourse ? (
            <div className="container d-flex flex-column justify-content-center align-items-center">
              {/* Modal */}
              <div
                className="modal fade"
                id="create_lesson"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="card p-4">
                      <CreateLesson id={this.props.match.params.id} />
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
                id="edit_course"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="card p-4 ">
                      <h4 className="form-title">Edit course</h4>
                      <form>
                        <div className="form-group">
                          <label htmlFor="title" className="form-label">
                            Title
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={currentCourse.title}
                            onChange={this.onChangeTitle}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="description" className="form-label">
                            Description
                          </label>
                          <textarea
                            type="text"
                            className="form-control"
                            rows="5"
                            style={{ resize: "none" }}
                            id="description"
                            value={currentCourse.description}
                            onChange={this.onChangeDescription}
                          />
                        </div>
                      </form>

                      <div className="form-group d-flex justify-content-start">
                        <button
                          className="btn btn-outline-danger mt-4 w-25 me-4"
                          onClick={this.deleteCourse}
                        >
                          Delete
                        </button>
                        <button
                          type="submit"
                          className="btn btn-outline-primary mt-4 w-25 me-4"
                          onClick={this.updateCourse}
                        >
                          Update
                        </button>
                      </div>
                      <p className="form-text text-success mt-4">
                        {this.state.message}
                      </p>
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

              {/* <div className="container bg-danger"> */}
              <div id="course_menu" className="card" style={{width: "400px"}}>
                <div className="card-title d-flex justify-content-center pt-4">
                  <h2>{currentCourse.title} course</h2>
                </div>
                <div className="card-body">
                  <div className="container d-flex flex-column align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary w-50"
                      data-bs-toggle="modal"
                      data-bs-target="#create_lesson"
                    >
                      Create a lesson
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mt-4 w-50"
                      data-bs-toggle="modal"
                      data-bs-target="#edit_course"
                    >
                      Update course
                    </button>
                  </div>
                </div>
              </div>
              {/* </div> */}

              <div id="view_lesson" className="card p-4 mt-4" style={{width: "400px"}} >
                <h4>{currentCourse.title} lessons</h4>
                <ListLesson id={this.props.match.params.id} />
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
