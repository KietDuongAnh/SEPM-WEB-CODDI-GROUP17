import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import QuestionService from "../../services/question.service";
import NavAdmin from "../nav/navAdmin";
export default function CreateQuestion({ id }) {
  const [aQuestion, setAQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [answers, setAnswers] = useState([""]);
  const [correct, setCorrect] = useState("");

  //const [numberQuestion, setNumberQuestion] = useState(1);
  const [success, setSuccess] = useState("");

  // const [id] = useParams();

  function addAnswer() {
    setAnswers([...answers, ""]);
  }

  function removeAnswer() {
    // setAnswers([...answers]);
    setAnswers((previousAns) => previousAns.slice(0, -1));
  }

  function saveQuestion() {
    var data = {
      aQuestion,
      description,
      answers: [...answers, correct],
      correct,
    };
    QuestionService.createQuestion(data, id)
      .then((response) => {
        setSuccess("Successfully creating question");
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function onChangeAQuestion(e) {
    setAQuestion(e.target.value);
  }
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }
  function onChangeCorrect(e) {
    setCorrect(e.target.value);
  }

  return (
    <div>
      <div className="container">
        <div className="card border-0 p-4">
          <h2 className="card-title">Create a question</h2>
          <div className="card-body">
            <label htmlFor="question">Writing a question</label>
            <textarea
              id="question"
              className="form-control"
              onChange={onChangeAQuestion}
              value={aQuestion}
              rows="4"
              style={{resize: "none"}}
            />
            <label htmlFor="question_description">Writing a description of question</label>
            <textarea
              id="question_description"
              className="form-control"
              onChange={onChangeDescription}
              value={description}
              rows="4"
              style={{resize: "none"}}
            />
            <p>Writing wrong answers</p>
            <div className="vstack gap-3">
              {answers.map((text, index) => {
                return (
                  <input
                    className="form-control"
                    value={answers[index]}
                    key={index}
                    onChange={(e) => {
                      answers[index] = e.target.value;
                      setAnswers([...answers]);
                    }}
                  />
                );
              })}
            </div>
            <button
              className="btn btn-outline-primary mt-4 me-4"
              onClick={addAnswer}
            >
              Add answer
            </button>
            <button
              className="btn btn-outline-danger mt-4"
              onClick={removeAnswer}
            >
              Remove answer
            </button>
            <label htmlFor="correct_ans">Writing a correct question</label>
            <input
              id="correct_ans"
              className="form-control"
              value={correct}
              onChange={onChangeCorrect}
            />
            <button className="btn btn-success mt-2" onClick={saveQuestion}>
              Submit
            </button>
            <p>{success}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
