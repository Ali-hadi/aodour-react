import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LeftSection from "../components/account/leftSection";
import ProfileInfor from "../components/account/MyProfile";
import EditAddress from "../components/account/MyProfile/editAdress";
import EditInfor from "../components/account/MyProfile/editProfileInfo";
import "../styles/Profile_default.css";
import "../styles/svg-icons.css";
import { isUserLoggedIn, getUserToken, deleteUserToken } from "../util";
import {
  GET_USER_PROFILE,
  POST_EDIT_USER_PROFILE,
  POST_ADD_ADDRESS,
  EMPTY_USER,
} from "../constants/actionTypes";
import Loader from "../components/Loader/compnentLoader";
import notification from "../components/Notification";

export default function Profile() {
  const [openAddress, setOpenAddress] = useState(false);
  const [openEditInfo, setEditInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state);

  const history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isUserLoggedIn()) {
      setLoading(true);
      dispatch({
        type: GET_USER_PROFILE,
        userId: getUserToken(),
        callback: () => {
          setLoading(false);
        },
      });
    }
  }, []);

  const updateUser = (name, email, phone, dob, gender, image) => {
    setLoading(true);
    dispatch({
      type: POST_EDIT_USER_PROFILE,
      payload: { name, email, phone, gender, dob, image },
      callback: (response, status) => {
        setLoading(false);
        if (status === "fail") {
          notification({
            message: response.result.msg,
            error: true,
          });
        } else {
          setEditInfo(false);
          setLoading(true);
          dispatch({
            type: GET_USER_PROFILE,
            userId: getUserToken(),
            callback: () => {
              setLoading(false);
            },
          });
          notification({
            message: "Update Successful",
            error: false,
          });
        }
      },
    });
  };

  const addNewAddress = (id, name, city, phone, address, isPrimary, isNew) => {
    if (isNew) {
      setLoading(true);
      dispatch({
        type: POST_ADD_ADDRESS,
        payload: {
          city_id: city,
          name,
          phone,
          address,
          default_status: isPrimary,
        },
        callback: (response, status) => {
          setLoading(false);
          if (status === "fail") {
            notification({
              message: "Something went wrong try again",
              error: true,
            });
          } else {
            setOpenAddress(false);
            notification({
              message: "Added Successfully",
              error: false,
            });
          }
        },
      });
    }
  };

  const logout = () => {
    deleteUserToken();
    history.push("/");
    notification({
      message: "User logout successful",
      error: false,
    });
    dispatch({
      type: EMPTY_USER,
    });
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="profile_page background-color">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-4 col-xs-12">
              <LeftSection logout={logout} page="profile" />
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12 padding_res">
              <div className="tab_content">
                <ProfileInfor
                  setOpenAddress={setOpenAddress}
                  setEditInfo={setEditInfo}
                  user={user}
                />
                <div className="moblie_profile widget_log">
                  <ul className="list">
                    <li className="active">
                      <Link to="/profile">
                        <i className="icon-user1"></i>My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile/myorders">
                        <i className="icon-null-1 fa-2x"></i>My Orders
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
                      <Link onClick={logout}>
                        <i className="icon-null-9"></i>Log Out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditAddress
        isOpen={openAddress}
        onClose={() => setOpenAddress(false)}
        addNewAddress={addNewAddress}
        forEdit={false}
      />
      <EditInfor
        isOpen={openEditInfo}
        onClose={() => setEditInfo(false)}
        update={updateUser}
      />
    </>
  );
}
