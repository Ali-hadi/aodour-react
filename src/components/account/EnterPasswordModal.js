import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { validatePassword } from "../../util";

const EnterPasswordModal = ({
  isOpen,
  setIsOpen,
  resetStates,
  name,
  login,
  loginId,
  handleForgetPassword,
}) => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validatePassword(password, setPasswordError)) login(loginId, password);
  };

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        setPasswordError(false);
        resetStates();
      }}
      shouldCloseOnOverlayClick={true}
      className="login_models"
    >
      <div className="login_page_content">
        <span
          className="cross-btn icon-close"
          onClick={() => {
            setIsOpen(false);
            setPasswordError(false);
            resetStates();
          }}
        ></span>
        {/*CLOSE BUTTON*/}
        <h1>Login</h1>
        <div className="type_felids mb38">
          <input type="text" placeholder={loginId} disabled />
        </div>
        <div className="login_discriptions mb58">
          <p>
            <b>
              Hello {name},
              <br />
              Please enter your password to continue
            </b>
          </p>
        </div>
        <div
          className={`type_felids_underline mb45 ${passwordError ? "error" : ""}`}
        >
          <p>
            <b className="error_one">Invalid Password (must be at least 8 characters)</b> <b className="error_sec"><sup>*</sup>requried</b>
          </p>
          <input
            autoFocus
            type="password"
            placeholder="Password"
            onChange={({ target: { value } }) => setPassword(value)}
            onBlur={({ target: { value } }) => validatePassword(password)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e);
            }}
          />
        </div>
        <div className="login_buttons">
          <Link
            href="javascript:void(0)"
            className="btn-normal at_bg2"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            login
          </Link>
          <Link
            onClick={() => {
              handleForgetPassword(loginId);
            }}
          >
            forget password?
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default EnterPasswordModal;
