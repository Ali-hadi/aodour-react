import React, { memo, useState } from "react";

import CopyRightBar from "./CopyRight";
import "./footer.css";
import { Link } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";
import { isMobile, isTablet } from "react-device-detect";
import { useDispatch } from "react-redux";
import { POST_SUBSCRIBE_NEWSLETTER } from "../../constants/actionTypes";
import notification from "../Notification";
import { emailformat } from '../../util';

const Footer = memo(() => {
  const [isCustomerCareOpen, setIsCustomerCareOpen] = useState(false);
  const [isInformationOpen, setIsInformationOpen] = useState(false);
  const [isContactUsOpen, setIsContactUsOpen] = useState(false);
  const [isQuickLinksOpen, setIsQuickLinksOpen] = useState(false);
  const [subEmail, setSubEmail] = useState("");

  const dispatch = useDispatch();

  const validateEmail = (email) => {
    if (email && email !== "" && email.match(emailformat)) {
      return true;
    }
    return false;
  };

  const subscribe = (email) => {
    if (!validateEmail(email)) {
      notification({ message: "Wrong email format" });
      return;
    }

    dispatch({
      type: POST_SUBSCRIBE_NEWSLETTER,
      payload: email,
      callback: (status) => {
        if (status === "success") {
          setSubEmail("");
          notification({ message: "Newsletter Successfully Subscribed!" });
        } else {
          notification({ message: "Something Went Wring. Try Again!" });
        }
      },
    });
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <footer>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
              <div className="widget spacial-padding">
                <span className="backtoup  at_bg" onClick={scrollToTop}>
                  <i className="fa fa-angle-double-up" aria-hidden="true"></i>
                </span>
                <h6>signup to our newsletter</h6>
                <form>
                  <div className="input-felid">
                    <input
                      type="text"
                      placeholder="Email Address"
                      value={subEmail}
                      onChange={(e) => setSubEmail(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                          e.preventDefault();
                          subscribe(subEmail);
                        }
                      }}
                    />
                    <button
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        subscribe(subEmail);
                      }}
                    >
                      <i className="fa fa-angle-right" aria-hidden="true"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {isMobile && !isTablet ? (
              <>
                <div
                  className="col-lg-2 col-md-2 col-sm-6 col-xs-12"
                  onClick={() => setIsCustomerCareOpen((open) => !open)}
                >
                  <div className="widget">
                    <h6 className="widget-title">
                      customer care
                      <span
                        className={
                          isCustomerCareOpen
                            ? "fa fa-angle-down"
                            : "fa fa-angle-right"
                        }
                        aria-hidden="true"
                      ></span>
                    </h6>
                  </div>
                </div>
                <Collapse isOpen={isCustomerCareOpen}>
                  <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                    <div className="widget">
                      <ul className="wiget-link">
                        <li>
                          <Link to="/about">about us</Link>
                        </li>
                        {/* <li>
                          <Link to="/commingsoon" >
                            our team
                          </Link>
                        </li> */}
                        <li>
                          <Link to="/contact" >
                            Contact Us
                          </Link>
                        </li>
                        {/* <li>
                          <Link to="/commingsoon" >
                            site map
                          </Link>
                        </li> */}
                        <li>
                          <Link to="/store-locator" >
                            store locator
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </>
            ) : (
              <div
                className="col-lg-2 col-md-2 col-sm-6 col-xs-12"
                onClick={() => setIsCustomerCareOpen((open) => !open)}
              >
                <div className="widget">
                  <h6 className="widget-title">customer care</h6>

                  <ul className="wiget-link">
                    <li>
                      <Link to="/about">about us</Link>
                    </li>
                    {/* <li>
                      <Link to="/commingsoon" >
                        our team
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/contact" >
                        Contact Us
                      </Link>
                    </li>
                    {/* <li>
                      <Link to="/commingsoon" >
                        site map
                      </Link>
                    </li> */}
                    <li>
                      <Link to="/store-locator" >
                        store locator
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {isMobile && !isTablet ? (
              <>
                <div
                  className="col-lg-2 col-md-2 col-sm-6 col-xs-12"
                  onClick={() => setIsInformationOpen((open) => !open)}
                >
                  <div className="widget">
                    <h6 className="widget-title">
                      information
                      <span
                        className={
                          isInformationOpen
                            ? "fa fa-angle-down"
                            : "fa fa-angle-right"
                        }
                        aria-hidden="true"
                      ></span>
                    </h6>
                  </div>
                </div>
                <Collapse isOpen={isInformationOpen}>
                  <div className="col-lg-2 col-md-2 col-sm-6 col-xs-12">
                    <div className="widget">
                      <ul className="wiget-link">
                        <li>
                          <Link to="/delivery">delivery information</Link>
                        </li>
                        <li>
                          <Link to="./policy">privacy policy</Link>
                        </li>
                        <li>
                          <Link to="/term">terms & conditions</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </>
            ) : (
              <div
                className="col-lg-2 col-md-2 col-sm-6 col-xs-12"
                onClick={() => setIsInformationOpen((open) => !open)}
              >
                <div className="widget">
                  <h6 className="widget-title">information</h6>
                  <ul className="wiget-link">
                    <li>
                      <Link to="/delivery">delivery information</Link>
                    </li>
                    <li>
                      <Link to="/Faqs">FAQS</Link>
                    </li>
                    <li>
                      <Link to="/policy">privacy policy</Link>
                    </li>
                    <li>
                      <Link to="/term">terms & conditions</Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            {/* {isMobile && !isTablet && (
              <>
                <div
                  className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                  onClick={() => setIsQuickLinksOpen((open) => !open)}
                >
                  <div className="widget">
                    <h6 className="widget-title mb10">
                      quick links
                      <span
                        className={
                          isQuickLinksOpen
                            ? "fa fa-angle-down"
                            : "fa fa-angle-right"
                        }
                        aria-hidden="true"
                      ></span>
                    </h6>
                  </div>
                </div>
                <Collapse isOpen={isQuickLinksOpen}>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="widget">
                      <ul className="wiget-link">
                        <li>
                          <Link to="/commingsoon" >
                            my account
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </>
            )} */}
            {isMobile && !isTablet ? (
              <>
                <div
                  className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                  onClick={() => setIsContactUsOpen((open) => !open)}
                >
                  <div className="widget">
                    <h6 className="widget-title">
                      contact us
                      <span
                        className={
                          isContactUsOpen
                            ? "fa fa-angle-down"
                            : "fa fa-angle-right"
                        }
                        aria-hidden="true"
                      ></span>
                    </h6>
                  </div>
                </div>
                <Collapse isOpen={isContactUsOpen}>
                  <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12">
                    <div className="widget">
                      <ul className="wiget-link">
                        <li>
                          <span>
                            <i
                              className="fa fa-map-marker"
                              aria-hidden="true"
                            ></i>
                            office #387 L Block, DHA Phase 5, DHA Lahore,
                            Pakistan
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            (042) 37176611<b>/</b>(042) 37176612<br/>
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="fa fa-phone" aria-hidden="true"></i>
                            Complaints Hotline : 03011120152
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              className="fa fa-envelope"
                              aria-hidden="true"
                            ></i>
                            info@aodour.com
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              className="fa fa-envelope"
                              aria-hidden="true"
                            ></i>
                            partnership@aodour.com
                          </span>
                        </li>
                        <li>
                          <span>
                            <i
                              className="fa fa-envelope"
                              aria-hidden="true"
                            ></i>
                            careers@aodour.com
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Collapse>
              </>
            ) : (
              <div
                className="col-lg-4 col-md-4 col-sm-6 col-xs-12"
                onClick={() => setIsContactUsOpen((open) => !open)}
              >
                <div className="widget">
                  <h6 className="widget-title">contact us</h6>
                  <ul className="wiget-link">
                    <li>
                      <span>
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                        office #387 L Block, DHA Phase 5, DHA Lahore, Pakistan
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        (042) 37176611<b>/</b>(042) 37176612<br/>
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-phone" aria-hidden="true"></i>
                        Complaints Hotline : 03011120152
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        info@aodour.com
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        partnership@aodour.com
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                        careers@aodour.com
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <CopyRightBar />
      </footer>
    </>
  );
});

export default Footer;
