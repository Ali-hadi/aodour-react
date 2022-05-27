import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";
import { POST_REVIEW } from "../../constants/actionTypes";
import notification from "../Notification";
import "../../styles/Modal.css";
import Loader from "../Loader/compnentLoader";
export default function ProductDetailModal({ slug, isOpen, setIsOpen }) {
  const [review, setReview] = useState("");
  const [title, setTitle] = useState("");
  const [ageGroup, setAgeGroup] = useState("18-25");
  const [skinType, setSkinType] = useState("Normal");
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [nameError, setNameError] = useState(false);

  const dispatch = useDispatch();

  const changeAgeGroup = ({ target: { value } }) => {
    setAgeGroup(value);
  };

  const postReview = () => {
    if (validateFields()) {
      setLoading(true);
      dispatch({
        type: POST_REVIEW,
        payload: {
          review: {
            title,
            review,
            ageGroup,
            skinType,
            userName: name,
            rating,
          },
          slug,
        },
        callback: () => {
          setIsOpen(false);
          setLoading(false);
          notification({ message: "Thank you for submission."});
        },
      });
    } 
  };

  const validateFields = () => {
    if (review === "") {
      setReviewError(true);
    } else {
      setReviewError(false);
    }

    if (title === "") {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (name.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (
      review !== "" &&
      title !== "" &&
      ageGroup !== "" &&
      skinType !== "" &&
      name.length >= 3
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={300}
        className="dialog boxlayout"
        zIndex={1000}
      >
        <Modal
          closeTimeoutMS={500}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          shouldCloseOnOverlayClick={true}
        >
          {/* <h1>Write Review</h1> */}

          <div className="modal-dialog" role="document">
            <Loader loading={loading} />
            <div className="modal-content">
              <div className="filter_column write_review">
                <button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <span
                    className="cross-btn icon-close"
                    data-dismiss="modal"
                  ></span>
                  {/* CLOSE BUTTON */}
                </button>
                <h6>write a review</h6>
                <div className="score_rating">
                  <p>Score:</p>
                  <div className="rateing_star">
                    <ul className="rating">
                      <li onClick={() => setRating(1)}>
                        <i
                          className={
                            rating > 0 ? "fa fa-star check" : "fa fa-star un-checked"
                          }
                          aria-hidden="true"
                        ></i>
                      </li>
                      <li onClick={() => setRating(2)}>
                        <i
                          className={
                            rating > 1 ? "fa fa-star check" : "fa fa-star un-checked"
                          }
                          aria-hidden="true"
                        ></i>
                      </li>
                      <li onClick={() => setRating(3)}>
                        <i
                          className={
                            rating > 2 ? "fa fa-star check" : "fa fa-star un-checked"
                          }
                          aria-hidden="true"
                        ></i>
                      </li>
                      <li onClick={() => setRating(4)}>
                        <i
                          className={
                            rating > 3 ? "fa fa-star check" : "fa fa-star un-checked"
                          }
                          aria-hidden="true"
                        ></i>
                      </li>
                      <li onClick={() => setRating(5)}>
                        <i
                          className={
                            rating > 4 ? "fa fa-star check" : "fa fa-star un-checked"
                          }
                          aria-hidden="true"
                        ></i>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="sparator mb20"></div>
                <form>
                  <div className="text-felid">
                    <h5>
                      <sup>*</sup>Name:{" "}
                      {nameError && (
                        <span style={{ color: "red" }}>
                          {" "}
                          (must be at least 3 character long){" "}
                        </span>
                      )}
                    </h5>
                    <input
                      className={nameError ? "input-error" : ""}
                      type="text"
                      placeholder=""
                      value={name}
                      onChange={({ target: { value } }) => {
                        if (value.length < 3) {
                          setNameError(true);
                        } else {
                          setNameError(false);
                        }
                        setName(value);
                      }}
                    />
                  </div>
                  <div className="text-felid">
                    <h5>
                      <sup>*</sup>Title:{" "}
                      {titleError && (
                        <span style={{ color: "red" }}> (required) </span>
                      )}
                    </h5>
                    <input
                      className={titleError ? "input-error" : ""}
                      type="text"
                      placeholder=""
                      value={title}
                      onChange={({ target: { value } }) => {
                        if (value.length < 1) {
                          setTitleError(true);
                        } else {
                          setTitleError(false);
                        }
                        setTitle(value);
                      }}
                    />
                  </div>

                  <div className="text-felid">
                    <h5>
                      <sup>*</sup>Review:{" "}
                      {reviewError && (
                        <span style={{ color: "red" }}> (required) </span>
                      )}
                    </h5>
                    <textarea
                      className={reviewError ? "input-error" : ""}
                      value={review}
                      onChange={({ target: { value } }) => {
                        if (value.length < 1) {
                          setReviewError(true);
                        } else {
                          setReviewError(false);
                        }
                        setReview(value);
                      }}
                    ></textarea>
                  </div>
                  <div className="text-felid">
                    <h5>How old are you?</h5>
                    <div className="radio_felid">
                      <input
                        checked={ageGroup === "18-25"}
                        type="radio"
                        id="lab1"
                        name="ab"
                        value="18-25"
                        onChange={changeAgeGroup}
                      />
                      <label htmlFor="lab1">
                        <span></span>18-25
                      </label>
                    </div>
                    <div className="radio_felid">
                      <input
                        type="radio"
                        id="lab2"
                        name="ab"
                        value="25-35"
                        onChange={changeAgeGroup}
                      />
                      <label htmlFor="lab2">
                        <span></span>25-35
                      </label>
                    </div>
                    <div className="radio_felid">
                      <input
                        type="radio"
                        id="lab3"
                        name="ab"
                        value="35-44"
                        onChange={changeAgeGroup}
                      />
                      <label htmlFor="lab3">
                        <span></span>35-44
                      </label>
                    </div>
                    <div className="radio_felid">
                      <input
                        type="radio"
                        id="lab4"
                        name="ab"
                        value="45-55"
                        onChange={changeAgeGroup}
                      />
                      <label htmlFor="lab4">
                        <span></span>45-55
                      </label>
                    </div>
                    <div className="radio_felid">
                      <input
                        type="radio"
                        id="lab5"
                        name="ab"
                        value="55+"
                        onChange={changeAgeGroup}
                      />
                      <label htmlFor="lab5">
                        <span></span>55+
                      </label>
                    </div>
                  </div>
                  <div className="text-felid">
                    <h5>Which best describes your skin type?</h5>
                    <div className="radio_felid">
                      <input
                        type="radio"
                        id="lab6"
                        name="ab1"
                        value="Oily"
                        onChange={({ target: { value } }) => setSkinType(value)}
                      />
                      <label htmlFor="lab6">
                        <span></span>Oily
                      </label>
                    </div>
                    <div className="radio_felid">
                      <input
                        type="radio"
                        id="lab7"
                        name="ab1"
                        value="Dry"
                        onChange={({ target: { value } }) => setSkinType(value)}
                      />
                      <label htmlFor="lab7">
                        <span></span>Dry
                      </label>
                    </div>
                    <div className="radio_felid">
                      <input
                        checked={skinType === "Normal"}
                        type="radio"
                        id="lab8"
                        name="ab1"
                        value="Normal"
                        onChange={({ target: { value } }) => setSkinType(value)}
                      />
                      <label htmlFor="lab8">
                        <span></span>Normal
                      </label>
                    </div>
                    <div className="radio_felid">
                      <input
                        type="radio"
                        id="lab10"
                        name="ab1"
                        value="Sensitive"
                        onChange={({ target: { value } }) => setSkinType(value)}
                      />
                      <label htmlFor="lab10">
                        <span></span>Sensitive
                      </label>
                    </div>
                  </div>
                  <div className="text-felid">
                    <button
                      type="submit"
                      className="btn_sleek at_bg2"
                      onClick={(e) => {
                        e.preventDefault();
                        postReview();
                      }}
                    >
                      Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>
      </CSSTransition>
    </>
  );
}
