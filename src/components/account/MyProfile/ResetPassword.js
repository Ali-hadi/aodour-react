import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Modal from "react-modal";
import { validateEmail, validatePhone, validatePassword } from "../../../util";
import notification from "../../Notification";
import { POST_RESET_PASSWORD } from "../../../constants/actionTypes";

const ResetPassword = ({ isOpen, setIsOpen, onSubmit }) => {
  const [old, setOld] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [oldError, setOldError] = useState(false);
  const [newError, setNewError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const dispatch = useDispatch();

  const resetStates = () => {
    setOldError(false);
    setOld("");
    setNewError(false);
    setNewPass("");
    setConfirmError(false);
    setConfirm("");
  };

  const handleSubmit = () => {
    if (
      validatePassword(old, setOldError) &&
      validatePassword(newPass, setNewError)
    ) {
      if (newPass === confirm) {
        setConfirmError(false);
        resetPassword(old, newPass);
      } else {
        setConfirmError(true);
      }
    }
  };

  const resetPassword = (oldPassword, newPassword) => {
    dispatch({
      type: POST_RESET_PASSWORD,
      payload: { oldpassword: oldPassword, password: newPassword },
      callback: (response, status) => {
        if (status === "success") {
          setIsOpen(false);
          notification({
            message: "Update Successful",
            error: false,
          });
        } else {
          notification({
            message: response.result.msg,
            error: true,
          });
        }
      },
    });
  };

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        resetStates();
      }}
      shouldCloseOnOverlayClick={true}
      className="login_models"
    >
      <div className="login_page_content">
        <span
          className="cross-btn icon-close"
          onClick={() => {
            resetStates();
            setIsOpen(false);
          }}
        ></span>
        <h1>
          <i className="fa fa-key" aria-hidden="true"></i>Password reset
        </h1>
        <div className={`text-type mb20 `}>
          <div className={`felids_resets ${oldError ? "error" : ""}`}>
            <input
              id="old_pass"
              autoFocus
              type="password"
              placeholder="Old Password"
              onChange={({ target: { value } }) => {
                setOld(value);
              }}
              onBlur={({ target: { value } }) =>
                validatePassword(value, setOldError)
              }
            />
            <p>
              <b className="error_one">password must be at least 8 characters </b>
              <b className="error_sec">
                <sup>*</sup>requried
              </b>
            </p>
          </div>
          <div className={`felids_resets ${newError ? "error" : ""}`}>
            <input
              id="confirm_pass1"
              type="password"
              placeholder="New Password"
              onChange={({ target: { value } }) => {
                setNewPass(value);
              }}
              onBlur={({ target: { value } }) =>
                validatePassword(value, setNewError)
              }
            />
            <p>
              <b className="error_one">password must be at least 8 characters </b>
              <b className="error_sec">
                <sup>*</sup>requried
              </b>
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
                if (newPass !== confirm) setConfirmError(true);
                else setConfirmError(false);
              }}
            />
            <p>
              <b className="error_one">
                password and confirm password do not match.{" "}
              </b>
              <b className="error_sec">
                <sup>*</sup>requried
              </b>
            </p>
          </div>
        </div>

        <div className="login_buttons">
          <Link href="" className="btn-normal at_bg2" onClick={handleSubmit}>
            reset Password
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPassword;
