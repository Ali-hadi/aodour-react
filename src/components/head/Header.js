import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./header.css";
import "../../styles/login.css";
import CardDropDown from "./CartDropDown";
import NavBar from "./NavBar";
import SearchModal from "./SearchModal";
import CompaignFlashsale from "../Campaign/FlashSale_top_banner";
import MostTopBar from "./MostTopBar";
import VerifyPhoneBar from "./VerifyPhoneBar";
import { isUserLoggedIn, isUserVerified } from "../../util";
export default function Head({ brands={}, categories, isMiniso, location }) {
  const [isSticky, setSticky] = useState(false);
  const [searchModel, setSearchModel] = useState(false);

  const [open, setOpen] = useState(false);
  const { user ,cartList, wishlist} = useSelector((state) => state);

  const handleScroll = () => {
    setSticky(window.scrollY >= 10);
  };

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', () => handleScroll);
  //   };
  // }, []);

  const isUserVerified = () => {
    if (user.id) {
      if (user.phone_verified_at) {
        return true;
      }
      return false;
    }
    return true;
    
  };
  const history = useHistory();
  
  const gotoCheckout = () => {
    if (cartList.length > 0) {
      history.push("/checkout");
    }
  };

  const getFilteredCart = ()=>{
    let cart = cartList.filter(item => item.fromWishLink != true);
    console.log(cartList, 'cartList, cart', cart);
    
    return cart
  }

  
  return (
    <>
      {/*
		=========================================
			HEADER STARTS 
		=========================================
  		*/}
      {/* <header className={`header${isSticky ? " sticky" : ""}`}>
        <MostTopBar />
        {isUserLoggedIn() && !isUserVerified() && <VerifyPhoneBar />}

        <NavBar
          setSearchModel={setSearchModel}
          brands={brands}
          categories={categories}
        />
      </header> */}
    {
      location && location.pathname != '/checkout' && !location.pathname.includes('/checkout') ? <CompaignFlashsale/> : null
    }
      

      <header className={`header${isSticky ? " sticky" : ""}`}>
        {isUserLoggedIn() && !isUserVerified() && <VerifyPhoneBar />}
        <NavBar
          setSearchModel={setSearchModel}
          brands={brands}
          categories={categories}
          isMiniso={isMiniso}
          location={location}
          getFilteredCart={getFilteredCart}
        />
      </header>
      <div className="for_mobile_search">
        <SearchModal />  
        <span className="carticon" onClick={gotoCheckout}>
          <i className="icon-shopping-cart"></i>
          <sup className="qty-show">{getFilteredCart().length}</sup>
        </span>
        <CardDropDown cartList={cartList} />
      </div> 
      
      {/*
		=========================================
			HEADER ENDS 
		=========================================
  		*/}

      
    </>
  );
}
