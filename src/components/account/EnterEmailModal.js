import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { validateEmail, validatePhone } from "../../util";

const EnterEmailModal = ({ isOpen, setIsOpen, verifyLogin, resetStates }) => {
  const [loginId, setLoginId] = useState("");
  const [loginIdError, setLoginIdError] = useState(false);

  const validateLoginId = (value) => {
    if (
      validateEmail(loginId, setLoginIdError) ||
      validatePhone(loginId, setLoginIdError)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateLoginId(loginId)) verifyLogin(loginId);
  };

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        setLoginIdError(false);
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
            setLoginIdError(false);
            resetStates();
          }}
        ></span>
        <h1>Login / register</h1>
        <div className="login_discriptions mb58"></div>
        <div className={`type_felids mb58 ${loginIdError ? "error" : ""}`}>
          <input
            autoFocus
            type="text"
            placeholder="Email Address / Phone"
            onChange={({ target: { value } }) => setLoginId(value)}
            onBlur={({ target: value }) => {
              validateLoginId(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit(e);
            }}
          />
          <p>
            <b className="error_one">Invalid email or phone </b><b className="error_sec"><sup>*</sup>requried</b>
          </p>
        </div>
        <div className="login_buttons">
          <Link href="javascript:void(0)" className="btn-normal at_bg2" onClick={handleSubmit}>
            proceed
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default EnterEmailModal;
