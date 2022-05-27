import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/head/Header";
import Footer from "../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { GET_MENU, GET_USER_PROFILE, GET_MANISO_MENU } from "../constants/actionTypes";
import Loader from "../components/Loader/compnentLoader";
import { isUserLoggedIn, getUserToken } from "../util";
import ShowWishlist from "../components/Campaign/ShareCart";
import { showCampaignNotification } from "../util"

function Layout(props) {
  const dispatch = useDispatch();
  const {
    menu: { brands, category },
    error,
    cartList
  } = useSelector((state) => state);
  const [isShowWishlistOpen, setShowWishlistOpen] = useState(false);
  const [wishLinkCount, setwishLinkCount] = useState(0);

  useEffect(() => {
    let pathArr = props.location && props.location.pathname.split('/');
    if (pathArr && pathArr.length > 1) {
      if (pathArr[1] == 'miniso' || (pathAr[2] === 'miniso' && pathAr[1] === 'product')) {
        dispatch({ type: GET_MANISO_MENU });
        // dispatch({ type: GET_MENU });
      } else {
        dispatch({ type: GET_MENU });
        if (isUserLoggedIn()) {
          dispatch({ type: GET_USER_PROFILE, userId: getUserToken() });
        }
      }
    } else {
      dispatch({ type: GET_MENU });
      if (isUserLoggedIn()) {
        dispatch({ type: GET_USER_PROFILE, userId: getUserToken() });
      }
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // useEffect(() => {
  //   let list = cartList.filter(item => item.fromWishLink === true);
  //   setwishLinkCount(list.length)
  //   showCampaignNotification(cartList, 1000, 3)

  // }, [cartList])

  const children = props.children || null;

  const pathAr = props.location ? props.location.pathname.split('/') : []
  const isMiniso = pathAr.length > 1 && (pathAr[1] === 'miniso' || (pathAr[2] === 'miniso' && pathAr[1] === 'product'))

  return (
    <>
      {/* <Loader /> */}
      <>
        {/* {category.categories.length > 0 && ( */}
        <Header brands={brands} categories={category} isMiniso={isMiniso} location={props.location} />
        {/* )} */}
        <div style={{ minHeight: "100vh" }}>
          <Suspense fallback={<Loader loading={true} />}>{children}</Suspense>
        </div>
        <Footer />

        {/* <div className={`heart_icons ${wishLinkCount > 0 ? 'active' : ''}`}>
          <input id="toggle-heart" type="checkbox" />
          <label htmlfor="toggle-heart"><i className="fa fa-heart" aria-hidden="true"></i><b><i className="fa fa-heart-o" aria-hidden="true"><small>{wishLinkCount}</small></i></b></label>
          <button className="" disabled={wishLinkCount == 0} onClick={() => { setShowWishlistOpen(true); }}>ADD To<br />Wishlink</button>
        </div> */}

        {/* <ShowWishlist
          isOpen={isShowWishlistOpen}
          setIsOpen={setShowWishlistOpen}
        /> */}
      </>
    </>
  );
}

export default Layout;
