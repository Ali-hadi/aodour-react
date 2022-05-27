import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "../styles/login.css";
import { emailformat } from '../util';
import { POST_SIGN_UP } from '../constants/actionTypes';

const Signup = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termsCheckedError, setTermsCheckedError] = useState(false);

  const dispatch = useDispatch();

  const validateEmail = (value) => {
    if (value.match(emailformat)) {
      setEmailError(false);
      return true;
    } else {
      setEmailError(true);
      return false;
    }
  }

  const validatePassword = (value) => {
    if (value.length > 7) { 
      setPasswordError(false);
      return true;
    } else {
      setPasswordError(true);
      return false;
    }
  }

  const validateName = (value) => {
    if (value.length > 2) {
      setNameError(false);
      return true;
    } else {
      setNameError(true);
      return false;
    }
  }

  const validateTermsChecked = (value) => {
    if (value) {
      setTermsCheckedError(false);
      return true;
    } else {
      setTermsCheckedError(true);
      return false;
    }
  }

  const validateFields = () => {
    if (validateEmail(email) && validateName(name) && validatePassword(password) && validateTermsChecked(termsChecked)) {
      return true;
    }
    return false;
  }

  const signup = () => {
    if (validateFields()) {
      dispatch({
        type: POST_SIGN_UP,
        payload: {
          email, password, name
        }
      });
    }
  }

  return (
    <div className="login-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2"></div>
          <div className="col-xs-12 col-sm-10 col-md-8 col-lg-8">
            <div className="row">
              <div className="col-md-5 col-sm-5  aodour_login-panel-left">
                <div className="brand-col">
                  <div className="headline">
                    {/* <!-- brand-logo start --> */}
                    <div className="brand-logo">
                      <img src={logo} width="150" alt="brand-logo" />
                    </div>
                    {/* <!-- ./brand-logo --> */}
                    <p>Login using social media to get quick access</p>
                    {/* <!-- social login buttons start --> */}
                    <div className="row social-buttons">
                      <div className="col-xs-4 col-sm-4 col-md-12">
                        <Link to="/" className="btn btn-block btn-facebook">
                          <i className="fa fa-facebook"></i>{" "}
                          <span className="hidden-xs hidden-sm">
                            Signin with facebook
                          </span>
                        </Link>
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-12">
                        <Link to="/" className="btn btn-block btn-twitter">
                          <i className="fa fa-twitter"></i>{" "}
                          <span className="hidden-xs hidden-sm">
                            Signin with twitter
                          </span>
                        </Link>
                      </div>
                      <div className="col-xs-4 col-sm-4 col-md-12">
                        <Link to="/" className="btn btn-block btn-google">
                          <i className="fa fa-google-plus"></i>{" "}
                          <span className="hidden-xs hidden-sm">
                            Signin with google
                          </span>
                        </Link>
                      </div>
                    </div>
                    {/* <!-- ./social-buttons --> */}
                  </div>
                </div>
              </div>

              <div className="col-md-7 col-sm-7 aodour_login-panel-right">
                {/* <!-- aodour_login-login start --> */}
                <div className="aodour_login-login">
                  {/* <!-- panel-login start --> */}
                  <div className="aodour_login-panel panel-login text-center active">
                    <div className="heading align-center">
                      <h3 className="">Create Account</h3>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-12">
                        <form
                          name="loginForm"
                          className="loginForm"
                        >
                          <div className="form-group">
                            { emailError && <p style={{ color: 'red' }} >Invalid email format</p> }
                            <input
                              type="email"
                              className="form-control"
                              name="username"
                              placeholder="Email address"
                              onChange={({ target: { value } }) => setEmail(value)}
                            />
                          </div>
                          <div className="form-group">
                            { emailError && <p style={{ color: 'red' }} >Name must be at least 3 character long</p> }
                            <input
                              type="text"
                              className="form-control"
                              name="fullname"
                              placeholder="Full name"
                              onChange={({ target: { value } }) => setName(value)}
                            />
                          </div>
                          <div className="form-group">
                            { emailError && <p style={{ color: 'red' }} >Password length must pe at least 8 character long</p> }
                            <div className="pwdMask">
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                onChange={({ target: { value } }) => setPassword(value)}
                              />
                              <span className="fa fa-eye-slash pwd-toggle"></span>
                            </div>
                          </div>
                          {/* <!-- start remember-row --> */}
                          <div className="row remember-row">
                            <div className="col-xs-12 col-sm-12">
                              <label className="checkbox text-left">
                                <input 
                                  type="checkbox" 
                                  value="remember-me"
                                  onChange={() => { setTermsChecked(state => !state) }}
                                  checked={termsChecked} />
                                <span className="label-text">
                                  I agree to the{" "}
                                  <Link to="/">privacy policy</Link> and{" "}
                                  <Link to="/">terms of service</Link>
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <button
                              className="btn-normal  at_bg2"
                              type="submit"
                              onClick={(e) => {
                                e.preventDefault();
                                signup();
                              }}
                            >
                              Sign up
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <Link className="lnk-toggler" data-panel=".panel-login" to="/login">
                      Already have an account?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- ./row --> */}
      </div>
      {/* .<!-- ./container --> */}
    </div>
  );
};

export default Signup;
