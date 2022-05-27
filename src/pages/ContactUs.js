import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { POST_CONTACT_US } from "../constants/actionTypes";
import "../styles/ContactUs.css";
import notification from '../components/Notification'
import {Helmet} from "react-helmet";
import { emailformat } from '../util';

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const dispatch = useDispatch();

  const validateFields = () => {
    let errors = { name: false, email: false, message: false };

    if (name.length > 3) {
      setNameError(false);
    } else {
      setNameError(true);
      errors = { ...errors, name: true };
    }

    if (email.match(emailformat)) {
      setEmailError(false);
    } else {
      setEmailError(true);
      errors = { ...errors, email: true };
    }

    if (message !== "") {
      setMessageError(false);
    } else {
      setMessageError(true);
      errors = { ...errors, message: true };
    }

    return !(errors.name || errors.email || errors.message);
  };

  const submitMessage = () => {
    if (validateFields()) {
      dispatch({
        type: POST_CONTACT_US,
        payload: {
          name,
          email,
          subject,
          message
        },
        callback: status => {
          if (status === "success") {
            notification({message:"Message sent. We will contact you shortly"});
          } else {
            notification({message:"Something went wrong. Try again!"});
          }
        }
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us</title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta name="description" content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery." />
      </Helmet>
      <div className="inner-banner">
        <div className="container-fluid">
          <ul className="breadcrumbs">
            <li>
              <Link to="/" >
                home
              </Link>
            </li>
            <li>
              <span>contact us</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="content padding-b30">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="content-form">
                  <h1 className="titie_widget">Get in touch with us</h1>
                  <div className="row">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="input-feild">
                        {nameError && (
                          <p style={{ color: "red" }}>
                            Name must be more than 3 characters
                          </p>
                        )}
                        <input
                          className={nameError ? "input-error" : ""}
                          type="text"
                          placeholder="Name"
                          value={name}
                          onChange={({ target: { value } }) =>
                            setName(value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-12">
                      <div className="input-feild">
                        {emailError && (
                          <p style={{ color: "red" }}>Invalid Email</p>
                        )}
                        <input
                          className={emailError ? "input-error" : ""}
                          type="email"
                          placeholder="Email"
                          value={email}
                          onChange={({ target: { value } }) =>
                            setEmail(value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="input-feild">
                        <input
                          type="text"
                          placeholder="Subject"
                          value={subject}
                          onChange={({ target: { value } }) =>
                            setSubject(value)
                          }
                        />
                      </div>
                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12">
                      <div className="textarea-box">
                        {messageError && (
                          <p style={{ color: "red" }}>
                            Message can not be empty
                          </p>
                        )}
                        <textarea
                          className={messageError ? "input-error" : ""}
                          placeholder="Write a message"
                          value={message}
                          onChange={({ target: { value } }) =>
                            setMessage(value)
                          }
                        ></textarea>
                      </div>
                      <div className="form_btns">
                        <button
                          type="submit"
                          className="btn-normal  at_bg2"
                          onClick={submitMessage}
                        >
                          submit
                        </button>
                        {/* <button
                          type="button"
                          className="btn-normal  at_bg2"
                        >
                          who sale
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                <div className="content_discription">
                  <div className="contact-info">
                    <h4 className="titie_widget">Contact us</h4>
                    <ul className="meta-icons">
                      <li>
                      <span className="icon-mail-1"></span>
                        <h6>(042) 37176611,<br/>(042) 37176612<br/>info@aodour.com</h6>
                      </li>
                      <li>
                      <span className="icon-clock-4"></span>
                        <h6>Support forum <br/> for over 24h</h6>
                      </li>
                      <li>
                      <span className="icon-pin-1"></span>
                        <h6>Office # 387, Block L,<br/>Phase 5 DHA Lahore. Pakistan</h6>
                      </li>
                      <li>
                      
                      <span className="icon-retail-1"></span>
                        <h6>Emporium Mall First Floor <br/> 0312-4032624</h6>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       
    </>
  );
}
