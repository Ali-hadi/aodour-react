import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import LeftSection from "../CheckOut/LeftSection";
import {
  POST_VERIFY_PHONE,
  POST_CHECKOUT_REQUEST,
} from "../../constants/actionTypes";
import { isMobile } from "react-device-detect";
import PaymentMethods from "../../constants/paymentMethods";
import Loader from "../Loader/compnentLoader";
import { emailformat, phoneformat, nameFormat } from "../../util";
import notification from "../Notification";
import {savyourOrderPlace} from "../../util/savyour"
Modal.setAppElement("#root");

let fieldErrors = {
  nameError: false,
  addressError: false,
  emailError: false,
  phoneError: false,
  cityError: false,
};

const QuickBuyModal = ({
  isOpen,
  setIsOpen,
  selectedProduct,
  openThankYouModal,
}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
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

  const {
    cartList,
    checkoutCities,
    verifyPhoneResponse,
    checkoutResponse,
    freeGifts: { freeGifts, brandSlug },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  // const getFreeGift = () => {
  //   return {
  //     id: freeGifts[0].variations[0].id,
  //     title: freeGifts[0].variations[0].productVariationName,
  //     images: freeGifts[0].variations[0].image,
  //     price: 0,
  //     availableQuantity: freeGifts[0].variations[0].availableStock,
  //     sku: freeGifts[0].variations[0].sku,
  //     rating: freeGifts[0].rating,
  //     discountPercentage: freeGifts[0].variations[0].discountPercentage,
  //     discountPrice: freeGifts[0].variations[0].discountPrice,
  //     brandSlug: freeGifts[0].brandSlug,
  //     variationSlug: freeGifts[0].variations[0].slug,
  //     totalComments: freeGifts[0].totalComments,
  //     productName: freeGifts[0].name,
  //     qty: 1,
  //     attributes: freeGifts[0].variations[0].attributes,
  //     categoryName: freeGifts[0].subSubCategoryName,
  //     discountEndTime: freeGifts[0].variations[0].discountEndTime,
  //     discountStartTime: freeGifts[0].variations[0].discountStartTime,
  //     freeGift: 1,
  //   };
  // };

  const getCartList = (product) => {
    // if (freeGifts && freeGifts[0].id) {
    //   if (brandSlug === product.brand_slug) {
    //     return [product, getFreeGift()];
    //   } else {
    //     return [product];
    //   }
    // } else {
    //   return [product];
    // }
    return [product];
  };

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

  useEffect(() => {
    fieldErrors = { ...fieldErrors, phoneError: false };
    setErrors(fieldErrors);
  }, [verifyPhoneResponse]);

  const validateFields = () => {
    validateName(name);
    validateAddress(address);
    validateEmail(email);
    validatePhone(phone);
    validateCity(city);
  };

  const validateCity = (value) => {
    if (value === null) {
      fieldErrors = { ...fieldErrors, cityError: true };
    } else {
      fieldErrors = { ...fieldErrors, cityError: false };
    }
    setErrors(fieldErrors);
  };

  const totalPrice = () => {
    return selectedProduct.price * selectedProduct.qty;
  };

  const emptyStates = () => {
    setName("");
    setAddress("");
    setCity(null);
    setCityId(0);
    setPhone("");
    setEmail("");
    setLoading(false);
  };


  useEffect(() => {
    if(checkoutResponse.totalpayableamount){
      savyourOrderPlace(checkoutResponse, getCartList(selectedProduct))
    }

  }, [checkoutResponse])

  const handleCheckout = () => {
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
        type: POST_CHECKOUT_REQUEST,
        payload: {
          cartList: getCartList(selectedProduct),
          userData: {
            name: name,
            address: address,
            cityId: city,
            phone: phone,
            email: email,
            customerId: verifyPhoneResponse.customer_id,
          },
          beloved: {},
          isBeloved: false,
          orderDetails: {
            paymentMethod: PaymentMethods.CASH_ON_DELIVERY,
            subtotal: totalPrice(),
            deliveryCharges: 200,
            // deliveryCharges: totalPrice() >= 2000 ? 0 : 200,
            offerDiscount: 0,
            totalPayableAmount: totalPrice() + 200,
            // totalPayableAmount: totalPrice() + totalPrice() >= 2000 ? 0 : 200,
            source: isMobile ? "MobileWebsite" : "Website",
            checkoutType: "quick_buy",
            discounted_amount: 0,
          },
        },
        callback: () => {
          setIsOpen(false);
          emptyStates();
          openThankYouModal();
          // notification({ message: "Thank you, your order has been placed." });
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
            title={"Shipping Info"}
          />
          <div className="button-center">
            <button className="btn-normal at_bg2" onClick={handleCheckout}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QuickBuyModal;
