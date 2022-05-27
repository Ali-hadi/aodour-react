import React from "react";

import { useDispatch } from "react-redux";
import { REMOVE_FROM_CART } from "../../constants/actionTypes";
import moment from "moment";
export default function CardDropDownItem({ product }) {
  const getPrice = () => {
    if (
      product.discountPercentage > 0 &&
      moment().isSameOrAfter(product.discountStartTime, ) &&
      moment().isSameOrBefore(product.discountEndTime)
    ) {
      return Math.round(product.price - product.discountPrice);
    } else {
      return Math.round(product.price);
    }
  };

  const getPriceElement = () => {
    if (
      product.discountPercentage > 0 &&
      moment().isSameOrAfter(product.discountStartTime, ) &&
      moment().isSameOrBefore(product.discountEndTime)
    ) {
      return (
        <h6 className="">
          Rs.{Math.round(product.price - product.discountPrice)}{" "}
          <del className="del_price">{product.price}</del>
        </h6>
      );
    } else {
      return <h6 className="">Rs.{Math.round(product.price)} </h6>;
    }
  };
  const dispatch = useDispatch();
  return (
    <>
      <li>
        <div className="dropdown_card">
          <div className="list-style">
            <div className="bg-img">
              <div
                style={{
                  backgroundImage: `url(${product.images[0]})`,
                }}
              ></div>
            </div>
            <div className="list-content">
              <h6>{product.productName}</h6>
              {!product.free && (
                <span className="cardprice">{getPriceElement()}</span>
              )}
              <span className="qnty_price">
                Quantity: {product.qty}
                {product.free ? (
                  <h6>Free gift</h6>
                ) : (
                  <span>Rs. {product.qty * getPrice()}</span>
                )}
              </span>
              {!product.free && (
                <span
                  onClick={() =>
                    dispatch({ type: REMOVE_FROM_CART, payload: product })
                  }
                  className="clr1 remove"
                >
                  Remove
                </span>
              )}
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
