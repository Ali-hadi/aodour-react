import React from "react";
import { Link } from "react-router-dom";
import "../styles/CommingSoon.css";
import Countdown from "react-countdown-now";
import logo from "../assets/images/logo.png";
import {Helmet} from "react-helmet";
export default function CommingSoon() {
  const Completionist = () => <span>You are good to go!</span>;

  const renderer = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <ul className="countdown coming-soon-radio">
        <li>
          <div className="round-cercles">
            <span id="days" className="days">
             {days}
            </span>
            <p className="">days</p>
          </div>
        </li>
        <li>
          <div className="round-cercles">
            <span id="hours" className="hours">
            {hours}
            </span>
            <p className="">hours</p>
          </div>
        </li>
        <li>
          <div className="round-cercles">
            <span id="minutes" className="minutes">
            {minutes}
            </span>
            <p className="">minutes</p>
          </div>
        </li>
        <li>
          <div className="round-cercles">
            <span id="saornds" className="saornds">
            {seconds}
            </span>
            <p className="">second</p>
          </div>
        </li>
      </ul>

      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Comming Soon</title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta name="description" content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery." />
      </Helmet>
      <div className="aor_coming_soon">
        <div className="content">
          <div className="container">
            <div className="aor_coming_soon_detail">
              <div className="aor_logo">
                <Link to="/home">
                  <img src={logo} alt="" />
                </Link>
              </div>
              <h6>Just Hold On !</h6>
              <h1>Comming Soon</h1>
              <h6>Launching in...</h6>
              <Countdown date={new Date('3/31/2020')} renderer={renderer} />

              {/* <form>
                <div className="coming-soon_submit">
                    <input type="text" placeholder="Enter your email to be notified when we launch">
                    <button type="submit">signup</button>
                </div>
            </form> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
