import React from "react";
import svg1 from "../../assets/svg/svg1.svg";
import svg2 from "../../assets/svg/svg2.svg";
import { Link } from "react-router-dom";
export default function ButtonBanner() {
  return (
    <>
      {/*
			=========================================
				Two column
			=========================================
	  		*/}
      <div className="row-categories">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className="column-list">
                <div className="table-row">
                  <div>
                    <figure>
                      <img src={svg2} alt="svg image" />
                    </figure>
                  </div>
                  <div className="title-list">
                    <h5>royal bazar</h5>
                    <p>become a royal bazar member and earn rewards.</p>
                  </div>
                  <div className="click-btn">
                    {/* <Link to="/commingsoon"  className="clr1">
                      <i className="icon-right" aria-hidden="true"></i>
                      join royal bazar
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className="column-list">
                <div className="table-row">
                  <div>
                    <figure>
                      <img src={svg1} alt="svg image" />
                    </figure>
                  </div>
                  <div className="title-list">
                    <h5>already a member</h5>
                    <p>
                      sign in for a better browsing <br />
                      experience
                    </p>
                  </div>
                  <div className="click-btn">
                    {/* <Link to="/commingsoon"  className="clr1">
                      <i className="icon-right" aria-hidden="true"></i>
                      Sign in
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*
			=========================================
				Two column ends
			=========================================
	  		*/}
    </>
  );
}
