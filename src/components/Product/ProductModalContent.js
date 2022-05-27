import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  INCREMENT_DECREMENT_QANTITY
} from "../../constants/actionTypes";

export default function ProductModalContent({ selectedProduct, features }) {
  const [qty, setQty] = useState(1);
  const { cartList } = useSelector(state => state);

  const dispatch = useDispatch();

  useEffect(() => {
    cartList.map(item => {
      if (item.id === selectedProduct.id) {
        setQty(item.qty);
      }
    });
  }, []);

  const addToCart = () => {
    selectedProduct = { ...selectedProduct, qty: qty };
   
    dispatch({
      type: ADD_TO_CART,
      payload: selectedProduct,
      callback: () => {
        setQty(qty + 1);
      }
    });
  };

  const changeQty = newQty => {
    setQty(newQty);
    selectedProduct = { ...selectedProduct, qty: newQty };
    dispatch({ type: INCREMENT_DECREMENT_QANTITY, payload: selectedProduct });
  };

  // useEffect(() => {
  //   selectedProduct = { ...selectedProduct, qty: qty };
  //   dispatch({type:INCREMENT_DECREMENT_QANTITY,payload:selectedProduct})
  // }, [qty])

  // const incrementQty = () => {
  //   let temp = qty;
  //   temp += 1;
  //   setQty(temp);
  // }

  // const decrementQty = () => {
  //   let temp = qty;
  //   temp = temp > 1 ? --temp : temp;
  //   setQty(temp);
  // }

  const getStars = () => {
    let stars = [];
    for (const i = 0; i < selectedProduct.rating; i++) {
      stars.push(
        <li>
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="product_detail">
        <div className="rating-blog">
          <ul className="rating">{getStars().map(star => star)}</ul>
          <span className="rate_result">{`${selectedProduct.total_comments}`}</span>
        </div>
        <div className="product-detail-content">
          <h5>Mistine</h5>
          <figure className="contry-flg">
            <img src="" alt="" />
            <small>Thailand</small>
          </figure>
          <h1>{selectedProduct.name}</h1>
          <span className="pro_code">
            Product Code : {selectedProduct.sku}
            <span className="clr1">
              Volume:<small>29ml</small>
            </span>
          </span>
          <h6 className="p-title p20">RS. {selectedProduct.price}</h6>
          <p>{selectedProduct.description}</p>
          <ul className="meta-checkbox">
            {features.map(({ value }) => {
              if (value !== null) {
                return (
                  <li>
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        name="check1"
                        value=""
                        id="checkbox1"
                        checked
                        disabled
                      />
                      <label htmlFor="checkbox1">
                        <span></span>
                        {value}
                      </label>
                    </div>
                  </li>
                );
              }
            })}
          </ul>
          <h6 className="d-pro">
            dolor up price down{" "}
            <Link to="/" >
              Details
            </Link>
          </h6>
          <h6 className="p-title mb7 p16">Services:</h6>
          <ul className="meta-checkbox">
            <li>
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="check1"
                  value=""
                  id="checkbox3"
                  disabled
                  checked
                />
                <label htmlFor="checkbox3">
                  <span></span>Delivery 7-10 Working days
                </label>
              </div>
            </li>
            <li>
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="check1"
                  value=""
                  id="checkbox4"
                  disabled
                  checked
                />
                <label htmlFor="checkbox4">
                  <span></span>72 hours return & claim
                </label>
              </div>
            </li>
            <li>
              <div className="checkbox">
                <input
                  type="checkbox"
                  name="check1"
                  value=""
                  id="checkbox4"
                  disabled
                  checked
                />
                <label htmlFor="checkbox4">
                  <span></span>Original Guaranteed
                </label>
              </div>
            </li>
          </ul>
          <h6 className="p-title p16">
            Available Stock: {selectedProduct.available_quantity}
          </h6>
          <div className="qty-added">
            <button
              onClick={() => {
                changeQty(qty > 1 ? qty - 1 : qty);
              }}
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
              onClick={() => {
                changeQty(qty + 1);
              }}
              className="up_count"
              title="Up"
            >
              <i className="icon-plus"></i>
            </button>
          </div>
          <div className="btns">
            <button className="btn-normal  at_bg2" onClick={addToCart}>
              add to cart
            </button>
            <button className="btn-normal at_bg3">
            Pre-Order
            </button>
          </div>
          {/* <div className="check_hrt">
            <input id="hrt_chk" type="checkbox" name="" value="" />
            <label htmlFor="hrt_chk">
              <i className="fa fa-heart-o" aria-hidden="true"></i>add to
              wishlist
            </label>
          </div> */}
          <span className="iconntitle">
            <i className="fa fa-usd" aria-hidden="true"></i>Earn up to 45 points
            in <b className="clr1">Royal Bazaar</b>
          </span>
        </div>
      </div>
    </>
  );
}
