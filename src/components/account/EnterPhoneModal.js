import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { validateEmail, validatePhone } from "../../util";

const EnterPhoneModal = ({ isOpen, setIsOpen, onSubmit, resetStates }) => {
  const [loginId, setLoginId] = useState("");
  const [loginIdError, setLoginIdError] = useState(false);

  const validateLoginId = (value) => {
    if (validatePhone(loginId, setLoginIdError)) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = () => {
    if (validateLoginId(loginId)) onSubmit(loginId);
  };

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        setLoginIdError(false);
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
            setLoginIdError(false);
            if (resetStates) resetStates();
          }}
        ></span>
        <h1>Enter Phone</h1>
        <div className={`type_felids mb58 ${loginIdError ? "error" : ""}`}>
          
          <input
            autoFocus
            type="text"
            placeholder="Phone Number"
            onChange={({ target: { value } }) => setLoginId(value)}
            onBlur={({ target: value }) => {
              validateLoginId(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
          <p>
            <b className="error_one">Invalid phone number </b><b className="error_sec"><sup>*</sup>requried</b>
          </p>
        </div>
        <div className="login_buttons">
          <Link href="" className="btn-normal at_bg2" onClick={handleSubmit}>
            proceed
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default EnterPhoneModal;
