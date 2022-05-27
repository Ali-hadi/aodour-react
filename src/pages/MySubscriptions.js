import React from "react";
import { Link } from "react-router-dom";
import LeftSection from "../components/account/leftSection";

import Content from "../components/account/Subscriptions";
import "../styles/Profile_default.css";
import "../styles/svg-icons.css";

export default function Profile() {
  return (
    <>
      <div className="inner-banner">
        <div className="container-fluid">
          <ul className="breadcrumbs">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <span>My Order</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="profile_page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-4 col-xs-12">
              <LeftSection />
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12">
              <div className="tab_content">
                <Content />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
