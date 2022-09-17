import React, { Component } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import CourseService from "../services/course.service";
import { Link } from "react-router-dom";
import NavAdmin from "./nav/navAdmin";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveCourse = this.saveTutorial.bind(this);
    this.newCourse = this.newCourse.bind(this);

    this.state = {
      // content: "",
      id: null,
      title: "",
      description: "",

      submitted: false,
    };
  }
  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  saveTutorial() {
    var data = {
      title: this.state.title,
      description: this.state.description,
    };
    CourseService.createCourse(data)
      .then((response) => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          submitted: true,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  newCourse() {
    this.setState({
      id: null,
      title: "",
      description: "",
      submitted: false,
    });
  }

  componentDidMount() {
    UserService.getAdminBoard().then(
      (response) => {
        this.setState({
          content: response.data,
        });
      },
      (error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }

  render() {
    return (
      <div>
        <NavAdmin />
        <div className="container pt-4 w-50">
          <div className="container">
            {this.state.submitted ? (
              <div className="card p-4">
                <h4 className="card-title text-center">You submitted successfully!</h4>
                <button className="btn btn-success" onClick={this.newCourse}>
                  Go back
                </button>
              </div>
            ) : (
              <div className="container pb-4 pt-4 d-flex justify-content-center">
                <div className="card p-4" style={{width: "500px"}}>
                  <h4 className="card-title">Create a course</h4>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="title">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={this.state.title}
                        onChange={this.onChangeTitle}
                        name="title"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="description"
                        required
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        name="description"
                        rows="5"
                        style={{resize: "none"}}
                      />
                    </div>
                    <button
                      onClick={this.saveCourse}
                      className="btn btn-success mt-4"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      // </div>
      // <div className="container">
      //   <header className="jumbotron">
      //     <h3>{this.state.content}</h3>
      //   </header>
      // </div>
      // <div className="container-fluid">
      //   <div className="row wrapper min-vh-100 flex-column flex-sm-row">
      //     <aside className="col-12 col-sm-3 p-0 bg-primary flex-shrink-1">
      //       <nav className="navbar navbar-expand-sm navbar-dark bg-primary align-items-start flex-sm-column flex-row">
      //         <a className="navbar-brand" href="#">
      //           <i className="fa fa-bullseye fa-fw" /> DASHBOARD ADMIN
      //         </a>
      //         <a
      //           href
      //           className="navbar-toggler"
      //           data-toggle="collapse"
      //           data-target=".sidebar"
      //         >
      //           <span className="navbar-toggler-icon" />
      //         </a>
      //         <div className="collapse navbar-collapse sidebar">
      //           <ul className="flex-column navbar-nav w-100 justify-content-between">
      //             <li className="nav-item">
      //               <a className="nav-link pl-0" href="#">
      //                 <span className>Course</span>
      //               </a>
      //             </li>
      //             <li className="nav-item">
      //               <a className="nav-link pl-0" href="#">
      //                 <span className>Question</span>
      //               </a>
      //             </li>
      //           </ul>
      //         </div>
      //       </nav>
      //     </aside>
      //   </div>
      // </div>
    );
  }
}
