import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import PhoneVerificationModal from "../account/PhoneVerificationModal";
import EnterPhoneModal from "../account/EnterPhoneModal";
import { isMobile } from "react-device-detect";
import {
  POST_EDIT_USER_PROFILE,
  POST_SEND_PIN,
  POST_VERIFY_PIN,
  GET_USER_PROFILE,
} from "../../constants/actionTypes";
import { getUserToken } from "../../util";
import Loader from "../Loader/compnentLoader";
import notification from "../Notification";

export default function VerifyPhoneBar() {
  const [
    isPhoneVerificationModalOpen,
    setIsPhoneVerificationModalOpen,
  ] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const dispatch = useDispatch();

  const {
    user: { phone, email, first_name, last_name, gender, date_of_birth },
  } = useSelector((state) => state);

  const closePhoneVerificationModal = () => {
    setIsPhoneVerificationModalOpen(false);
  };

  const verifyPin = (phone, pin) => {
    dispatch({
      type: POST_VERIFY_PIN,
      payload: { code: pin, phone: phone },
      callback: (response, status) => {
        if (status === "success") {
          dispatch({
            type: GET_USER_PROFILE,
            userId: getUserToken(),
          });
          setIsPhoneVerificationModalOpen(false);
        } else {
          notification({
            message: "Something went wrong try again",
            error: true,
          });
        }
      },
    });
  };

  const sendVerificationCode = (to) => {
    dispatch({
      type: POST_SEND_PIN,
      payload: { phone: to },
    });
  };

  const verifyAccount = () => {
    if (phone && phone !== "") {
      sendVerificationCode(phone);
      setIsPhoneVerificationModalOpen(true);
    } else {
      setIsPhoneModalOpen(true);
    }
  };

  const onPhoneSubmit = (loginId) => {
    dispatch({
      type: POST_EDIT_USER_PROFILE,
      payload: {
        name: `${first_name} ${last_name ? last_name : ""}`,
        email,
        phone: loginId,
        gender,
        dob: date_of_birth,
      },
      callback: (response, status) => {
        if (status === "success") {
          sendVerificationCode(loginId);
          setIsPhoneVerificationModalOpen(true);
          setIsPhoneModalOpen(false);
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
    <>
      {/*
			=========================================
				TOP ROW 
			=========================================
	  		*/}
      <div className="first_row notify_row" style={{ background: "#e23c52" }}>
        <div className="container-fluid">
          <div className="top-content">
            {isMobile && (
              <ul className="meta wclr">
                <li>
                  <p>
                    <span>Verify phone number to activate your account</span>
                  </p>
                </li>
              </ul>
            )}
            {/* CENTER OFFERS CONTENT */}
            <div className="center">
              {!isMobile && (
                <p style={{ color: "#fff", whiteSpace: "nowrap" }}>
                  Verify phone number to activate your account
                </p>
              )}
            </div>
            {/* BUTTONS LIST RIGHT */}
            <ul className="meta wclr rtl">
              <li>
                <Link onClick={verifyAccount}>VERIFY PHONE</Link>
              </li>
              {/* <li>
                  <Link to='/commingsoon' >FINE STORE</Link>
                </li> */}
            </ul>
          </div>
        </div>
      </div>
      {/*
			=========================================
				SECOND ROW
			=========================================
	  		*/}
      <PhoneVerificationModal
        isOpen={isPhoneVerificationModalOpen}
        closeModal={closePhoneVerificationModal}
        phone={phone}
        verifyPin={verifyPin}
        sendVerificationCode={sendVerificationCode}
      />
      <EnterPhoneModal
        isOpen={isPhoneModalOpen}
        setIsOpen={setIsPhoneModalOpen}
        onSubmit={(loginId) => {
          onPhoneSubmit(loginId);
        }}
      />
    </>
  );
}
