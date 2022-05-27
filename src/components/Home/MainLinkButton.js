import React from "react";
import { Link } from "react-router-dom";
export default function MainLinkButton() {
  return (
    <>
      <div className="container-fluid">
        {/*LINK BUTTONS */}
        <ul className="listing-links row">
          <li>
            <Link to="/allbestsellers">
              <i className="icon-right" aria-hidden="true"></i>Best Sellers
            </Link>
          </li>
          {/*BUTTON */}
          <li>
            <Link to="/Shop/new_arrival">
              <i className="icon-right" aria-hidden="true"></i>New Arrival
            </Link>
          </li>
          {/*BUTTON */}
          <li>
            <Link to="/flash-sale">
              <i className="icon-right" aria-hidden="true"></i>flash sale
            </Link>
          </li> 
          {/* <li>
            <Link to="/pakistanday">
              <i className="icon-right" aria-hidden="true"></i>Pakistan Day Special
            </Link>
          </li>  */}
           {/* <li>
            <Link to="/womenday"><i className="icon-right" aria-hidden="true"></i>Women day Spacial</Link>
          </li> */}
           {/* <li>
            <Link to="/fridayfrenzy"><i className="icon-right" aria-hidden="true"></i>Friday Frenzy</Link>
          </li> */}
          {/* <li>
            <Link to="/New-Year-Bling"><i className="icon-right" aria-hidden="true"></i>New Year Bling</Link>
          </li> */}
          {/* <li>
            <Link to="/annual-showdown"><i className="icon-right" aria-hidden="true"></i>annual showdown</Link>
          </li> */}
          {/*BUTTON */}
          <li>
            <Link to="/under999">
              <i className="icon-right" aria-hidden="true"></i>Under 999
            </Link>
          </li>
          {/*BUTTON */}
        </ul>
      </div>
    </>
  );
}
