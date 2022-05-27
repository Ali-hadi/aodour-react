import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import LeftSection from "../components/account/leftSection";
import { useDispatch, useSelector } from "react-redux";
import EmptyWishlist from "../components/account/emptyWishlist";
import "../styles/Profile_default.css";
import "../styles/svg-icons.css";
import { GET_WISHLIST, EMPTY_USER } from "../constants/actionTypes";
import VariationGrid from "../components/VariationGrid";
import Loader from "../components/Loader/compnentLoader";
import { deleteUserToken } from "../util";
import notification from "../components/Notification";

export default function Wishlist() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    dispatch({ type: GET_WISHLIST, callback: () => setLoading(false) });
  }, []);

  const wishlist = useSelector(({ wishlist }) => wishlist);

  const products = wishlist.map((saleProduct) => {
    return { ...saleProduct, variations: [saleProduct.variations] };
  });

  const logout = () => {
    deleteUserToken();
    history.push("/");
    dispatch({
      type: EMPTY_USER,
    });
    notification({
      message: "User logout successful",
      error: false,
    });
  };

  return (
    <>
      <div className="profile_page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-4 col-xs-12">
              <LeftSection logout={logout} page="wishlist" />
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12">
              <div className="heading align-center">
                <h4>My Wishlist</h4>
              </div>
              <div className="tab_content">
                {wishlist.length < 0 && <EmptyWishlist />}
                {wishlist.length > 0 && (
                  <VariationGrid products={products} addtowishlist={true} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
