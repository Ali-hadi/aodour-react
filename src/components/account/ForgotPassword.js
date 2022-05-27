import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { validateEmail, validatePhone, validatePassword } from "../../util";

const ForgotPassword = ({ isOpen, setIsOpen, onSubmit, resetStates }) => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const handleSubmit = () => {
    if (validatePassword(password, setPasswordError)) {
      if (password === confirm) {
        onSubmit(password);
        setConfirmError(false);
        setPasswordError(false);
      } else {
        setConfirmError(true);
      }
    }
  };

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        setConfirmError(false);
        setPasswordError(false);
        if (resetStates) resetStates();
      }}
      shouldCloseOnOverlayClick={true}
      className="login_models"
    >
      <div className="login_page_content">
        <span
          className="cross-btn icon-close"
          onClick={() => {
            setIsOpen(false);
            setConfirmError(false);
            setPasswordError(false);
            if (resetStates) resetStates();
          }}
        ></span>
        <h1>
          <i className="fa fa-key" aria-hidden="true"></i>Password reset
        </h1>
        <div className={`text-type mb20 `}>
          <div className={`felids_resets ${passwordError ? "error" : ""}`}>
            <input
              id="confirm_pass1"
              type="password"
              autoFocus
              placeholder="New Password"
              onChange={({ target: { value } }) => {
                setPassword(value);
              }}
              onBlur={({ target: { value } }) =>
                validatePassword(value, setPasswordError)
              }
            />
            <p>
              <b className="error_one">password must be at least 8 characters</b><b className="error_sec"><sup>*</sup>requried</b>
            </p>
          </div>
          <div className={`felids_resets ${confirmError ? "error" : ""}`}>
            <input
              id="confirm_pass2"
              type="password"
              placeholder="Confirm Password"
              onChange={({ target: { value } }) => {
                setConfirm(value);
              }}
              onBlur={({ target: { value } }) => {
                if (password !== confirm) setConfirmError(true);
                else setConfirmError(false);
              }}
            />
            <p>
              <b className="error_one">password and confirm password do not match.</b><b className="error_sec"><sup>*</sup>requried</b>
            </p>
          </div>
        </div>

        <div className="login_buttons">
          <Link
            href=""
            className="btn-normal at_bg2"
            onClick={() => {
              handleSubmit();
            }}
          >
            reset Password
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ForgotPassword;
