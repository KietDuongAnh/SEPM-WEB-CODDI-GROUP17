import React, { Component } from "react";
import { useEffect } from "react";
import { useState } from "react";
import CourseService from "../../services/course.service";
import QuestionService from "../../services/question.service";
import NavAdmin from "../nav/navAdmin";
import Question from "./Question.component";

export default function ListQuestion({ id }) {
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [countAnswered, setCountAnswered] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isAnsweredAll, setIsAnsweredAll] = useState(false);
  useEffect(() => {
    getQuestion();
    // alert(JSON.stringify(questions));
  }, []);

  function getQuestion() {
    QuestionService.getAllQuestionCourse(id)
      .then((response) => {
        for (var i = 0; i < response.data.Question.length; i++) {
          shuffle(response.data.Question[i].answers);
        }
        setQuestions(randomQuestion(response.data.Question));
        // alert(JSON.stringify(response.data.Question[0].answers));
        console.log(response.data.Question);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(id);
  }
  function randomQuestion(questions) {
    return questions.sort(() => Math.random() - 0.5);
  }
  useEffect(() => {
    if (countAnswered === questions.length && questions.length > 0) {
      setIsAnsweredAll(true);
      console.log(questions.length);
      // setIsFinished(true);
      console.log("hello");
    }
  }, [countAnswered]);

  function computeScore() {
    setScore(score + 1);
  }
  function countAnsweredOk() {
    setCountAnswered(countAnswered + 1);
  }
  function getScoreCompa() {
    const percentage = score / questions.length;
    if (percentage >= 0.8) {
      return "CONGRATULATION! YOU GET HD";
    }
    if (percentage >= 0.7) {
      return "CONGRATULATION! YOU GET DI";
    }
    if (percentage >= 0.6) {
      return "YOU GET CR";
    }
    if (percentage >= 0.5) {
      return "YOU GET PA";
    }
    return "YOU GET NN, TRY MORE";
  }
  function shuffle(array) {
    // for (var i = array.length - 1; i > 0; i--) {
    //     var j = Math.floor(Math.random() * (i + 1));
    //     var temp = array[i];
    //     array[i] = array[j];
    //     array[j] = temp;
    //   }
    //   return array;
    return array.sort(() => Math.random() - 0.5);
  }
  // handleAnswer

  return (
    <div>
      <div className="conatiner d-flex flex-column justify-content-center align-items-center p-4">
        <h2>Time to test</h2>
        {questions.map(
          ({ aQuestion, description, answers, correct, _id }, index) => (
            <Question
              isFinished={isFinished}
              description={description}
              onAnswered={countAnsweredOk}
              computeScore={computeScore}
              aQuestion={aQuestion}
              answers={answers}
              correct={correct}
              key={_id}
              index={index}
            />
          )
        )}
        {isFinished && <p>Score: {score}</p>}

        <button
          disabled={!isAnsweredAll}
          data-bs-toggle="modal"
          data-bs-target="#finishedTextModal"
          onClick={() => setIsFinished(true)}
          className="btn btn-outline-primary mt-4 w-25"
        >
          Finish test
        </button>

        <div
          className="modal fade"
          id="finishedTextModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Test result
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <div className="modal-body">
                Your score: {score}
                <p>{getScoreCompa()}</p>
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
  );
}
