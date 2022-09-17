import React, { useState } from "react";

export default function DisplayQuestion({ aQuestion, answers, correct }) {
  const [message, setMessage] = useState();
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState();

  function checkAnswer(answer, correctAns) {
    setSelected(answer);
    if (answer == correctAns) {
      setMessage("Correct answer");
    } else {
      setMessage("Incorrect answer");
    }
    setAnswered(true);
  }
  function TextTransform(props) {
    const text = props.stringText;
    const newText = text.split('\\n').map(
      str => <p key={str.toString()}>
        {str.split('\\t').map(
          subStr => <span key={subStr.toString()}>&emsp;{subStr}</span>
        )}
        </p>
      );
    return <div>{newText}</div>;
  }
  return (
    <div>
      <TextTransform stringText={aQuestion}></TextTransform>
      
      {answers.map((text, _id) => (
        <div key={_id}>
          {console.log(text === correct)}
          <div className="container mt-2 ">
            <button
              disabled={answered}
              className={
                "btn btn-outline-primary w-100 text-start " +
                (correct === selected && answered && selected === text
                  ? "bg-success text-white"
                  : "") +
                (selected !== correct && text === selected && answered
                  ? "bg-danger text-white"
                  : "")
              }
              onClick={() => {
                checkAnswer(text, correct);
              }}
            >
              {text}
            </button>
          </div>
        </div>
      ))}
      <p>{message}</p>
    </div>
  );
}
