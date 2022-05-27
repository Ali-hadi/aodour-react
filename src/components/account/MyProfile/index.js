import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import PhoneVerificationModal from "../PhoneVerificationModal";
import {
  POST_VERIFY_PIN,
  GET_USER_PROFILE,
  POST_SEND_PIN,
  POST_EDIT_USER_PROFILE,
  POST_RESET_PASSWORD,
} from "../../../constants/actionTypes";
import { getUserToken } from "../../../util";
import EnterPhoneModal from "../EnterPhoneModal";
import ResetPassword from "./ResetPassword";
import notification from "../../Notification";
import Loader from "../../Loader/compnentLoader";
const UserImage = "https://storage.googleapis.com/aodour_v1/website/user_image.png";
export default function Profile({
  setOpenAddress,
  setEditInfo,
  user: {
    id,
    image,
    address,
    first_name: firstName,
    last_name: lastName,
    email,
    date_of_birth: dateOfBirth,
    phone,
    phone_verified_at,
    gender,
    password,
  },
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [
    isPhoneVerificationModalOpen,
    setIsPhoneVerificationModalOpen,
  ] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(
    false
  );

  const closePhoneVerificationModal = () => {
    setIsPhoneVerificationModalOpen(false);
  };

  const getAddress = () => {
    const temp = address.find((a) => a.default === 1);
    if (temp) {
      return `${temp.address}, ${temp.city_name} \n${temp.phone}`;
    }
    return "";

    // let addresses = "";

    // for (const addr of address) {
    //   addresses =
    //     addresses +
    //     `${addr.address}, ${addr.city_name} \n${addr.phone}\t${
    //       addr.default === 1 ? "default" : ""
    //     }\n\n`;
    // }

    // return addresses;
  };

  const isUserVerified = () => {
    if (id) {
      if (phone_verified_at) {
        return true;
      }
      return false;
    }
    return true;
  };

  const verifyPin = (phone, pin) => {
    setLoading(true);
    dispatch({
      type: POST_VERIFY_PIN,
      payload: { code: pin, phone: phone },
      callback: (response, status) => {
        setLoading(false);
        if (status === "success") {
          dispatch({
            type: GET_USER_PROFILE,
            userId: getUserToken(),
          });
          setIsPhoneVerificationModalOpen(false);
          notification({
            message: "Verification Successful",
            error: false,
          });
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
    setLoading(true);
    dispatch({
      type: POST_SEND_PIN,
      payload: { phone: to },
      callback: () => setLoading(false),
    });
  };

  const onPhoneSubmit = (loginId) => {
    setLoading(true);
    dispatch({
      type: POST_EDIT_USER_PROFILE,
      payload: {
        name: `${firstName} ${lastName ? lastName : ""}`,
        email,
        phone: loginId,
        gender,
        dob: dateOfBirth,
      },
      callback: (response, status) => {
        setLoading(false);
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
      <Loader loading={loading} />
      <div className="align-center">
        <div className="profile_info">
          <span className="edit" onClick={() => setEditInfo(true)}>
            <i className="fa fa-pencil" aria-hidden="true"></i>edit
          </span>
          <figure>
            <img
              src={image && image !== "" ? image : UserImage}
              alt="profile"
            />
          </figure>
          <div className="user_information">
            <h5>{`${firstName ? firstName : ""} ${
              lastName ? lastName : ""
            }`}</h5>
            <h6>
              <span>Email:</span>
              {email ? email : "Not Set"}
            </h6>
            <h6 className="non_res">
              <span>Mobile:</span>
              {phone ? (
                phone
              ) : (
                <Link
                  style={{
                    color: "#e23c52",
                    fontSize: "12px",
                    marginLeft: "10px",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  onClick={() => setIsPhoneModalOpen(true)}
                >
                  click to add phone
                </Link>
              )}{" "}
              {phone && !isUserVerified() ? (
                <Link
                  style={{
                    color: "#e23c52",
                    fontSize: "12px",
                    marginLeft: "10px",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                  onClick={() => setIsPhoneVerificationModalOpen(true)}
                >
                  click to verify phone
                </Link>
              ) : (
                ""
              )}
            </h6>
            <h6 className="non_res">
              <span>Date of birth:</span>
              {dateOfBirth
                ? moment(dateOfBirth).format("MM/DD/YYYY")
                : "Not Set"}
            </h6>
            {phone && phone !== "" && password && password !== "" && (
              <Link
                className="non_res"
                onClick={() => setIsResetPasswordModalOpen(true)}
              >
                change password
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="address_padding">
        <div className="box_information non_res">
          <span className="edit" onClick={() => setOpenAddress(true)}>
            <i className="fa fa-pencil" aria-hidden="true"></i>add new Addresses
          </span>
          <h5>
            <i className="fa fa-home"></i>Default Address
          </h5>
          <textarea
            placeholder="No Address Found"
            value={address && address.length > 0 ? getAddress() : ""}
          ></textarea>
        </div>
      </div>
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
      <ResetPassword
        isOpen={isResetPasswordModalOpen}
        setIsOpen={setIsResetPasswordModalOpen}
        resetStates={() => {}}
      />
    </>
  );
}
