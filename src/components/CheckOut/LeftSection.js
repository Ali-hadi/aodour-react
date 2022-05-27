import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PaymentMethod from "../../constants/paymentMethods";
import { POST_VERIFY_PHONE } from "../../constants/actionTypes";
import notification from "../Notification";

export default function LeftSection({
  setFields: {
    setName,
    setEmail,
    setPhone,
    setAddress,
    setCity,

    setPaymentMethod,
  },
  setCityId,
  fields: { name, email, phone, address, city, paymentMethod, checkoutCities },
  fieldErrors,
  setFieldErrors,
  validations: {
    validateName,
    validateAddress,
    validateEmail,
    validatePhone,
    validateCity,

  },
  isModal,
  type,
  title,
  getDeliveryCharges,
  totalPrice,
  submitDisabled,
  setSubmitDisabled,
  setTransactionId,
  getDiscount,
  getFlashOfferDiscount,
  validateFields,
  setCartListEmptyError,
  cartList,
  handlePaySubmit,
  handlePayNow,
  setSessionId,
  onlyCreditCardPayment,
  setonlyCreditCardPayment

}) {
  const {
    nameError,
    phoneError,
    emailError,
    addressError,
    cityError,

  } = fieldErrors;
  const inModal = isModal === undefined ? false : isModal;

  let initCardError = {
    cardNumberError: false,
    expiryMonthError: false,
    expiryYearError: false,
    securityCodeError: false,
  }
  const [cardErrors, setCardErrors] = useState(initCardError);
  const [disabled, setDisabled] = useState(false);

  const handleCheckboxChange = (event) => {
    // console.log(event, 'event event', event.target.value, event.target.checked);
    if (event) {
      setPaymentMethod(event.target.value);
    }
    if (event.target.value === PaymentMethod.DEBIT_CREDIT_CARD) {

    }
  };

  useEffect(() => {
    const { PaymentSession } = window;

    if (PaymentSession) {
      PaymentSession.configure({
        fields: {
          // ATTACH HOSTED FIELDS TO YOUR PAYMENT PAGE FOR A CREDIT CARD
          card: {
            number: "#card-number",
            securityCode: "#security-code",
            expiryMonth: "#expiry-month",
            expiryYear: "#expiry-year",
            nameOnCard: "#cardholder-name"
          }
        },
        //SPECIFY YOUR MITIGATION OPTION HERE
        frameEmbeddingMitigation: ["javascript"],

        callbacks: {
          initialized: function (response) {
            // console.log('Session updated with data: 4', response);

            // HANDLE INITIALIZATION RESPONSE
          },
          formSessionUpdate: function (response) {
            // HANDLE RESPONSE FOR UPDATE SESSION
            // console.log('sisstion is started', response);

            if (response.status) {
              if ("ok" == response.status) {
                // console.log("Session updated with data: " + response.session.id);
                setSessionId(response.session.id)
                //check if the security code was provided by the user
                if (response.sourceOfFunds.provided.card.securityCode) {
                  // console.log("Security code was provided.");
                }

                //check if the user entered a Mastercard credit card
                if (response.sourceOfFunds.provided.card.scheme == 'MASTERCARD') {
                  // console.log("The user entered a Mastercard credit card.")
                }
              } else if ("fields_in_error" == response.status) {

                setSubmitDisabled(false)
                // console.log("Session update failed with field errors.");
                if (response.errors.cardNumber) {
                  cardErrors.cardNumberError = true
                  // console.log("Card number invalid or missing.");
                } else {
                  cardErrors.cardNumberError = false
                }
                if (response.errors.expiryYear) {
                  cardErrors.expiryYearError = true
                } else {
                  cardErrors.expiryYearError = false
                }
                if (response.errors.expiryMonth) {
                  cardErrors.expiryMonthError = true
                } else {
                  cardErrors.expiryMonthError = false
                }
                if (response.errors.securityCode) {
                  cardErrors.securityCodeError = true
                } else {
                  cardErrors.securityCodeError = false
                }

                setCardErrors({ ...cardErrors })
                setDisabled(false)
                notification({ message: 'Invalid Data', error: true, })

              } else if ("request_timeout" == response.status) {
                // console.log("Session update failed with request timeout: " + response.errors.message);
              } else if ("system_error" == response.status) {
                // console.log("Session update failed with system error: " + response.errors.message);
              }
            } else {
              // console.log("Session update failed: " + response);
            }
          },
          completeCallback: (resultIndicator, sessionVersion) => {
            // document.getElementById("state").value = "completeCallback" ;
          }
        },
      });
    }
  }, []);


  return (
    <div>
      <form>
        <div className="cart_form">
          <h6>{title}</h6>
          {/* {!inModal && (
            <span>
              Already have an account?
              <Link to="/"  className="clr1">
                Log in
              </Link>
            </span>
          )} */}
        </div>
        <div className="default_form">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="text_field">
                {nameError && (
                  <p style={{ color: "red" }}>
                    Name must be more than 3 characters and must only contain
                    alphabets
                  </p>
                )}
                <input
                  className={nameError ? "input-error" : ""}
                  type="text"
                  placeholder="Name"
                  value={name}
                  onBlur={({ target: { value } }) => validateName(value)}
                  onChange={({ target: { value } }) => {
                    validateName(value);
                    setName(value);
                    // if (validateName(value)) {
                    //   setName(value);
                    // } else {
                    //   if (value.length <= 3) {
                    //     setName(value);
                    //   }
                    // }
                  }}
                />
              </div>
            </div>
            {/* )} */}
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="text_field">
                {phoneError && (
                  <p style={{ color: "red" }}>
                    Invalid Phone: must be 11 digits and must start with 03
                  </p>
                )}
                <input
                  type="tel"
                  placeholder="Phone No. (03017654321)"
                  value={phone}
                  className={phoneError ? "input-error" : ""}
                  onBlur={({ target: { value } }) => validatePhone(value)}
                  onChange={({ target: { value } }) => {
                    setPhone(value);
                  }}
                />
              </div>
            </div>
            {/* )} */}
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="text_field">
                {emailError && <p style={{ color: "red" }}>Invalid Email</p>}
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  className={emailError ? "input-error" : ""}
                  onBlur={({ target: { value } }) => validateEmail(value)}
                  onChange={({ target: { value } }) => {
                    setEmail(value);
                  }}
                />
              </div>
            </div>
            {/* )} */}

            {/* {type !== "preorder" && ( */}
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="selectric">
                {cityError && (
                  <p style={{ color: "red" }}>You must select a city</p>
                )}
                <select
                  className={cityError ? "input-error" : ""}
                  onChange={(e) => {
                    setCity(e.target.value);
                    // setCityId(e.target.value);
                    validateCity(e.target.value);
                  }}
                  value={city}
                >
                  <option value={0}>Select City</option>
                  {checkoutCities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* {type !== "preorder" && ( */}
            <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="text_field">
                {addressError && (
                  <p style={{ color: "red" }}>Invalid Address</p>
                )}
                <textarea
                  type="text"
                  placeholder="Address"
                  value={address}
                  className={addressError ? "input-error" : ""}
                  onBlur={({ target: { value } }) => validateAddress(value)}
                  onChange={({ target: { value } }) => {
                    setAddress(value);
                  }}
                />
              </div>
            </div>
            {/* )} */}
            {/* <div className="col-md-12 col-sm-12 col-xs-12">
              <div className="shipping_radio">
                <ul className="checkbox_group">
                  <li>
                    <div className="checkbox">
                      <input
                        id="check00"
                        type="radio"
                        name="shipping_address"
                        value={'No'}
                        checked={isShippingAddress == 'No'}
                        onClick={(e)=> {
                          setisShippingAddress(e.target.value)
                          setonlyCreditCardPayment(false);
                          setPaymentMethod(PaymentMethod.CASH_ON_DELIVERY)
                        }}
                      />
                      <label htmlFor="check00">
                        <span></span> Shipping to the same address <b>(for yourself)</b>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="checkbox black">
                      <input
                        id="check200"
                        type="radio"
                        name="shipping_address"
                        value={"Yes"}
                        checked={isShippingAddress == "Yes"}
                        onClick={(e)=> {
                          setisShippingAddress(e.target.value)
                          setonlyCreditCardPayment(true);
                          setPaymentMethod(PaymentMethod.DEBIT_CREDIT_CARD)
                        }}
                      />
                      <label htmlFor="check200">
                        <span></span> Shipping to a different address <b>(for beloved one)</b>
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div> */}

            {/* {
              isShippingAddress === "Yes" && (
                <>
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="cart_form">
                      <h6>Beloved Shipping Info</h6>
                    </div>
                    <div className="text_field">
                      {name2Error && (
                        <p style={{ color: "red" }}>
                          Name must be more than 3 characters and must only contain
                          alphabets
                        </p>
                      )}
                      <input
                        className={name2Error ? "input-error" : ""}
                        type="text"
                        placeholder="Name"
                        value={name2}
                        onBlur={({ target: { value } }) => validateName2(value)}
                        onChange={({ target: { value } }) => {
                          validateName2(value);
                          setName2(value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="text_field">
                      {phone2Error && (
                        <p style={{ color: "red" }}>
                          Invalid Phone: must be 11 digits and must start with 03
                        </p>
                      )}
                      <input
                        type="tel"
                        placeholder="Phone No. (03017654321)"
                        value={phone2}
                        className={phone2Error ? "input-error" : ""}
                        onBlur={({ target: { value } }) => validatePhone2(value)}
                        onChange={({ target: { value } }) => {
                          setPhone2(value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="text_field">
                      {email2Error && <p style={{ color: "red" }}>Invalid Email</p>}
                      <input
                        type="email"
                        placeholder="email"
                        value={email2}
                        className={email2Error ? "input-error" : ""}
                        onBlur={({ target: { value } }) => validateEmail2(value)}
                        onChange={({ target: { value } }) => {
                          setEmail2(value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="selectric">
                      {city2Error && (
                        <p style={{ color: "red" }}>You must select a city</p>
                      )}
                      <select
                        className={city2Error ? "input-error" : ""}
                        onChange={(e) => {
                          setCity2(e.target.value);
                          validateCity2(e.target.value);
                        }}
                        value={city2}
                      >
                        <option value={0}>Select City</option>
                        {checkoutCities.map((city) => (
                          <option key={city.id} value={city.id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="text_field">
                      {address2Error && (
                        <p style={{ color: "red" }}>Invalid Address</p>
                      )}
                      <textarea
                        type="text"
                        placeholder="Address"
                        value={address2}
                        className={address2Error ? "input-error" : ""}
                        onBlur={({ target: { value } }) => validateAddress2(value)}
                        onChange={({ target: { value } }) => {
                          setAddress2(value);
                        }}
                      />
                    </div>
                  </div>

                </>
                )} */}

            <div className="col-md-12 col-sm-12 col-xs-12">
              {paymentMethod && (
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <ul className="checkbox_group">
                      <li>
                        <div className="checkbox">
                          <input
                            id="check1"
                            type="radio"
                            name="abc"
                            checked={paymentMethod == PaymentMethod.CASH_ON_DELIVERY}
                            value={PaymentMethod.CASH_ON_DELIVERY}
                            onChange={handleCheckboxChange}
                            disabled={onlyCreditCardPayment}
                          />
                          <label htmlFor="check1">
                            {/* <img src={require('../../assets/images/cashDelivery_icon.png')} width="12%" /> */}
                            <span></span> Cash on delivery
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="checkbox">
                          <input
                            id="check2"
                            type="radio"
                            name="abc"
                            checked={paymentMethod == PaymentMethod.DEBIT_CREDIT_CARD}
                            value={PaymentMethod.DEBIT_CREDIT_CARD}
                            onChange={handleCheckboxChange}
                          />
                          <label htmlFor="check2">

                            <span></span> Credit / Debit Card
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="payment_module">
                      <>
                        {/* <h6>Payment Method</h6> */}
                        <div style={{ display: paymentMethod != PaymentMethod.DEBIT_CREDIT_CARD ? 'none' : 'block' }}>
                          <div className="row">


                            {/* <div className="col-md-12 col-sm-12 col-xs-12">
                              <img src={require('../../assets/images/visaCard_icon.png')} width="8%" />
                              <img src={require('../../assets/images/masterCard_icon.png')} width="8%" />
                            </div> */}

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div>Please enter your payment details:</div>
                              <br />
                              <div className="text_field">
                                {cardErrors.cardNumberError && <p style={{ color: "red" }}>Invalid Card Number</p>}
                                <input type="text"
                                  className={cardErrors.cardNumberError ? "input-error" : ""}
                                  readOnly
                                  id="card-number"
                                  placeholder="Card Number"
                                />
                              </div>
                            </div>

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="text_field">

                                <input type="text"
                                  readOnly

                                  id="cardholder-name"
                                  placeholder="Name on Card"
                                />
                              </div>
                            </div>

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="text_field">
                                {cardErrors.expiryMonthError && <p style={{ color: "red" }}>Invalid Card Expiry Month </p>}
                                <select id="expiry-month" className="form-control input-md" required="" readOnly>
                                  <option value="">Select Month</option>
                                  <option value="01">January</option>
                                  <option value="02">February</option>
                                  <option value="03">March</option>
                                  <option value="04">April</option>
                                  <option value="05">May</option>
                                  <option value="06">June</option>
                                  <option value="07">July</option>
                                  <option value="08">August</option>
                                  <option value="09">September</option>
                                  <option value="10">October</option>
                                  <option value="11">November</option>
                                  <option value="12">December</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="text_field">
                                {cardErrors.expiryYearError && <p style={{ color: "red" }}>Invalid Card Expiry Year</p>}
                                <select id="expiry-year" className="form-control input-md" required="" readOnly>
                                  <option value="">Select Year</option>
                                  <option>21</option>
                                  <option>22</option>
                                  <option>23</option>
                                  <option>24</option>
                                  <option>25</option>
                                  <option>26</option>
                                  <option>27</option>
                                  <option>28</option>
                                  <option>29</option>
                                  <option>30</option>
                                  <option>31</option>
                                  <option>32</option>
                                  <option>33</option>
                                  <option>34</option>
                                  <option>35</option>
                                </select>
                              </div>
                            </div>

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="text_field">
                                {cardErrors.securityCodeError && <p style={{ color: "red" }}>Invalid CCV</p>}
                                <input type="text"
                                  readOnly
                                  id="security-code"
                                  placeholder="CCV"
                                />
                              </div>
                            </div>

                            <div className="col-md-12 col-sm-12 col-xs-12">
                              <div className="total_bar">
                                <button
                                  disabled={submitDisabled}
                                  type="button"
                                  className="btn-normal  at_bg2"
                                  onClick={(e) => {
                                    // setSubmitDisabled(true);
                                    // e.preventDefault()
                                    handlePaySubmit()
                                    // handleCheckout()
                                  }}
                                >Pay Now</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div >
  );
}
