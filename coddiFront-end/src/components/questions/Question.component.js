import React from "react";
import { useState } from "react";

function Question({
  aQuestion,
  description,
  answers,
  correct,
  computeScore,
  onAnswered,
  index,
  isFinished,
}) {
  const [message, setMessage] = useState();
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState();

  function computeAnswer(answer, correctAns) {
    setSelected(answer);
    onAnswered();
    if (answer === correctAns) {
      setMessage("Correct Answer");
      computeScore();
    } else {
      setMessage("Incorrect Answer");
    }
    setAnswered(true);
  }
  function TextTransform(props) {
    const text = props.stringText;
    const newText = text.split('\\n').map(
      str => <p>
        {str.split('\\t').map(
          subStr => <span>&emsp;{subStr}</span>
        )}
        </p>
      );
    return <div>{newText}</div>;
  }
  function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
  }
  function TextTransform(props) {
    const text = props.stringText;
    const newText = text.split('\\n').map(
      str => <p>
        {str.split('\\t').map(
          subStr => <span>&emsp;{subStr}</span>
        )}
        </p>
      );
    return <div>{newText}</div>;
  }

  return (
    <div className="container mt-4 p-4 border rounded bg-white">
      {"Question " + (index + 1) + ": "}<TextTransform stringText={aQuestion}></TextTransform>
      {answers.map((text, _id) => (
        <div className="mt-4" key={_id}>
          {console.log(text === correct)}
          <button
            disabled={answered}
            className={
              "btn btn-outline-primary w-100 text-start " +
              (text === selected && !isFinished ? "bg-secondary text-white" : "") +
              (correct === selected &&
              answered &&
              selected === text &&
              isFinished
                ? "bg-success text-white"
                : "") +
              (selected !== correct &&
              text === selected &&
              answered &&
              isFinished
                ? "bg-danger text-white"
                : "")
            }
            onClick={() => {
              computeAnswer(text, correct);
            }}
          >
            {text}
          </button>
        </div>
      ))}
      {isFinished && <p>{message}</p>}
      {isFinished && <p className="p-4 rounded" style={{backgroundColor: "#4DD4AC"}}>Explaination: <TextTransform stringText={description}/></p>}
    </div>
  );
}
export default Question;
