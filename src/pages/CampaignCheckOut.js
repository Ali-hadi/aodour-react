import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/CheckOut.css";
import { Link, Redirect, useHistory } from "react-router-dom";
import RightSection from "../components/CheckOut/RightSection";
import LeftSection from "../components/CheckOut/LeftSection";
import {
  POST_CHECKOUT_REQUEST,
  GET_CITIES_LISTINGS,
  POST_VERIFY_STOCK,
  POST_VERIFY_PHONE,
  GET_FREE_GIFTS,
} from "../constants/actionTypes";
import PaymentMethod from "../constants/paymentMethods";
import { isMobile } from "react-device-detect";
import {
  emptyCartData,
  getUserToken,
  isUserLoggedIn,
  showCampaignNotification,
} from "../util";
import { fbqTrack } from "../util/FacebookAnalytics";
import { Helmet } from "react-helmet";
import { emailformat, phoneformat, nameFormat } from "../util";
import Loader from "../components/Loader/compnentLoader";
import moment from "moment";

// const OfferCard1 = "https://storage.googleapis.com/aodour_v1/campaign_images/Notification2.png";
// const OfferCard2 = "https://storage.googleapis.com/aodour_v1/campaign_images/Notification3.png";
const OfferCard1 = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/Notification2.png";
const OfferCard2 = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/Notification1.png";
const DiscountBanner = "https://storage.googleapis.com/aodour_v1/website/campain/discount_banner.jpg";
const FreeGiftModal  = "https://storage.googleapis.com/aodour_v1/website/FreeGiftModal";

const CampaignOfferCard = "../components/Campaign/CampaignOfferCard";

let fieldErrors = {
  nameError: false,
  addressError: false,
  emailError: false,
  phoneError: false,
  cityError: false,
};

export default function CheckOut() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    cartList,
    checkoutCities,
    checkoutResponse,
    verifyStockResponse,
    verifyPhoneResponse,
    freeGifts,
  } = useSelector((state) => state);
  const [freeGift, setFreeGift] = useState({});
  const [isFreeGiftModalOpen, setIsFreeGiftModalOpen] = useState(false);

  const [userData, setUserData] = useState({});
  const [isUserValidated, setUserValidated] = useState(false);
  const [checkoutSuccessful, setCheckoutSuccessful] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  // const PaymentMethod = {
  //   CASH_ON_DELIVERY: "cash_on_delivery",
  //   DEBIT_CREDIT_CARD: "debit_credit_card",
  //   BANK_TRANSFER: "bank_transfer"
  // }

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState(0);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    PaymentMethod.CASH_ON_DELIVERY
  );
  const [cityId, setCityId] = useState(0);
  const [isCheckoutRequest, setIsCheckoutRequest] = useState(false);
  const [cartListEmptyError, setCartListEmptyError] = useState(false);

  const [errors, setErrors] = useState({
    nameError: false,
    addressError: false,
    emailError: false,
    phoneError: false,
    cityError: false,
  });

  const { user } = useSelector((state) => state);

  useEffect(() => {
    // console.log(freeGifts);
    if (freeGifts.productAboveFiveThousand) {
      if (totalPrice() >= 5000) {
        if (!(freeGift && freeGift.id) || freeGift.onPriceAbove === 3000) {
          setFreeGift(
            freeGifts["productAboveFiveThousand"]
              ? {
                  ...freeGifts["productAboveFiveThousand"][0],
                  onPriceAbove: 5000,
                }
              : {}
          );
          setIsFreeGiftModalOpen(true);
        }
        // setShowCard(false);
      } else if (totalPrice() >= 3000) {
        if (!(freeGift && freeGift.id)) {
          setFreeGift(
            freeGifts["productAboveThreeThousand"]
              ? {
                  ...freeGifts["productAboveThreeThousand"][0],
                  onPriceAbove: 3000,
                }
              : {}
          );
          setIsFreeGiftModalOpen(true);
        } else if (freeGift.onPriceAbove === 5000) {
          setFreeGift(
            freeGifts["productAboveThreeThousand"]
              ? {
                  ...freeGifts["productAboveThreeThousand"][0],
                  onPriceAbove: 3000,
                }
              : {}
          );
        }
        // setShowCard(false);
      } else {
        setIsFreeGiftModalOpen(false);
        setFreeGift({});
      }
    }
  }, [freeGifts, cartList]);

  useEffect(() => {
    if (user.id) {
      if (user.address && user.address.length > 0) {
        const defaultAddress = user.address.find((obj) => obj.default === 1);

        if (defaultAddress) {
          setName(
            `${defaultAddress.first_name} ${
              defaultAddress.last_name ? defaultAddress.last_name : ""
            }`.trim()
          );
          setPhone(defaultAddress.phone ? defaultAddress.phone : "");
          setEmail(user.email ? user.email : "");
          setAddress(defaultAddress.address);
          setCity(defaultAddress.city_id);
        }
      }
    }
  }, [user]);

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
        callback: () => setSubmitDisabled(false),
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

  const validateFields = () => {
    validateName(name);
    validateAddress(address);
    validateEmail(email);
    validatePhone(phone);
    validateCity(city);
  };

  const getPrice = (product) => {
    if (
      product.discountPercentage > 0 &&
      moment().isSameOrAfter(product.discountStartTime, ) &&
      moment().isSameOrBefore(product.discountEndTime)
    ) {
      return Math.round(product.price - product.discountPrice);
    } else {
      return Math.round(product.price);
    }
  };

  const totalPrice = () => {
    let sum = 0;
    for (const product of cartList) {
      sum = sum + getPrice(product) * product.qty;
    }
    return sum;
  };

  const handleCheckout = () => {
    setSubmitDisabled(true);
    validateFields();
    const {
      nameError,
      emailError,
      phoneError,
      addressError,
      cityError,
    } = fieldErrors;
    if (cartList.length > 0) {
      if (
        !nameError &&
        !emailError &&
        !phoneError &&
        !addressError &&
        !cityError
      ) {
        setIsCheckoutRequest(true);
        dispatch({
          type: POST_VERIFY_STOCK,
          cartList: cartList,
          callback: () => setSubmitDisabled(false),
        });
      } else {
        setSubmitDisabled(false);
      }
    } else {
      setCartListEmptyError(true);
      setSubmitDisabled(false);
    }
  };

  useEffect(() => {
    fieldErrors = { ...fieldErrors, phoneError: false };
    setErrors(fieldErrors);
  }, [verifyPhoneResponse]);

  useEffect(() => {
    dispatch({ type: GET_CITIES_LISTINGS });
    setSubmitDisabled(true);
    dispatch({
      type: GET_FREE_GIFTS,
      callback: () => {
        setSubmitDisabled(false);
        if (totalPrice() < 3000) {
          // showCampaignNotification(cartList, 5000);
        }
      },
    });
    if (cartList.length > 0) {
      dispatch({
        type: POST_VERIFY_STOCK,
        cartList: cartList,
      });
    }
    fbqTrack("InitiateCheckout", {
      content_ids: [getSkus()],
      content_id: getSkus(),
      content_type: "product",
    });
  }, []);

  // eslint-disable-next-line no-lone-blocks
  const getSkus = () => {
    return cartList.map((item) => item.sku);
  };

  useEffect(() => {
    if (checkoutResponse.data && checkoutResponse.data !== "") {
      setCheckoutSuccessful(true);
    }
  }, [checkoutResponse]);

  const getAddressId = (address, cityId) => {
    if (user && user.address && user.address.length > 0) {
      const addressFound = user.address.find(
        (addressObj) =>
          addressObj.address === address && addressObj.city_id === cityId
      );
      return addressFound ? addressFound.id : "";
    } else {
      return "";
    }
  };

  const getFreeGift = () => {
    return {
      id: freeGift.variations[0].id,
      title: freeGift.variations[0].productVariationName,
      images: freeGift.variations[0].image,
      price: 0,
      availableQuantity: freeGift.variations[0].availableStock,
      sku: freeGift.variations[0].sku,
      rating: freeGift.rating,
      discountPercentage: freeGift.variations[0].discountPercentage,
      discountPrice: freeGift.variations[0].discountPrice,
      brandSlug: freeGift.brandSlug,
      variationSlug: freeGift.variations[0].slug,
      totalComments: freeGift.totalComments,
      productName: freeGift.name,
      qty: 1,
      attributes: freeGift.variations[0].attributes,
      categoryName: freeGift.subSubCategoryName,
      discountEndTime: freeGift.variations[0].discountEndTime,
      discountStartTime: freeGift.variations[0].discountStartTime,
      freeGift: 1,
    };
  };

  const getCartList = () => {
    if (freeGift && freeGift.id) {
      return [...cartList, getFreeGift()];
    } else {
      return cartList;
    }
  };

  const getDeliveryCharges = () => {
    if (totalPrice() >= 3000) {
      return 0;
    }
    return 200;
  };

  useEffect(() => {
    if (verifyStockResponse.length < 1 && isCheckoutRequest) {
      setSubmitDisabled(true);
      dispatch({
        type: POST_CHECKOUT_REQUEST,
        payload: {
          cartList: getCartList(),
          userData: {
            name: name,
            address: address,
            cityId: city,
            phone: phone,
            email: email,
            customerId: isUserLoggedIn()
              ? getUserToken()
              : verifyPhoneResponse.customer_id,
            customerAddressId: getAddressId(address, city),
          },
          orderDetails: {
            paymentMethod: paymentMethod,
            subtotal: totalPrice(),
            deliveryCharges: getDeliveryCharges(),
            offerDiscount: 0,
            totalPayableAmount: totalPrice() + getDeliveryCharges(),
            source: isMobile ? "MobileWebsite" : "Website",
            checkoutType: "cart",
          },
        },
        callback: () => {
          setSubmitDisabled(false);
          history.push("/thankyou");
        },
        errorCallback: () => {
          setSubmitDisabled(false);
        },
      });
      setIsCheckoutRequest(false);
    }
  }, [verifyStockResponse]);

  return (
    <>
      <Helmet>
        <title>
          Compaign Checkout
        </title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta
          name="description"
          content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery."
        />
      </Helmet>
      <Loader loading={submitDisabled} />
      <section className="relative">
        <div className="container responsive_cls">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12">
              {/* <CampaignOfferCard
                showCard={showCard}
                setShowCard={setShowCard}
                image={OfferCard2}
              /> */}
              <LeftSection
                setFields={{
                  setName,
                  setEmail,
                  setPhone,
                  setAddress,
                  setCity,
                  setPaymentMethod,
                }}
                setCityId={setCityId}
                fields={{
                  name,
                  email,
                  phone,
                  address,
                  city,
                  paymentMethod,
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
                title={"Shipping Info"}
              />
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <RightSection
                cartList={cartList}
                freeGift={freeGift}
                cartListEmptyError={cartListEmptyError}
                handleCheckout={handleCheckout}
                outOfStockProducts={verifyStockResponse}
                totalPrice={totalPrice}
                setSubmitDisabled={setSubmitDisabled}
                submitDisabled={submitDisabled}
                getDeliveryCharges={getDeliveryCharges}
              />
            </div>
          </div>
        </div>
      </section>
      <FreeGiftModal
        isOpen={isFreeGiftModalOpen}
        setIsOpen={setIsFreeGiftModalOpen}
        product={freeGift}
      />
    </>
  );
}
