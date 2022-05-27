import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import LeftSection from "../CheckOut/LeftSection";
import {
  POST_VERIFY_PHONE,
  POST_CHECKOUT_REQUEST,
  POST_NOTIFY_ME,
} from "../../constants/actionTypes";
import { isMobile } from "react-device-detect";
import PaymentMethods from "../../constants/paymentMethods";
import { emailformat, phoneformat, nameFormat } from "../../util";
import Loader from "../Loader/compnentLoader";
import notification from "../Notification";
Modal.setAppElement("#root");

let fieldErrors = {
  nameError: false,
  addressError: false,
  emailError: false,
  phoneError: false,
  cityError: false,
};

const NotifyMeModal = ({ isOpen, setIsOpen, selectedProduct}) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cityId, setCityId] = useState(0);
  const [errors, setErrors] = useState({
    nameError: false,
    addressError: false,
    emailError: false,
    phoneError: false,
    cityError: false,
  });

  const { checkoutCities, verifyPhoneResponse, notifyMeResponse } = useSelector(
    (state) => state
  );

  const dispatch = useDispatch();

  const validateName = (text) => {
    if (!text.match(nameFormat) || text.length < 3) {
      fieldErrors = { ...fieldErrors, nameError: true };
      setErrors(fieldErrors);
      return false;
    } else {
      fieldErrors = { ...fieldErrors, nameError: false };
      setErrors(fieldErrors);
      return true;
    }
  };

  const validateAddress = (text) => {
    if (text && text !== "") {
      fieldErrors = { ...fieldErrors, addressError: false };
    } else {
      fieldErrors = { ...fieldErrors, addressError: true };
    }
    setErrors(fieldErrors);
  };

  const validateEmail = (text) => {
    if (text && text !== "" && text.match(emailformat)) {
      fieldErrors = { ...fieldErrors, emailError: false };
    } else {
      fieldErrors = { ...fieldErrors, emailError: true };
    }
    setErrors(fieldErrors);
  };

  const validatePhone = (text) => {
    if (text && text !== "" && text.match(phoneformat)) {
      dispatch({
        type: POST_VERIFY_PHONE,
        payload: text,
      });
    } else {
      fieldErrors = { ...fieldErrors, phoneError: true };
    }
    setErrors(fieldErrors);
  };

  const validateCity = (value) => {
    if (value == 0) {
      fieldErrors = { ...fieldErrors, cityError: true };
    } else {
      fieldErrors = { ...fieldErrors, cityError: false };
    }
    setErrors(fieldErrors);
  };

  useEffect(() => {
    fieldErrors = { ...fieldErrors, phoneError: false };
    setErrors(fieldErrors);
  }, [verifyPhoneResponse]);

  useEffect(() => {
    setIsOpen(false);
    emptyStates();
  }, [notifyMeResponse]);

  const emptyStates = () => {
    setName("");
    setAddress("");
    setCity(null);
    setCityId(0);
    setPhone("");
    setEmail("");
  };

  const validateFields = () => {
    validateName(name);
    validateAddress(address);
    validateEmail(email);
    validatePhone(phone);
    validateCity(city);
    setLoading(false);
  };

  const notifyMe = () => {
    validateFields();
    const {
      nameError,
      emailError,
      phoneError,
      addressError,
      cityError,
    } = fieldErrors;

    if (
      !nameError &&
      !emailError &&
      !phoneError &&
      !addressError &&
      !cityError
    ) {
      setLoading(true);
      dispatch({
        type: POST_NOTIFY_ME,
        payload: {
          userData: {
            name: name,
            address: address,
            cityId: city,
            phone: phone,
            email: email,
            customerId: verifyPhoneResponse.customer_id
              ? verifyPhoneResponse.customer_id
              : null,
          },
          productDetail: {
            productId: selectedProduct.product_id,
            variationId: selectedProduct.id,
          },
        },
        callback: () => {
          setIsOpen(false);
          emptyStates();
          setLoading(false);
          notification({
            message: "Thank you, your pre order request has been placed.",
          });
        },
        errorCallback: () => {
          setLoading(false);
          notification({ message: "request not sent" });
        },
      });
    }
  };

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      className={"quick_model "}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick={true}
    >
      <div className="modal-dialog" role="document">
        <Loader loading={loading} />
        <div className="modal-content">
          <button
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <span className="cross-btn icon-close" data-dismiss="modal"></span>
            {/* CLOSE BUTTON */}
          </button>
          <LeftSection
            setFields={{
              setName,
              setEmail,
              setPhone,
              setAddress,
              setCity,
            }}
            setCityId={setCityId}
            fields={{
              name,
              email,
              phone,
              address,
              city,
              checkoutCities,
            }}
            fieldErrors={errors}
            setFieldErrors={setErrors}
            validations={{
              validateName,
              validateAddress,
              validatePhone,
              validateEmail,
              validateCity,
            }}
            isModal={true}
            title={"Pre Order"}
            type='preorder'
          />
          <div className="button-center">
            <button
              className="btn-normal at_bg2"
              onClick={notifyMe}
              disabled={loading}
            >
              Place Pre Order
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default NotifyMeModal;
