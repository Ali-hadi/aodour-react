import React from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Ticker from "react-ticker";

export default function MostTopBar() {
  return (
    <>
      {/*
			=========================================
				TOP ROW 
			=========================================
	  		*/}
      <div className="first_row">
        <div className="container-fluid">
          {isMobile ? (
            <Ticker mode="await">
              {() => (
                <p
                  style={{
                    color: "#fff",
                    whiteSpace: "nowrap",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                    Flash Sale is live Now for Limited Time
                </p>
              )}
            </Ticker>
          ) : (
            <div className="top-content">
              <ul className="meta wclr">
                {/* PHONE NUMBER */}
                <li>
                  <p>
                    <i className="fa fa-phone" aria-hidden="true"></i>
                    <span>03099671141</span>
                  </p>
                </li>
              </ul>
              {/* CENTER OFFERS CONTENT */}
              <div className="center">
                <p style={{ color: "#fff", whiteSpace: "nowrap" }}>
                Flash Sale is live Now for Limited Time
                </p>
                {/* <p style={{ color: "#fff", whiteSpace: "nowrap" }}>
                L'Oréal Mega Sale is live Now for Limited Time
                Eid Sale is live Now Upto 60% off
                </p> */}
              </div>
              {/* BUTTONS LIST RIGHT */}
              <ul className="meta wclr rtl">
                <li>
                  <Link to="/track-order">TRACK ORDER</Link>
                </li>
                <li>
                  <Link to="/track-complaint">TRACK COMPLAINT</Link>
                </li>
                {/* <li>
                  <Link to='/commingsoon' >FINE STORE</Link>
                </li> */}
              </ul>
            </div>
          )}
        </div>
      </div>
      {/*
			=========================================
				SECOND ROW
			=========================================
	  		*/}
    </>
  );
}
