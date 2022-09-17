import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentService from "../../services/comment.service";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
dayjs.extend(relativeTime);
export default function CommentList() {
  const [comments, setComment] = useState([]);
  const [text, setText] = useState("");
  const [idUser, setIdUser] = useState(0);
  const [username, setUsername] = useState("");

  const { questionId } = useParams();

  useEffect(() => {
    getComments();
    getUser();
  }, []);

  function getUser() {
    const u = JSON.parse(localStorage.getItem("user"));
    const idU = u.id;
    const username = u.username;
    setUsername(username);
    setIdUser(idU);
    console.log(idU);
  }

  function getComments() {
    CommentService.getComments(questionId).then((comment) => {
      setComment(comment.data.Comment);
    });
  }
  function createComment() {
    var data = {
      text,
      aQuestion: questionId,
      author: idUser,
    };
    CommentService.createComment(data, questionId)
      .then((response) => {
        getComments();
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function onChangeText(e) {
    setText(e.target.value);
  }

  return (
    <div className="container pt-4 pb-4 d-flex flex-column align-items-center">
      <div>
        {/* Button trigger modal */}
        <button
          type="button"
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#add_comment"
        >
          Write a comment
        </button>
        {/* Modal */}
        <div
          className="modal fade"
          id="add_comment"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="card p-2">
                <div className="card-body">
                  <h4 className="card-title text-primary">{username}</h4>
                  <label htmlFor="comment">
                    <h5 className="card-title">Add a comment</h5>
                  </label>
                  <textarea
                    id="comment"
                    className="form-control"
                    rows="6"
                    style={{ resize: "none" }}
                    onChange={onChangeText}
                    value={text}
                    placeholder="Message..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  className="btn btn-success mt-2 mb-2"
                  onClick={createComment}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container pb-4 pt-4">
        <h4>Recent comments</h4>
        {comments.map((comment, index) => (
          <div className="card mt-2" key={index}>
            <div className="card-body">
              <h5 className="card-title">
                <div className="text-primary">{comment.author.username}</div>
                <div>
                  <small className="text-muted fs-6" style={{opacity: 0.7}}>
                    Shared publicly -
                    {" " + dayjs().to(dayjs(comment.createdAt))}
                  </small>
                </div>
              </h5>
              <p className="card-text">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

{
  /* <section style={{ backgroundColor: "#eee" }}>
        <div className="container my-5 py-5">
          <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-start align-items-center">
                    <div>
                      <h6 className="fw-bold text-primary mb-1">
                        Lily Coleman
                      </h6>
                      <p className="text-muted small mb-0">
                        Shared publicly - Jan 2020
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 mb-4 pb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip consequat.
                  </p>
                </div>
                <div
                  className="card-footer py-3 border-0"
                  style={{ backgroundColor: "#f8f9fa" }}
                >
                  <div className="d-flex flex-start w-100">
                    <div className="form-outline w-100">
                      <textarea
                        className="form-control"
                        id="textAreaExample"
                        rows={4}
                        style={{ background: "#fff" }}
                        defaultValue={""}
                      />
                      <label className="form-label" htmlFor="textAreaExample">
                        Message
                      </label>
                    </div>
                  </div>
                  <div className="float-end mt-2 pt-1">
                    <button type="button" className="btn btn-primary btn-sm">
                      Post comment
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */
}
