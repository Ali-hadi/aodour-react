import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "../../util";
import {
  POST_VERIFY_PHONE_REGISTER,
  POST_VERIFY_EMAIL,
} from "../../constants/actionTypes";

const RegisterModal = ({
  isOpen,
  setIsOpen,
  resetStates,
  registerObject,
  register,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();

  const verifyPhoneCall = (value, callback) => {
    dispatch({
      type: POST_VERIFY_PHONE_REGISTER,
      payload: { phone: value },
      callback: callback
        ? callback
        : (response, status) => {
            if (status === "fail" || !response.result.status) {
              setPhoneError(true);
            } else {
              setPhoneError(false);
            }
          },
    });
  };

  const verifyPhone = (value, callback) => {
    if (validatePhone(value, setPhoneError)) {
      verifyPhoneCall(value, callback);
    }
  };

  const verifyEmailCall = (value, callback) => {
    dispatch({
      type: POST_VERIFY_EMAIL,
      payload: { email: value },
      callback: callback
        ? callback
        : (response, status) => {
            if (status === "fail" || !response.result.status) {
              setEmailError(true);
            } else {
              setEmailError(false);
            }
          },
    });
  };

  const verifyEmail = (value, callback) => {
    if (validateEmail(value, setEmailError)) {
      verifyEmailCall(value, callback);
    }
  };

  const validateFields = () => {
    if (
      validateName(name, setNameError) &&
      validateEmail(email, setEmailError) &&
      validatePhone(phone, setPhoneError) &&
      validatePassword(password, setPasswordError)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const registerClick = (e) => {
      e.preventDefault();
    if (validateFields()) {
      verifyPhoneCall(phone, (response, status) => {
        if (status === "fail") {
          setPhoneError(true);
          verifyEmailCall(email);
        } else if (status === "success") {
          setPhoneError(false);
          verifyEmailCall(email, (response, status) => {
            if (status === "fail") {
              setEmailError(true);
            } else if (status === "success") {
              setEmailError(false);
              register({ name, email, phone, password });
            }
          });
        }
      });
    }
  };

  useEffect(() => {
    if (registerObject) {
      setEmail(registerObject.email);
      setName(registerObject.name);
    }
  }, []);

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        setNameError(false);
        setPasswordError(false);
        setEmailError(false);
        setPhoneError(false);
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
              setNameError(false);
              setPasswordError(false);
              setEmailError(false);
              setPhoneError(false);
              resetStates();
            }}
          ></span>
        {/*CLOSE BUTTON*/}
        <h1>register</h1>
        <div className="login_discriptions mb58"></div>
        <div className={`type_felids_underline mb20 ${nameError ? "error" : ""}`}>
          <p>
            <b className="error_one">Must be at least 3 characters</b><b className="error_sec"><sup>*</sup>requried</b>
          </p>
          <input
            autoFocus
            type="text"
            placeholder="Name"
            onChange={({ target: { value } }) => {
              setName(value);
            }}
            onBlur={({ target: { value } }) => {
              validateName(value, setNameError);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") registerClick(e);
            }}
          />
        </div>
        <div className={`type_felids_underline mb20 ${phoneError ? "error" : ""}`}>
          <p>
            <b className="error_one">Invalid Phone or Phone already exists</b> <b className="error_sec"><sup>*</sup>requried</b>
          </p>
          <input
            type="text"
            placeholder="Phone Number"
            onChange={({ target: { value } }) => {
              setPhone(value);
            }}
            onBlur={({ target: { value } }) => {
              verifyPhone(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") registerClick(e);
            }}
          />
        </div>
        <div className={`type_felids_underline mb20 ${emailError ? "error" : ""}`}>
          <p>
            <b className="error_one">Invalid Email</b> <b className="error_sec"><sup>*</sup>requried</b>
          </p>
          <input
            type="text"
            placeholder="Email Address"
            onChange={({ target: { value } }) => {
              setEmail(value);
            }}
            onBlur={({ target: { value } }) => {
              verifyEmail(value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") registerClick(e);
            }}
          />
        </div>
        <div
          className={`type_felids_underline mb58 ${passwordError ? "error" : ""}`}
        >
          <p>
            <b className="error_one">Invalid Password (must be at least 8 characters)</b> <b className="error_sec"><sup>*</sup>requried</b>
          </p>
          <input
            type="password"
            placeholder="Create Password"
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
            onBlur={({ target: { value } }) => {
              validatePassword(value, setPasswordError);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") registerClick(e);
            }}
          />
        </div>
        <div className="login_buttons" onClick={registerClick}>
          <Link href="javascript:void(0)" className="btn-normal at_bg2">
            Register
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
