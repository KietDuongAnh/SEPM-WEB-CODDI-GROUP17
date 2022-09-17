import React from "react";
import { Link } from "react-router-dom";

function homepage() {
  return (
    <div className="d-flex flex-column" style={{ width: "100%" }}>
      <div
        className="pb-4 d-flex flex-column align-items-center justify-content-center"
        style={{ height: "100vh", backgroundColor: "#EDEDF8" }}
      >
        <div className="d-flex p-4 align-items-center justify-content-center text-uppercase fs-1 fw-bolder">
          Outstanding features
        </div>
        <div className="row w-100 h-100">
          <div className="col-8">
            <div className="container pt-4 pb-4 w-75">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={0}
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  />
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={1}
                    aria-label="Slide 2"
                  />
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={2}
                    aria-label="Slide 3"
                  />
                </div>
                <div className="carousel-inner" style={{ height: "500px" }}>
                  <div
                    className="carousel-item active h-100"
                    data-bs-interval="5000"
                  >
                    <img
                      src={require("../img//CSS.jpg")}
                      className="d-block w-100 h-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item h-100" data-bs-interval="5000">
                    <img
                      src={require("../img//HTML.jpg")}
                      className="d-block w-100 h-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item h-100" data-bs-interval="5000">
                    <img
                      src={require("../img//JS.jpg")}
                      className="d-block w-100 h-100"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center fs-3 fw-bolder">
            <ul>
              <li>Engaging evironment</li>
              <li>Comprehensible and detailed content</li>
              <li>Modern learning system</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        className="pb-4 bg-white d-flex align-items-center justify-content-center"
        style={{ height: "50vh" }}
      >
        <div className="row w-100 h-100">
          <div className="col-8 d-flex align-items-center justify-content-center text-uppercase fs-1 fw-bolder text-primary">
            Learn to code: From zero to hero
          </div>
          <div className="col-4 d-flex align-items-center justify-content-center">
            <img src={require("../img//CODDI_logo.png")}></img>
          </div>
        </div>
      </div>

      <div
        className="pb-4 pt-4 d-flex align-items-center justify-content-center"
        style={{ height: "70vh", backgroundColor: "#161867" }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center text-white">
          <div className="text-uppercase fs-1 fw-bolder">PURSUIT YOUR PROGRAMMING PASSION !</div>
          <div className="fs-2 fw-bolder">Register and join the with us</div>
          <div className="pt-4"><Link className="btn btn-danger p-4 pt-2 pb-2" to={'/register'}>Join now</Link></div>
          
        </div>
      </div>
    </div>
  );
}

export default homepage;
