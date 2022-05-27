import React from "react";
import "./CartDropDown.css";
import moment from "moment";

import CardDropDownItem from "./CartDropDownItem";
import { Link } from "react-router-dom";
export default function CardDropDown({ cartList }) {
  const getPrice = (product) => {
    if (!product.free)
      if (
        product.discountPercentage > 0 &&
        moment().isSameOrAfter(product.discountStartTime, ) &&
        moment().isSameOrBefore(product.discountEndTime)
      ) {
        return Math.round(product.price - product.discountPrice);
      } else {
        return Math.round(product.price);
      }
    return 0;
  };

  const totalPrice = () => {
    let sum = 0;
    for (const product of cartList) {
      sum = sum + getPrice(product) * product.qty;
    }
    return sum;
  };

  console.log(cartList, 'cartList cartList 3456');
  

  return (
    <>
      {cartList.length > 0 ? (
        <div className="dropdowncart">
          <h6 className="cart_heading">{cartList.length} items in basket</h6>
          <ul className="dropcard_items">
            {cartList.length > 0 &&
              cartList.map((product) => <CardDropDownItem product={product} />)}
          </ul>
          <h6 className="subtotal">Subtotal: Rs.{totalPrice()}</h6>
          <Link to="/checkout" className="btn-normal at_bg ">
            checkout
          </Link>
        </div>
      ) : (
        <div className="empty_box dropdowncart">
          <h6 className="">your basket is empty.</h6>
          {/* <div className="basket_requrid">
            <small>Sign in to see items you may have added previously.</small>
            <span className="btn-small  at_bg">Sign In</span>
          </div> */}
        </div>
      )}
    </>
  );
}
