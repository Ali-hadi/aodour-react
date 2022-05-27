import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { Link } from "react-router-dom";

export default function NeedToLogin({ isOpen, setIsOpen }) {
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
            <span>Login to save the item in wishlist</span>
          </div>
          <span
            className="cross-btn icon-close"
            onClick={() => setIsOpen(false)}
          ></span>
          <div className="notify_content">
            <Link to="/login" className="btn-normal at_bg2">
              login
            </Link>
            <span className="underline-btn" onClick={() => setIsOpen(false)}>
            Keep Shopping
            </span>
          </div>
        </div>
        <div className="notify_model_mobile">
          <div className="notify_head align-left">
            <span>Login to save the item in wishlist</span>
          </div>
          <span
            className="cross-btn icon-close"
            onClick={() => setIsOpen(false)}
          ></span>
          <div className="btns">
            <span className="btn-normal at_bg3" onClick={() => setIsOpen(false)}>
            Keep Shopping
            </span>
            <Link to="/login" className="btn-normal at_bg2">
              login
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
