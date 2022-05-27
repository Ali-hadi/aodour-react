import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { REMOVE_FROM_CART } from "../../constants/actionTypes";
import { INCREMENT_DECREMENT_QANTITY } from "../../constants/actionTypes";
import { Link } from "react-router-dom";
import moment from "moment";
import { removeDuplicates } from "../../util";
export default function ProductCard({ product, checkIsOutOfStock }) {
  const getPrice = () => {
    if (
      (product.discountPercentage > 0 &&
      moment().isSameOrAfter(product.discountStartTime, ) &&
      moment().isSameOrBefore(product.discountEndTime))
    ) {
      return Math.round(product.price - product.discountPrice);
    } else {
      return Math.round(product.price);
    }
  };

  const price = getPrice();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(product.qty || 1);

  const [showLimitText, setShowLimitText] = useState(false);

  const changeQty = (newQty) => {
    if(product.extraDiscount) return
    if (newQty <= product.availableQuantity && newQty <= 5) {
      dispatch({
        type: INCREMENT_DECREMENT_QANTITY,
        payload: { ...product, qty: newQty },
      });
      setShowLimitText(false);
    } else {
      setShowLimitText(true);
    }
  };

  useEffect(() => {
    setQty(product.qty);
  }, [product]);

  const uniteAttribue = () => {
    return product.attributes ? removeDuplicates(product.attributes, "id") : [];
  };

  const priceElement = () => {
    if (product.discount_price > 0)
      return (
        <span>
          <del>{product.discountPrice} Rs</del>
          <b>{product.discountPrice} Rs</b>
        </span>
      );
    return (
      <span>
        <b>{product.price} Rs</b> 
      </span>
    );
  };

  const getPriceElement = () => {
    if (
      (product.discountPercentage > 0 &&
        moment().isSameOrAfter(product.discountStartTime, ) &&
        moment().isSameOrBefore(product.discountEndTime))
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
  return (
    <>
      <div className="dropdown_card">
        <figure>
          <Link to={`/brand/${product.brandSlug}/${product.variationSlug}`}>
            <img src={`${product.images[0]}`} />
          </Link>
        </figure>
        <div className="list-content">
          {checkIsOutOfStock(product) && (
            <h6 style={{ color: "red", fontWeight: "bold" }}>Out of stock</h6>
          )}
          <Link to={`/brand/${product.brandSlug}/${product.variationSlug}`}>
            <h6>{product.productName}</h6>
          </Link>
          {product.free && (
            <>
            <h6 className="one_line_element">
              <h6 className="clr1">Free Gift</h6>
              {/* <del className="del_price">Rs. {product.price}</del> */}
            </h6>
            </>
          )}
          {!product.free && (
            <span className="qnty_price">{getPriceElement()}</span>
          )}
          <span>Quantity: {product.qty}</span>

          <div className="pro_size_add">
            {uniteAttribue().length > 0 &&
              uniteAttribue().map((attr) =>
                attr.type === "text" || attr.type === "numeric" ? (
                  <span className="qnty_price">
                    {attr.name}: {attr.value}
                  </span>
                ) : (
                  <span>
                    {attr.name}:{attr.alt}
                  </span>
                )
              )}

            {!product.free && (
              <div className="qty-added">
                <button
                  onClick={() => changeQty(qty > 1 ? qty - 1 : qty)}
                  className="down_count"
                  title="Down"
                >
                  <i className="icon-minus"></i>
                </button>
                <input
                  className="counter"
                  type="text"
                  placeholder="value..."
                  value={qty}
                />
                <button
                  className="up_count"
                  title="Up"
                  onClick={() =>
                    changeQty(
                      product.qty < product.availableQuantity ? qty + 1 : qty
                    )
                  }
                >
                  <i className="icon-plus"></i>
                </button>
              </div>
            )}
            {showLimitText && (
              <small className="notification_txt">
                Item limited to max quantity of 5
              </small>
            )}
          </div>
          {!product.free && (
            <div className="price_checkout">
              <span className="cardprice pull-right">{`Rs. ${
                qty * price 
              }`}</span>
            </div>
          )}
        </div>

        {!product.isFreeGift && (
          <span
            onClick={() =>
              dispatch({ type: REMOVE_FROM_CART, payload: product })
            }
            className="pull-left clr1 remove"
          >
            Remove
          </span>
        )}
      </div>
    </>
  );
}
