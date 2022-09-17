import React, { useState, useEffect } from "react";
import QuestionService from "../../services/question.service";
import LessonService from "../../services/lesson.service";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DisplayQuestion from "./displayQuestion.component";
function GetQuestion({ id }) {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getQuestionLesson();
  }, []);
  function getQuestionLesson() {
    QuestionService.getAllQuestionLesson(id)
      .then((response) => {
        setQuestions(response.data.Question);
        console.log(response.data.Question);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function shuffle(array) {
    // for (var i = array.length - 1; i > 0; i--) {
    //   var j = Math.floor(Math.random() * (i + 1));
    //   var temp = array[i];
    //   array[i] = array[j];
    //   array[j] = temp;
    //   return array;
    // }
    return array.sort(() => Math.random() - 0.5);
  };
  return (
    <div>
      {questions.map(({ aQuestion, answers, correct, _id }) => (
        <div key={_id}>
          <DisplayQuestion
            key={_id}
            aQuestion={aQuestion}
            answers={shuffle(answers)}
            correct={correct}
          />
          <Link to={`/question/${_id}/comment`}>Discusion</Link>
        </div>
      ))}
    </div>
  );
}

export default GetQuestion;
