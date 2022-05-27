import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import notification from "../Notification";
const PhoneVerificationModal = ({
  isOpen,
  closeModal,
  phone,
  verifyPin,
  sendVerificationCode,
}) => {
  const pin1 = useRef(null);
  const pin2 = useRef(null);
  const pin3 = useRef(null);
  const pin4 = useRef(null);

  const handleSubmit = () => {
    if (pin1 !== null && pin2 !== null && pin3 !== null && pin4 !== null) {
      if (
        pin1.current.value !== "" &&
        pin2.current.value !== "" &&
        pin3.current.value !== "" &&
        pin4.current.value !== ""
      ) {
        verifyPin(
          phone,
          `${pin1.current.value}${pin2.current.value}${pin3.current.value}${pin4.current.value}`
        );
        // console.log(
        //   `${pin1.current.value}${pin2.current.value}${pin3.current.value}${pin4.current.value}`
        // );
      } else {
        notification({
          message: "Error: Invalid Pin",
          error: true,
        });
      }
    }
  };

  const gotoNext = (e) => {
    if (e.keyCode === 8) {
      if (e.target.name === "pin4") {
        pin3.current.focus();
      } else if (e.target.name === "pin3") {
        pin2.current.focus();
      } else if (e.target.name === "pin2") {
        pin1.current.focus();
      }
    } else {
      if (e.target.name === "pin1") {
        pin2.current.focus();
      } else if (e.target.name === "pin2") {
        pin3.current.focus();
      } else if (e.target.name === "pin3") {
        pin4.current.focus();
      }
    }
  };

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      onRequestClose={() => {
        closeModal();
      }}
      shouldCloseOnOverlayClick={true}
      className="login_models"
    >
      <div className="login_page_content">
        <span
          className="cross-btn icon-close"
          onClick={() => closeModal()}
        ></span>
        <h1>verify mobile number</h1>
        <div className="login_discriptions mb20">
          <p>Type there verification code sent to {phone}</p>
        </div>
        <form>
          <div className="type_felids_underline mb20">
            <div className="verify ">
              {/* error2 */}
              <input
                autoFocus
                ref={pin1}
                name="pin1"
                type="text"
                maxLength="1"
                size="1"
                min="0"
                max="9"
                pattern="[0-9]{1}"
                onKeyUp={gotoNext}
              />
              <input
                ref={pin2}
                name="pin2"
                type="text"
                maxLength="1"
                size="1"
                min="0"
                max="9"
                pattern="[0-9]{1}"
                onKeyUp={gotoNext}
              />
              <input
                ref={pin3}
                name="pin3"
                type="text"
                maxLength="1"
                size="1"
                min="0"
                max="9"
                pattern="[0-9]{1}"
                onKeyUp={gotoNext}
              />
              <input
                ref={pin4}
                name="pin4"
                type="text"
                maxLength="1"
                size="1"
                min="0"
                max="9"
                pattern="[0-9]{1}"
                onKeyUp={gotoNext}
              />
            </div>
          </div>
          <div className="login_buttons width_define">
            <Link className="btn-normal at_bg2" onClick={() => handleSubmit()}>
              verify
            </Link>
          </div>
        </form>
        <div className="login_discriptions">
          <p>
            Didn't receive the code? <br />
            <Link
              href=""
              className="clr1"
              onClick={() => sendVerificationCode(phone)}
            >
              Send code again
            </Link>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default PhoneVerificationModal;
