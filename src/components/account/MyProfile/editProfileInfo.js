import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-modal";
import moment from "moment";
import {
  POST_VERIFY_PHONE,
  POST_UPLOAD_PROFILE_IMAGE,
  GET_USER_PROFILE,
} from "../../../constants/actionTypes";
import {
  validatePhone,
  validateEmail,
  validateName,
  getUserToken,
} from "../../../util";
import { object } from "prop-types";
import notification from "../../Notification";
const UserImage = "https://storage.googleapis.com/aodour_v1/website/user_image.png";
export default function Profile({ isOpen, onClose, update }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("female");

  const [nameError, setNameError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const { user } = useSelector((state) => state);

  const [image, setImage] = useState("");

  const [imageLoading, setImageLoading] = useState(false);

  const dispatch = useDispatch();

  const resetStates = () => {
    setNameError(false);
    setPhoneError(false);
    setEmailError(false);
    setDobError(false);
    setImageLoading(false);
  };

  // const verifyPhoneCall = (value, callback) => {
  //   dispatch({
  //     type: POST_VERIFY_PHONE,
  //     payload: value,
  //     callback: callback
  //       ? callback
  //       : (response, status) => {
  //           if (status === "fail" || response.result.customer_id !== "") {
  //             setPhoneError(true);
  //           } else {
  //             setPhoneError(false);
  //           }
  //         },
  //   });
  // };

  // const verifyPhone = (value, callback) => {
  //   if (value !== user.phone) {
  //     // if (validatePhone(value, setPhoneError)) {
  //     //   verifyPhoneCall(value, callback);
  //     // }
  //     if (validatePhone(value, setPhoneError)) {
  //       if (callback) callback({ result: { customer_id: "" } }, "success");
  //     }
  //   } else {
  //     setPhoneError(false);
  //     if (callback) callback({ result: { customer_id: "" } }, "success");
  //   }
  // };

  const verifyEmail = (value, callback) => {
    validateEmail(value, setEmailError);
  };

  const setFields = () => {
    setName(
      `${user.first_name ? user.first_name : ""} ${
        user.last_name ? user.last_name : ""
      }`
    );
    setEmail(user.email);
    setPhone(user.phone);
    if (user.date_of_birth && user.date_of_birth !== "") {
      setDob(moment(user.date_of_birth).format("YYYY-MM-DD"));
    }
    if (user.gender && user.gender !== "") {
      setGender(user.gender);
    }
    setImage(user.image);
  };

  // const getDate = () => {
  //   const month = dob ? dob.split("/")[0] : "";
  //   const date = dob ? dob.split("/")[1] : "";
  //   const year = dob ? dob.split("/")[2] : "";
  //   return `${year}-${month}-${date}`;
  // };

  const validateDob = (value, setError) => {
    if (dob !== "") {
      if (moment(value) > moment()) {
        setError(true);
        return false;
      } else {
        setError(false);
        return true;
      }
    } else {
      setError(false);
      return true;
    }
  };

  const validateFields = () => {
    if (
      validateName(name, setNameError) &&
      validateEmail(email, setEmailError) &&
      validatePhone(phone, setPhoneError) &&
      validateDob(dob, setDobError)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const updateProfile = () => {
    if (validateFields()) {
      update(name, email, phone, dob, gender, image);
    }
  };

  const uploadImage = (file) => {
    setImageLoading(true);
    dispatch({
      type: POST_UPLOAD_PROFILE_IMAGE,
      payload: { file },
      callback: (response, status) => {
        setImageLoading(false);
        if (status === "success") {
          setImage(response.result.data.url);
        } else {
          notification({
            message: "Something went wrong try again",
            error: true,
          });
        }
      },
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => {
          resetStates();
          onClose();
        }}
        onAfterOpen={setFields}
        shouldCloseOnOverlayClick={true}
        className={"accountpage_info"}
      >
        <div className="information_model">
          <span
            className="cross-btn icon-close"
            data-dismiss="modal"
            onClick={() => {
              resetStates();
              onClose();
            }}
          ></span>
          <figure>
            <input
              type="file"
              id="img_upload"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
            <label for="img_upload">
              <img
                src={image && image !== "" ? image : UserImage}
                alt="profile"
              />
              <span className="fa fa-camera"></span>
              {imageLoading && <i className="fa fa-spinner fa-spin"></i>}
            </label>
          </figure>
          <div className="text-felid">
            <label style={nameError ? { color: "red" } : {}}>
              <sup>*</sup>Full Name{" "}
              {nameError && <span>must be at least 3 characters</span>}
            </label>
            <input
              className={nameError ? "error" : ""}
              type="text"
              placeholder="xxxxxxxxx"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              onBlur={({ target: { value } }) => {
                if (value.length < 3) setNameError(true);
                else setNameError(false);
              }}
            />
          </div>
          <div className="text-felid">
            <label style={phoneError ? { color: "red" } : {}}>
              <sup>*</sup>Phone Number{" "}
              {phoneError && <span>Invalid format</span>}{" "}
            </label>
            <input
              className={phoneError ? "error" : ""}
              type="text"
              placeholder="03xxxxxxxxx "
              value={phone}
              onChange={({ target: { value } }) => setPhone(value)}
              onBlur={({ target: { value } }) =>
                validatePhone(value, setPhoneError)
              }
            />
          </div>
          <div className="text-felid">
            <label style={emailError ? { color: "red" } : {}}>
              <sup>*</sup>E-mail Address{" "}
              {emailError && <span>Invalid Format</span>}
            </label>
            <input
              className={emailError ? "error" : ""}
              type="email"
              placeholder="xxxx@xyz.com"
              value={email}
              onChange={({ target: { value } }) => setEmail(value)}
              onBlur={({ target: { value } }) => verifyEmail(value)}
            />
          </div>
          <div className="text-felid">
            <label style={dobError ? { color: "red" } : {}}>
              DOB {dobError && <span>Invalid Date</span>}
            </label>
            <input
              className={dobError ? "error" : ""}
              type="date"
              placeholder="mm/dd/yyyy"
              value={dob}
              onChange={({ target: { value } }) => {
                if (value && value !== "") {
                  setDob(moment(value).format("YYYY-MM-DD"));
                } else {
                  setDob(value);
                }
              }}
              onBlur={({ target: { value } }) => {
                if (value && value !== "") {
                  if (moment(value) > moment()) setDobError(true);
                  else setDobError(false);
                } else {
                  setDobError(false);
                }
              }}
            />
          </div>
          <ul className="gender_tab">
            <li>
              <span>Gender:</span>
            </li>
            <li>
              <div className="checkbox_select">
                <input
                  type="radio"
                  name="ab"
                  value=""
                  id="male"
                  checked={gender === "male"}
                  onClick={() => setGender("male")}
                />
                <label for="male">
                  <i className="fa fa-mars"></i>Male
                </label>
              </div>
            </li>
            <li>
              <div className="checkbox_select">
                <input
                  type="radio"
                  name="ab"
                  value=""
                  id="female"
                  checked={gender === "female"}
                  onClick={() => setGender("female")}
                />
                <label for="female">
                  <i className="fa fa-venus"></i>Female
                </label>
              </div>
            </li>
          </ul>
          <Link className="btn-normal2 at_bg2" onClick={() => updateProfile()}>
            update details
          </Link>
        </div>
      </Modal>
    </>
  );
}
