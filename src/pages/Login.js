import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import logo from "../assets/images/logo.png";
import "../styles/login.css";
import {
  POST_VERIFY_LOGIN,
  POST_VERIFY_PASSWORD,
  POST_SIGN_UP,
  POST_THIRD_PARTY_LOGIN,
  POST_VERIFY_PIN,
  POST_SEND_PIN,
  POST_VERIFY_PHONE_RESET_PASSWORD,
  POST_RECOVER_PASSWORD,
} from "../constants/actionTypes";
import EnterPasswordModal from "../components/account/EnterPasswordModal";
import EnterEmailModal from "../components/account/EnterEmailModal";
import RegisterModal from "../components/account/RegisterModal";
import Loader from "../components/Loader/compnentLoader";
import PhoneVerificationModal from "../components/account/PhoneVerificationModal";
import { isUserLoggedIn } from "../util";
import ForgotPassword from "../components/account/ForgotPassword";
import notification from "../components/Notification";
import EnterPhoneModal from "../components/account/EnterPhoneModal";
import Modal from "react-modal"
// import Axios from "axios";

const Login = (props) => {
  const [loading, setLoading] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isForgetPasswordModalOpen, setIsForgetPasswordModalOpen] = useState(
    false
  );
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [
    isPhoneVerificationModalOpen,
    setIsPhoneVerificationModalOpen,
  ] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [loginId, setLoginId] = useState("");
  const [name, setName] = useState("");
  const [forForgetPassword, setForForgetPassword] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(getRedirectUrl());
    // console.log(props.location);
  }, []);

  const resetStates = () => {
    setLoading(false);
    setIsEmailModalOpen(false);
    setIsForgetPasswordModalOpen(false);
    setIsPasswordModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsPhoneVerificationModalOpen(false);
    setIsPhoneModalOpen(false);
    setLoginId("");
    setForForgetPassword(false);
    setName("");
  };

  // useEffect(() => {
  //   console.log("window: ", window);
  //   window.gapi.load("client:auth2", initClient);
  // }, []);

  // const initClient = () => {
  //   window.gapi.auth2.init({
  //     client_id:
  //       "998076842253-klne6abbjluv8489tgdtq6a8p9arfdqm.apps.googleusercontent.com",
  //   });
  //   authenticate().then(loadClient);
  // };

  // const authenticate = () => {
  //   return window.gapi.auth2
  //     .getAuthInstance()
  //     .signIn({
  //       scope:
  //         "https://www.googleapis.com/auth/contacts https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/directory.readonly https://www.googleapis.com/auth/user.addresses.read https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.emails.read https://www.googleapis.com/auth/user.gender.read https://www.googleapis.com/auth/user.organization.read https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
  //     })
  //     .then(
  //       (response) => {
  //         console.log("sign in successful: ", response);
  //       },
  //       (err) => {
  //         console.log("error signing in: ", err);
  //       }
  //     );
  // };

  // const loadClient = () => {
  //   window.gapi.client.setApiKey("AIzaSyBavwkhsjIp3NGZ6k6NcHTYv91tz6dyKG4");
  //   return window.gapi.client
  //     .load("https://people.googleapis.com/$discovery/rest?version=v1")
  //     .then(
  //       () => {
  //         console.log("GAPI client loaded for api");
  //       },
  //       (err) => {
  //         console.log("error loading GAPI client for api: ", err);
  //       }
  //     );
  // };

  // const execute = () => {
  //   return window.gapi.client.people.people
  //     .get({
  //       resourceName: "people/me",
  //       personFields: "names,emailAddresses,phoneNumbers",
  //     })
  //     .then(
  //       (response) => {
  //         console.log("people response: ", response);
  //       },
  //       (err) => {
  //         console.log("people err: ", err);
  //       }
  //     );
  // };

  useEffect(() => {
    if (isUserLoggedIn()) {
      history.push("/");
    }
  }, []);

  const login = (id, password) => {
    setLoading(true);
    dispatch({
      type: POST_VERIFY_PASSWORD,
      payload: {
        loginId: id,
        password,
      },
      callback: (response, status) => {
        // alert(status+'543')
        setLoading(false);
        if (status === "success") {
          // resetStates()
          // if(props.location && props.location.state && props.location.state.fromQuiz){
          //   history.push(getRedirectUrl());
          // }else{
          //   resetStates()
          //   setmodalVisible(true)
          // }
          history.push(getRedirectUrl());
          notification({
            message: "Login successful",
            error: false,
          });
        } else {
          notification({
            message: "Error: Wrong Password",
            error: true,
          });
        }
      },
    });
  };

  const register = (payload) => {
    setLoginId(payload.phone);
    dispatch({
      type: POST_SIGN_UP,
      payload,
      callback: (response, status) => {
        if (status === "success") {
          // history.push("/");
          // if(props.location && props.location.state && props.location.state.fromQuiz){
          //   history.push(getRedirectUrl());
          // }else{
          //   setmodalVisible(true)
          // }
          setIsPhoneVerificationModalOpen(true);
          // dispatch({
          //   type: POST_SEND_PIN,
          //   payload: { phone: payload.phone },
          // });
          sendVerificationCode(payload.phone);
        } else {
          notification({
            message: "Something went wrong try again",
            error: true,
          });
        }
      },
    });
  };

  const sendVerificationCode = (phone) => {
    dispatch({
      type: POST_SEND_PIN,
      payload: { phone: phone },
    });
  };

  const getGoogleSignInButton = (renderProps) => {
    return (
      <div
        className="border-btn"
        onClick={renderProps.onClick}
        disabled={renderProps.disabled}
      >
        <div className="">
          <span className="icon-google">
            <span className="path1"></span>
            <span className="path2"></span>
            <span className="path3"></span>
            <span className="path4"></span>
            <span className="path5"></span>
            <span className="path6"></span>
          </span>
          <b>google</b>
        </div>
      </div>
    );
  };

  const getFacebookLoginButton = (renderProps) => {
    return (
      <div className="border-btn" onClick={renderProps.onClick}>
        <div className="">
          <span className="icon-facebook-1">
            <span className="path1"></span>
            <span className="path2"></span>
          </span>
          <b>facebook</b>
        </div>
      </div>
    );
  };

  const sendLoginRequest = (name, email, id, type) => {
    dispatch({
      type: POST_THIRD_PARTY_LOGIN,
      payload: {
        name,
        email,
        id,
        type,
      },
      callback: (response, status) => {
        if (status === "success") {
          // if(props.location && props.location.state && props.location.state.fromQuiz){
          //   history.push(getRedirectUrl());
          // }else{
          //   resetStates()
          //   setmodalVisible(true)
          // }

          notification({
            message: "Login successful",
            error: false,
          });
          history.push(getRedirectUrl());
        } else {
          notification({
            message: "Something went wrong try again",
            error: true,
          });
        }
      },
    });
  };

  const responseGoogle = (response) => {
    // console.log("login_google: ", response);
    if (response.profileObj.email) {
      sendLoginRequest(
        response.profileObj.name,
        response.profileObj.email,
        response.profileObj.googleId,
        1
      );
    } else {
      notification({
        message:
          "Oops there seems to be a problem with this login account. Please try another option..",
        error: true,
      });
    }
  };

  const googleError = (error) => {
    notification({ message: "Something went wrong try again", error: true });
  };

  const responseFacebook = (response) => {
    // console.log("login_facebook: ", response);
    if (response.email) {
      sendLoginRequest(response.name, response.email, response.userID, 0);
    } else {
      notification({
        message:
          "Oops there seems to be a problem with this login account. Please try another option..",
        error: true,
      });
    }
  };

  const facebookError = (error) => {
    notification({ message: "Something went wrong try again", error: true });
  };

  const verifyLogin = (id) => {
    setLoginId(id);
    setLoading(true);
    dispatch({
      type: POST_VERIFY_LOGIN,
      payload: { loginId: id },
      callback: (response, status) => {
        setLoading(false);
        if (status === "success") {
          if (response.status && response.data !== null) {
            setName(response.data.name);
            setIsPasswordModalOpen(true);
          } else {
            setIsRegisterModalOpen(true);
          }
        } else {
          notification({
            message: "Error: Email or Phone not registered",
            error: true,
          });
        }
      },
    });
    // if (loginId !== "") {
    //   setIsPasswordModalOpen(true);
    // } else {
    //   setIsRegisterModalOpen(true);
    // }
  };

  const verifyPin = (phone, pin) => {
    dispatch({
      type: POST_VERIFY_PIN,
      payload: { code: pin, phone: phone },
      callback: (response, status) => {
        // alert(status+'333')
        if (status === "success") {
          if (forForgetPassword) {
            setIsForgetPasswordModalOpen(true);
          } else {
            history.push(getRedirectUrl());
          }
        } else {
          notification({
            message: "Error: Wrong Pin",
            error: true,
          });
        }
      },
    });
  };

  const closePhoneVerificationModal = () => {
    setIsPhoneVerificationModalOpen(false);
    if (!forForgetPassword) {
      history.push(getRedirectUrl());
    }
  };

  const getRedirectUrl = () => {
    return props.location.state && props.location.state.from
      ? props.location.state.from + props.location.state.search
      : "/";
  };

  const handleForgetPassword = (phone) => {
    // sendVerificationCode(phone);
    setForForgetPassword(true);
    setIsPhoneModalOpen(true);
    // setIsPhoneVerificationModalOpen(true);
  };

  const onPhoneSubmit = (phone) => {
    setLoading(true);
    dispatch({
      type: POST_VERIFY_PHONE_RESET_PASSWORD,
      payload: phone,
      callback: (response, status) => {
        setLoading(false);
        if (status === "success") {
          sendVerificationCode(phone);
          setIsPhoneModalOpen(false);
          setIsPhoneVerificationModalOpen(true);
          setLoginId(phone);
        } else {
          notification({
            message: "Error: Phone not registered",
            error: true,
          });
        }
      },
    });
  };

  const updatePassword = (pass) => {
    setLoading(true);
    dispatch({
      type: POST_RECOVER_PASSWORD,
      payload: { phone: loginId, password: pass },
      callback: (response, status) => {
        setLoading(false);
        if (status === "success") {
          setIsForgetPasswordModalOpen(false);
          resetStates();
          notification({
            message: "Update Successful",
            error: false,
          });
          history.push("/login");
        } else {
          notification({
            message: "Something went wrong try again",
            error: true,
          });
        }
      },
    });
  };

  // console.log(props.location, 'props.location props.location');
  

  return (
    <>

      <Modal
        closeTimeoutMS={500}
        isOpen={modalVisible==true}
        shouldCloseOnOverlayClick={true}
        className="voucher_model_main"
      >
        <div className="forlogin voucher_model">
          <span
            className="cross-btn icon-close"
            onClick={() => {
              // alert(1)
              history.push(getRedirectUrl());
              setmodalVisible(false)
              
            }}
          ></span>
          <h3>Congrats!</h3>
          <p>You've Qualified for   <b>Free Shipping</b><br />Shop Above <b>Rs. 3,000</b> to Avail This Offer</p>
        </div>
      </Modal>

      <Loader loading={loading} />
      <div className="login-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12"></div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <div className="login_page_content">
                <Link to="/" className="login_img">
                  <img src={logo} alt="logo png" />
                </Link>
                <h1>
                  <span onClick={() => setIsEmailModalOpen(true)}>Login</span> /{" "}
                  <span onClick={() => setIsRegisterModalOpen(true)}>
                    Register
                  </span>
                </h1>
                <div className="following_links">
                  <div className="row">
                    <div className="col-md-6 col-xs-6 col-lg-6">
                      <FacebookLogin
                        appId="380490545674831"
                        fields="name,email,picture"
                        scope="public_profile,email"
                        callback={responseFacebook}
                        onFailure={facebookError}
                        disableMobileRedirect={true}
                        render={(renderProps) =>
                          getFacebookLoginButton(renderProps)
                        }
                      />
                    </div>
                    <div className="col-md-6 col-xs-6 col-lg-6">
                      <GoogleLogin
                        clientId="998076842253-klne6abbjluv8489tgdtq6a8p9arfdqm.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={googleError}
                        cookiePolicy={"single_host_origin"}
                        scopes="https://www.googleapis.com/auth/user.phonenumbers.read"
                        render={(renderProps) =>
                          getGoogleSignInButton(renderProps)
                        }
                      />
                      {/* <button onClick={execute}>execute</button> */}
                    </div>
                  </div>
                </div>
                <span className="border_bottom">Or</span>
                <div
                  className="type_felids mb68"
                  onClick={() => setIsEmailModalOpen(true)}
                >
                  <span className="clickme">
                    Enter Email ID or Phone Number
                  </span>
                </div>
              </div>
            </div>
            <EnterEmailModal
              isOpen={isEmailModalOpen}
              setIsOpen={setIsEmailModalOpen}
              verifyLogin={verifyLogin}
              resetStates={resetStates}
            />
            <RegisterModal
              isOpen={isRegisterModalOpen}
              setIsOpen={setIsRegisterModalOpen}
              resetStates={resetStates}
              register={register}
            />
            <EnterPasswordModal
              isOpen={isPasswordModalOpen}
              setIsOpen={setIsPasswordModalOpen}
              login={login}
              resetStates={resetStates}
              loginId={loginId}
              name={name}
              handleForgetPassword={handleForgetPassword}
            />
            <PhoneVerificationModal
              isOpen={isPhoneVerificationModalOpen}
              closeModal={closePhoneVerificationModal}
              phone={loginId}
              // verifyPin={verifyPin}
              // sendVerificationCode={sendVerificationCode}
            />
            <ForgotPassword
              isOpen={isForgetPasswordModalOpen}
              setIsOpen={setIsForgetPasswordModalOpen}
              onSubmit={(pass) => updatePassword(pass)}
            />
            <EnterPhoneModal
              isOpen={isPhoneModalOpen}
              setIsOpen={setIsPhoneModalOpen}
              onSubmit={(loginId) => {
                onPhoneSubmit(loginId);
              }}
            />
          </div>
          {/* <!-- ./row --> */}
        </div>
        {/* <!-- ./container --> */}
      </div>
    </>
  );
};

export default Login;
