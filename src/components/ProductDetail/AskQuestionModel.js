import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";
import { POST_ASK_QUESTION } from "../../constants/actionTypes";
import notification from "../Notification";
import { emailformat } from "../../util";
import Loader from "../Loader/compnentLoader";
import "../../styles/Modal.css";
export default function ProductDetailModal({ slug, isOpen, setIsOpen }) {
  // const query = new URLSearchParams(useLocation().search);
  // const productId = query.get('product-id');

  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const askQuestion = () => {
    if (validateFields()) {
      setLoading(true);
      dispatch({
        type: POST_ASK_QUESTION,
        payload: {
          question: {
            userName: name,
            question,
            email,
          },
          slug,
        },
        callback: () => {
          setIsOpen(false);
          setLoading(false);
          notification({ message: "Thank you for submission." });
        },
      });
    } else {
      notification({ message: "write something" });
    }
  };

  const validateFields = () => {
    if (name.length < 3) {
      setNameError(true);
    } else {
      setNameError(false);
    }

    if (!email.match(emailformat)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (question.length < 1) {
      setQuestionError(true);
    } else {
      setQuestionError(false);
    }

    if (name.length >= 3 && email.match(emailformat) && question.length >= 1) {
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
          {/* <h1>Ask Question</h1>
              <input type="text" />*/}

          <div className="modal-dialog" role="document">
            <Loader loading={loading} />
            <div className="modal-content">
              <div className="filter_column">
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
                <h6>ask a question</h6>
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
                      <sup>*</sup>Email:{" "}
                      {emailError && (
                        <span style={{ color: "red" }}> (required) </span>
                      )}
                    </h5>
                    <input
                      className={emailError ? "input-error" : ""}
                      type="text"
                      placeholder=""
                      value={email}
                      onChange={({ target: { value } }) => {
                        if (value.match(emailformat)) {
                          setEmailError(false);
                        } else {
                          setEmailError(true);
                        }
                        setEmail(value);
                      }}
                    />
                  </div>
                  <div className="text-felid">
                    <h5>
                      <sup>*</sup>Question:
                      {nameError && (
                        <span style={{ color: "red" }}> (required) </span>
                      )}
                    </h5>
                    <textarea
                      className={questionError ? "input-error" : ""}
                      value={question}
                      onChange={(e) => {
                        const text = e.target.value;
                        setQuestion(text);
                        if (text.length < 1) {
                          setQuestionError(true);
                        } else {
                          setQuestionError(false);
                        }
                      }}
                    ></textarea>
                  </div>
                  <div className="text-felid">
                    <button
                      type="submit"
                      className="btn_sleek at_bg2"
                      onClick={(e) => {
                        e.preventDefault();
                        askQuestion();
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
