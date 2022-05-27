import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import {
  GET_CITIES_LISTINGS,
  POST_VERIFY_PHONE,
} from "../../../constants/actionTypes";
import { validatePhone, validateName } from "../../../util";
export default function Profile({
  isOpen,
  onClose,
  addNewAddress,
  forEdit,
  selectedAddress,
}) {
  const { checkoutCities, user } = useSelector((state) => state);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(false);

  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState(false);

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(false);

  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState(false);

  const [isPrimary, setIsPrimary] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: GET_CITIES_LISTINGS,
    });
  }, []);

  const resetStates = () => {
    setName("");
    setPhone("");
    setCity("");
    setAddress("");
    setIsPrimary(false);
    setNameError(false);
    setPhoneError(false);
    setAddressError(false);
    setCityError(false);
  };

  const verifyPhoneCall = (value, callback) => {
    dispatch({
      type: POST_VERIFY_PHONE,
      payload: value,
      callback: callback
        ? callback
        : (response, status) => {
            if (status === "fail" || response.result.customer_id !== "") {
              setPhoneError(true);
            } else {
              setPhoneError(false);
            }
          },
    });
  };

  const verifyPhone = (value, callback) => {
    if (value !== user.phone) {
      // if (validatePhone(value, setPhoneError)) {
      //   verifyPhoneCall(value, callback);
      // }
      validatePhone(value, setPhoneError);
    } else {
      setPhoneError(false);
      if (callback) callback({ result: { customer_id: "" } }, "success");
    }
  };

  const validateAddress = (value, setError) => {
    if (value === "") {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const validateCity = (value, setError) => {
    if (value === "") {
      setError(true);
      return false;
    } else {
      setError(false);
      return true;
    }
  };

  const validateFields = () => {
    if (
      validateName(name, setNameError) &&
      validatePhone(phone, setPhoneError) &&
      validateAddress(address, setAddressError) &&
      validateCity(city, setCityError)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const addAddress = () => {
    if (validateFields()) {
      addNewAddress(
        forEdit ? selectedAddress.id : undefined,
        name,
        city,
        phone,
        address,
        isPrimary ? 1 : 0,
        forEdit ? false : true
      );
    }
  };

  const setFields = () => {
    if (forEdit && selectedAddress) {
      setAddress(selectedAddress.address);
      setPhone(selectedAddress.phone);
      setCity(selectedAddress.city_id);
      setName(
        `${selectedAddress.first_name} ${
          selectedAddress.last_name ? selectedAddress.last_name : ""
        }`
      );
      setIsPrimary(selectedAddress.default === 1 ? true : false);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onAfterClose={() => resetStates()}
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
          <div className="text-felid">
            <label style={cityError ? { color: "red" } : {}}>
              <sup>*</sup>SelectCity{" "}
              {cityError && <span>must select city</span>}
            </label>
            <div className="text-select">
              <select
                value={city}
                onChange={({ target: { value } }) => {
                  setCity(value);
                  if (value !== "") {
                    setCityError(false);
                  } else {
                    setCityError(true);
                  }
                }}
              >
                <option value="">city</option>
                {checkoutCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-felid">
            <label style={nameError ? { color: "red" } : {}}>
              <sup>*</sup>Name{" "}
              {nameError && <span>must be at least 3 characters</span>}
            </label>
            <input
              type="text"
              placeholder="xxxx xxxxxxx "
              onChange={({ target: { value } }) => setName(value)}
              value={name}
              onBlur={({ target: { value } }) => {
                if (value.length < 3) setNameError(true);
                else setNameError(false);
              }}
            />
          </div>
          <div className="text-felid">
            <label style={phoneError ? { color: "red" } : {}}>
              <sup>*</sup>Phone Number{" "}
              {phoneError && (
                <span>Invalid format or phone already registered</span>
              )}{" "}
            </label>
            <input
              type="text"
              placeholder="xxx xxxxxxx "
              value={phone}
              onChange={({ target: { value } }) => setPhone(value)}
              onBlur={({ target: { value } }) => verifyPhone(value)}
            />
          </div>
          <div className="textarea">
            <textarea
              placeholder="*Address"
              onBlur={({ target: value }) => {
                if (value === "") setAddressError(true);
                else setAddressError(false);
              }}
              value={address}
              onChange={({ target: { value } }) => setAddress(value)}
            ></textarea>
          </div>
          <div className="check_colors ">
            <input
              id="xyz"
              type="checkbox"
              placeholder=""
              name=""
              value=""
              checked={isPrimary}
              onChange={({ target: { checked } }) => setIsPrimary(checked)}
            />
            <label for="xyz">
              <span className="bg1"></span>Use this as my default Shipping Address
            </label>
          </div>
          <Link className="btn-normal2 fullwidth at_bg2" onClick={addAddress}>
            {forEdit ? "Update Address" : "add address"}
          </Link>
        </div>
      </Modal>
    </>
  );
}
