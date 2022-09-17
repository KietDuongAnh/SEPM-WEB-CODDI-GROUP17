import React, { Component } from "react";
import { connect } from "react-redux";
import { Router, Switch, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./App.css";
import NavHeader from "./components/nav/navHeader";
import Register from "./components/register.component";
import Login from "./components/login.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardAdmin from "./components/board-admin.component";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import NavAdmin from "./components/nav/navAdmin";
import Course from "./components/course.component";
import CourseList from "./components/courseList.component";
import LessonsCourse from "./components/lessonsCourse.component";
import CreateQuestion from "./components/questions/createQuestion.component";
import ListQuestion from "./components/questions/listQuestion.component";
import TestCourse from "./components/testCourse.component";
import ShowLesson from "./components/lesson/showLesson.component";
import CreateLesson from "./components/lesson/createLesson.component";
import ListCourse from "./components/lesson/listCourse.component";
import Footer from "./components/nav/Footer";
import UpdateAndDelete from "./components/lesson/updateAndDelete.component";
import CommentList from "./components/comment/commentList.component";
import homepage from "./components/homepage";

function App() {
  return (
    <Router history={history}>
      <NavHeader />
      <div className="mainContent">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path={["/homepage"]} component={homepage} />

          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route exact path="/home/:id" component={LessonsCourse} />
          <Route exact path="/home/:id/test" component={TestCourse} />
          <Route exact path="/home/:id/lesson" component={ShowLesson} />
          {/* <Route path="/admin" component={BoardAdmin} /> */}
          <Route path="/admin/dashBoard" component={BoardAdmin} />
          <Route path="/admin/createCourse" component={BoardAdmin} />
          <Route path="/admin/course/:id" component={Course} />
          <Route path="/admin/course" component={CourseList} />
          {/* <Route path="/admin/question" component={CreateQuestion} /> */}
          {/* <Route path="/admin/question" component={ListQuestion} /> */}
          <Route path="/admin/addQuestion" component={CreateQuestion} />
          <Route path={"/admin/lesson/:id"} component={UpdateAndDelete} />
          <Route
            path={"/question/:questionId/comment"}
            component={CommentList}
          />
        </Switch>
      </div>
      <Footer />

      {/* <AuthVerify logOut={this.logOut}/> */}
    </Router>
  );
}
// function mapStateToProps(state) {
//   const { user } = state.auth;
//   return {
//     user,
//   };
// }

export default App;
