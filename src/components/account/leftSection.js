import React from "react";
import { Link } from "react-router-dom";
export default function Profile({ logout, page }) {
  return (
    <>
      <div className="widget_log non_res">
        <ul className="list nav">
          <li className={page === "profile" ? "active" : ""}>
            <Link to="/profile">
              <i className="icon-user1"></i>My Profile
            </Link>
          </li>
          {/* <li>
            <Link to="/profile">
              <i className="icon-wallet1"></i>My Wallet
            </Link>
          </li> */}
          <li className={page === "orders" ? "active" : ""}>
            <Link to="/profile/myorders">
            <i className="fa fa-archive" aria-hidden="true"></i>My Orders
            </Link>
          </li>
          <li className={page === "addresses" ? "active" : ""}>
            <Link to="/track-complaint">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>Track complaint
            </Link>
          </li>
          <li className={page === "wishlist" ? "active" : ""}>
            <Link to="/profile/mywishlist">
              <i className="icon-null-2"></i>My Wishlist
            </Link>
          </li>
          <li className={page === "addresses" ? "active" : ""}>
            <Link to="/profile/myaddress">
              <i className="fa fa-map-marker"></i>My Addresses
            </Link>
          </li>
          {/* <li>
            <Link to="/profile/mysubscriptions">
              <i className="icon-renew-1"></i>My Subscriptions{" "}
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="icon-null-4 fa-1x"></i>My Product Reviews
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <i className="icon-null-5 fa-2x"></i>Q & A{" "}
            </Link>
          </li>
           */}
          <li>
            <Link to="/" onClick={logout}>
              <i className="icon-null-9"></i>Log Out
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
