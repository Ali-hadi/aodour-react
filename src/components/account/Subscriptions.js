import React from "react";
import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <>
      <div className="address_grid">
        <h4>Subscriptions</h4>
        <h6>Aodour FLASH</h6>
        <div className="item_subscribr">
          <p>
            Subscribe to Aodour FLASH and get Free shipping with no minimum for
            a full year.
          </p>
          <span>
            <b>Rs. 450/-</b>
          </span>
        </div>
        <Link className="plus-btn">Add to Basket</Link>
      </div>
    </>
  );
}
