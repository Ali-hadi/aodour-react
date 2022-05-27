import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/CheckOut.css";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import RightSection from "../components/CheckOut/RightSection";
import LeftSection from "../components/CheckOut/LeftSection";
import VariationGrid from "../components/VariationGrid";
import { showCampaignNotification } from "../util"
import { checkStockAvailablity, payNow } from "../redux/sagas"
import notification from "../components/Notification";
import { savyourOrderPlace } from "../util/savyour"
import { getdynamicNumber } from "../util"
import Modal from "../components/Campaign/LandingPageModal"
// import gradient from "../assets/images/11compaign/bground.png";
// import TxtImage2 from "../assets/images/compaign/gift-txt2.png";
import {
  POST_CHECKOUT_REQUEST,
  GET_CITIES_LISTINGS,
  POST_VERIFY_STOCK,
  POST_VERIFY_PHONE,
  GET_FREE_GIFTS,
  GET_CHECKOUT_PRODUCTS,
  GET_SET_CART
} from "../constants/actionTypes";
import PaymentMethod from "../constants/paymentMethods";
import { isMobile } from "react-device-detect";
import { emptyCartData, getUserToken, isUserLoggedIn } from "../util";
import { fbqTrack } from "../util/FacebookAnalytics";
import { Helmet } from "react-helmet";
import { emailformat, phoneformat, nameFormat } from "../util";
import Loader from "../components/Loader/compnentLoader";
import moment from "moment";
import { Prompt } from 'react-router'
// import CardPayment from "../components/CheckOut/payment";
const TxtImage = "https://storage.googleapis.com/aodour_v1/images/compaign/gift-txt.png";
const OfferCard1 =
  "https://storage.googleapis.com/aodour_v1/website/campaign/Offer-card-img1.png";
const OfferCard2 =
  "https://storage.googleapis.com/aodour_v1/website/campaign/Offer-card-img2.png";
const DiscountBanner =
  "https://storage.googleapis.com/aodour_v1/campaign/discount_banner.jpg";
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
  const [userData, setUserData] = useState({});
  const [isUserValidated, setUserValidated] = useState(false);
  const [checkoutSuccessful, setCheckoutSuccessful] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [voucher_code, setVoucher_code] = useState(null);
  const [sessionId, setSessionId] = useState(null);



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
  const [onlyCreditCardPayment, setonlyCreditCardPayment] = useState(false)

  const [transactionId, setTransactionId] = useState(null);
  const [gameDisc, setgameDisc] = useState(0);
  const { slug } = useParams();

  const [errors, setErrors] = useState({
    nameError: false,
    addressError: false,
    emailError: false,
    phoneError: false,
    cityError: false,

  });

  const { user, checkoutProdcuts } = useSelector((state) => state);

  useEffect(() => {
    if (transactionId != null) {
      handleCheckout(transactionId)
    }
  }, [transactionId]);

  useEffect(() => {
    if (sessionId != null) {
      handlePayNow()
    }
  }, [sessionId]);


  useEffect(() => {
    if (freeGifts.freeGifts) {
      let qty = 0;
      for (let item of cartList) {
        qty += item.qty;
      }
      // const found = cartList.find(
      //   (item) => item.brandSlug === freeGifts.brandSlug
      // );
      if (totalPrice() > 3000) {
      // if (qty >= 5 || cartList.some(item => item.extraDiscount)) {
        setFreeGift(freeGifts.freeGifts[0]);
      } else {
        setFreeGift({});
      }
    } else {
      setFreeGift({});
    }

  }, [freeGifts, cartList]);

  const getFreeGift = () => {
    if (freeGift.id)
      return {
        pid: freeGift.variations[0].id,
        id: `free-${freeGift.variations[0].id}`,
        isFreeGift: true,
        title: freeGift.variations[0].productVariationName,
        images: freeGift.variations[0].image,
        price: freeGift.variations[0].price,
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
        free: true,
      };
    return {};
  };

  const getCartList = () => {
    if (freeGift && freeGift.id) {
      // alert(2)
      return [...cartList, getFreeGift()];
    } else {
      return cartList;
    }

    // return cartList;
  };


  function addItemInArr(arr=[], items=[]) {
    for(let pr of items){
      arr.push({...pr, availableQuantity: pr.availableStock, qty: 1,id: pr.productVariationID})
    }
    return arr
  }


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
      setErrors(fieldErrors);
      return true
    } else {
      fieldErrors = { ...fieldErrors, addressError: true };
      setErrors(fieldErrors);
      return false
    }
  };

  const validateEmail = (text) => {
    if (text && text !== "" && text.match(emailformat)) {
      fieldErrors = { ...fieldErrors, emailError: false };
      setErrors(fieldErrors)
      return true
    } else {
      fieldErrors = { ...fieldErrors, emailError: true };
      setErrors(fieldErrors)
      return false
    }
  };

  const validatePhone = (text) => {
    if (text && text !== "" && text.match(phoneformat)) {
      dispatch({
        type: POST_VERIFY_PHONE,
        payload: text,
        callback: () => setSubmitDisabled(false),
      });
      setErrors(fieldErrors);
      return true
    } else {
      fieldErrors = { ...fieldErrors, phoneError: true };
      setErrors(fieldErrors);
      return false
    }
  };

  const validateCity = (value) => {
    if (value == 0) {
      fieldErrors = { ...fieldErrors, cityError: true };
      setErrors(fieldErrors);
      return false
    } else {
      fieldErrors = { ...fieldErrors, cityError: false };
      setErrors(fieldErrors);
      return true
    }
  };


  const validateFields = () => {

    validateName(name);
    validateAddress(address);
    validateEmail(email);
    validatePhone(phone);
    validateCity(city);
  };


  const getPrice = (product) => {
    if (!product.free)
      if (
        (product.discountPercentage > 0 &&
          moment().isSameOrAfter(product.discountStartTime) &&
          moment().isSameOrBefore(product.discountEndTime))
      ) {
        return Math.round(product.price - product.discountPrice);
      } else {
        return Math.round(product.price);
      }
    return 0;
  };

  const totalPrice = () => {
    let sum = 0;
    for (const product of cartList) {
      if (!product.free)
        sum = sum + getPrice(product) * product.qty;
    }
    return sum;
  };

  const getDeliveryCharges = () => {
    
    let qty = 0;
    for (let item of cartList) {
      qty += item.qty;
    }
    // if(qty >=3 || cartList.some(item => item.extraDiscount)) return 0;
    return 200
  }



  const getDiscount = () => {
    let discount = 0;
    // if(cartList.some(item => item.extraDiscount)){
    //   for(let pr of cartList){
    //     if(pr.extraDiscount && pr.extraDiscount.length === 5){
    //       discount = discount + Math.round((pr.price * 10) / 100)
    //     }
    //   }
    // }

    // if (totalPrice() >= 5000) {
    //   discount = discount + 300
    // } else if (totalPrice() >= 3000) {
    //   discount = discount + 200
    // }
    return discount
  }

  const getFlashOfferDiscount = () => {
    let disc = 0;
    // return disc;
    // if (voucher_code != null && voucher_code.toLocaleUpperCase() === "EXTRA10OFF") {
    //   let total = totalPrice() - getDiscount() - getVocherDiscount();
    //   disc = + Math.round((total * 10) / 100)
    // }
    return disc
  }

  useEffect(() => {

    checkPaymentOptions()
    getFlashOfferDiscount()

  }, [cartList])


  const checkPaymentOptions = () => {
    if (cartList.some(item => item.sku === "LPK3474636819706")) {
      setPaymentMethod(PaymentMethod.DEBIT_CREDIT_CARD);
      setonlyCreditCardPayment(true)
    } else {
      setonlyCreditCardPayment(false)
    }
  }

  const handleCheckout = (validate = true) => {
    setSubmitDisabled(true);
    if (validate) validateFields();

    const {
      nameError,
      emailError,
      phoneError,
      addressError,
      cityError,

    } = fieldErrors;
    if (cartList.length > 0) {
      if (
        (!nameError &&
          !emailError &&
          !phoneError &&
          !addressError &&
          !cityError)
      ) {

        setIsCheckoutRequest(true);
        dispatch({
          type: POST_VERIFY_STOCK,
          cartList: getCartList(),
          callback: () => setSubmitDisabled(false),
        });
      } else {
        setSubmitDisabled(false);
        if (isMobile) {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
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

    // getSetDisc()
    // showCampaignNotification(cartList, 1000, 3)

    dispatch({ type: GET_CITIES_LISTINGS });
    dispatch({ type: GET_CHECKOUT_PRODUCTS });
    checkPaymentOptions()
    // dispatch({ type: GET_FREE_GIFTS });  // stop free-gift-campaign
    if (cartList.length > 0) {
      dispatch({
        type: POST_VERIFY_STOCK,
        cartList: getCartList(),
      });
    }

    fbqTrack("InitiateCheckout", {
      content_ids: getSkus(),
      content_id: getSkus(),
      content_type: "product",
      value: `${getTotalforPayment()}`,
      currency: 'PKR'

    });

  }, []);


  const getSetDisc = async () => {
    let gameVoucher = localStorage.getItem('gameDisc')

    if (gameVoucher != null) {
      setgameDisc(gameVoucher)
    }
  }
  // eslint-disable-next-line no-lone-blocks
  const getSkus = () => {
    return cartList.map((item) => item.sku);
  };



  const getVocherDiscount = () => {
    let discount = 0;
    // if (totalPrice() >= 3000) {
    //   let disc = discount + parseInt(gameDisc);
    //   if (!isNaN(discount) && discount > -1) {
    //     discount = disc
    //   }
    // }
    return discount
  }



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


  const getTotalforPayment = () => {
    return totalPrice() + getDeliveryCharges() - getDiscount() - getVocherDiscount() - getFlashOfferDiscount()
  }

  useEffect(() => {
    if (verifyStockResponse.length < 1 && isCheckoutRequest) {
      setSubmitDisabled(true);
      dispatch({
        type: POST_CHECKOUT_REQUEST,
        payload: {
          // cartList: getCartList(),
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
            totalPayableAmount: getTotalforPayment(),
            source: isMobile ? "MobileWebsite" : "Website",
            checkoutType: "cart",
            transaction_no: transactionId,
            voucher_code: voucher_code,
            discounted_amount: getDiscount() + getVocherDiscount() + getFlashOfferDiscount()
          },
        },
        callback: () => {
          localStorage.removeItem('gameDisc');
          localStorage.removeItem('frostyJanuary');
          setTransactionId(null)
          setSubmitDisabled(false);
          setVoucher_code(null);
          setSessionId(null)
          history.push("/thankyou");
        },
        errorCallback: () => {
          setSubmitDisabled(false);
        },
      });
      setIsCheckoutRequest(false);
    }
  }, [verifyStockResponse]);


  const handlePaySubmit = () => {
    const { PaymentSession } = window;
    setSubmitDisabled(true)
    if (cartList.length > 0) {
      if (
        validateName(name) &&
        validateAddress(address) &&
        validateEmail(email) &&
        validatePhone(phone) &&
        validateCity(city)){

        PaymentSession.updateSessionFromForm('card');
      } else {
        setSubmitDisabled(false)
      }
    } else {
      setCartListEmptyError()
      setSubmitDisabled(false)
    }
  }


  const handlePayNow = async () => {
    let orderId = Date.now() + Math.floor(Math.random() * 100)
    let transactionId = Date.now() + Math.floor(Math.random() * 100)
    let amount = getTotalforPayment();
    checkStockAvailablity(getCartList()).then(available => {
      if (available) {
        payNow({
          "orderId": orderId,
          "transactionId": transactionId,
          // "amount": 10,
          "amount": amount,
          "sessionId": sessionId
        }).then(res => {
          if (res != null) {
            setTransactionId(res)
          }
        })
      } else {
        setSubmitDisabled(false)
        notification({ message: 'Product is out of stock', error: true, })
      }
    })
  }


  const filter = () => {
    const x = checkoutProdcuts.products.map((saleProduct) => {
      return { ...saleProduct, variations: [saleProduct.variations] };
    });

    return x;
  };

  return (
    <>

      {/* <CardPayment /> */}

      <Helmet>
        <title>CheckOut</title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta
          name="description"
          content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery."
        />
      </Helmet>
      <Loader loading={submitDisabled} />
      <section className="relative" >

        <div className="container responsive_cls">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-xs-12">
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
                totalPrice={totalPrice}
                setSubmitDisabled={setSubmitDisabled}
                submitDisabled={submitDisabled}
                setTransactionId={setTransactionId}
                getDiscount={getDiscount}
                getFlashOfferDiscount={getFlashOfferDiscount}
                validateFields={validateFields}
                setCartListEmptyError={setCartListEmptyError}
                getVocherDiscount={getVocherDiscount}
                getDeliveryCharges={getDeliveryCharges}
                cartList={cartList}
                handlePaySubmit={handlePaySubmit}
                handlePayNow={handlePayNow}
                setSessionId={setSessionId}
                onlyCreditCardPayment={onlyCreditCardPayment}
                setonlyCreditCardPayment={setonlyCreditCardPayment}

              />
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <RightSection
                cartList={getCartList()}
                cartListEmptyError={cartListEmptyError}
                handleCheckout={handleCheckout}
                outOfStockProducts={verifyStockResponse}
                totalPrice={totalPrice}
                setSubmitDisabled={setSubmitDisabled}
                submitDisabled={submitDisabled}
                setVoucher_code={setVoucher_code}
                voucher_code={voucher_code}
                getDeliveryCharges={getDeliveryCharges}
                getDiscount={getDiscount}
                getVocherDiscount={getVocherDiscount}
                getFlashOfferDiscount={getFlashOfferDiscount}
                paymentMethod={paymentMethod}
              />
            </div>
          </div>
        </div>
      </section>


      {/* stop free-gift-campaign */}
      {/* {totalPrice()<3000 && checkoutProdcuts?.products?.length > 0 && (<>
        <div className="gift_banner">
          <div className="container">
            <div className="animated_content">
              <div className="ifmobile">
                <h6>Make your Purchase value</h6><h6><b>upto 3000</b> and get a</h6>
              </div>
              <div className="ifdesktop">
                <h6>Make your Purchase</h6>
                <h4>value <b>upto 3000</b> and get a</h4>
              </div>
              <img className="image1" src={TxtImage} alt="free gift image"/>
              <img className="image2" src={TxtImage} alt="free gift image"/>
              <h5>of <b>Worth 1000 Rs</b></h5>
            </div>
          </div>
        </div>

        <div className="floating">
          <div className="container">
            <VariationGrid products={filter()} checkoutType />
          </div>
        </div>
        </>
      )} */}
    </>
  );
}
