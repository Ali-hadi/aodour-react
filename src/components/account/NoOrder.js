import React from "react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <div className="empty_cart">
        <span className="fa fa-shopping-cart"></span>
        <h6>No recent orders</h6>
        <Link to="/">
          <h6 className="clr1">Start Shopping</h6>
        </Link>
      </div>
    </>
  );
}
