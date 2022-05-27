import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserToken, isUserLoggedIn } from "../../util";
import { EMPTY_USER } from "../../constants/actionTypes";

const ProfileIcon = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);

  const { user } = useSelector(state => state)

  const logout = () => {
    deleteUserToken();
    setIsActive(false);
    dispatch({
      type: EMPTY_USER,
    });
    localStorage.removeItem('quiz')
    localStorage.removeItem('gameDisc')
  };

  console.log(user, 'user user 98');


  return (
    <li className="">
      <span
        className="user_account"
        onClick={() => {
          if (isUserLoggedIn()) {
            setIsActive((state) => !state);
          } else {
            history.push({
              pathname: "/login",
              state: {
                from: window.location.pathname,
                search: window.location.search,
              },
            });
          }
        }}
      >
        <i className="icon-user" aria-hidden="true"></i>
        <small><b>{isUserLoggedIn() ? `Hi, ${user.first_name}` : 'login / register'}</b></small>
      </span>
      <div className={`perfile_dropdown ${isActive ? "active" : ""}`}>
        <ul className="dropmenu">
          <li>
            <Link to="/profile">
              <i className="icon-user1"></i>My Profile
            </Link>
          </li>
          <li>
            <Link to="/profile/myorders">
              <i className="fa fa-archive" aria-hidden="true"></i>My Orders
            </Link>
          </li>
          <li>
            <Link to="/track-complaint">
              <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>Track Complaint
            </Link>
          </li>
          <li>
            <Link to="/profile/mywishlist">
              <i className="icon-null-2"></i>My Wishlist
            </Link>
          </li>
          <li>
            <Link to="/profile/myaddress">
              <i className="fa fa-map-marker"></i>My Addresses
            </Link>
          </li>
          <li>
            <Link to="/" onClick={logout}>
              <i className="icon-null-9"></i>Log Out
            </Link>
          </li>
        </ul>
      </div>
    </li>
  );
};

export default ProfileIcon;
