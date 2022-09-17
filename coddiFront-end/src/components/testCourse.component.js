import React from "react";
import { useParams } from "react-router-dom";
import ListQuestion from "./questions/listQuestion.component";

export default function TestCourse() {
  const { id } = useParams();
  return (
    <div>
      <ListQuestion id={id} />
    </div>
  );
}
