import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import "../styles/AddToCartModel.css";
import moment from "moment";

export default function ProductDetailModal({
  isOpen,
  setIsOpen,
  selectedProduct,
}) {
  const { cartList } = useSelector((state) => state);

  const price = selectedProduct.price;

  const getPrice = () => {
    const discountPercentage =
      selectedProduct.discount_percentage || selectedProduct.discountPercentage;
    const discountStartTime =
      selectedProduct.discount_start_time || selectedProduct.discountStartTime;
    const discountEndTime =
      selectedProduct.discount_end_time || selectedProduct.discountEndTime;
    const discountPrice =
      selectedProduct.discount_price || selectedProduct.discountPrice;

    if (
      discountPercentage > 0 &&
      moment().isSameOrAfter(discountStartTime, ) &&
      moment().isSameOrBefore(discountEndTime)
    ) {
      return Math.round(price - discountPrice);
    } else {
      return Math.round(price);
    }
  };

  return (
    <>
      <Modal
        closeTimeoutMS={500}
        isOpen={isOpen}
        className={"productmodel"}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        overlayClassName="notify_opacity"
      >
        <div className="pro_notify_model">
          <div className="notify_head">
            <h6>so worth it</h6>
            <span>added to your bag</span>
          </div>
          <span
            className="cross-btn icon-close"
            onClick={() => setIsOpen(false)}
          ></span>
          <figure>
            <img
              src={selectedProduct.images ? selectedProduct.images[0] : ""}
              alt="img here"
            />
          </figure>
          <div className="notify_content">
            <h6>
              {selectedProduct.productVariationName || selectedProduct.name}
            </h6>
            <h6>
              <b>Rs. {getPrice()}</b>
            </h6>
            <Link to="/checkout" className="btn-normal at_bg2">
              checkout
            </Link>
            <span className="underline-btn" onClick={() => setIsOpen(false)}>
              Keep Shopping<small>({cartList.length})</small>
            </span>
          </div>
        </div>
        <div className="notify_model_mobile">
          <div className="notify_head align-left">
            <span>added to your bag</span>
          </div>
          <span
            className="cross-btn icon-close"
            onClick={() => setIsOpen(false)}
          ></span>
          <div className="btns">
            <span className="btn-normal at_bg3" onClick={() => setIsOpen(false)}>
            Keep Shopping<small>({cartList.length})</small>
            </span>
            <Link to="/checkout" className="btn-normal at_bg2">
              checkout
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
