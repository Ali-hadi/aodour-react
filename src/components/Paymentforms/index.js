import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import moment from "moment";

const AlfalahPayment = ({ props }) => {
  // const [stars, setStars] = useState([]);

  useEffect(() => {});

  return (
    <div>
      <form>
        <div className="cart_form">
          <h6>MasterCard payment Gateway</h6>
        </div>
        <div className="default_form">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <label>Card Number</label>
              <div className="text_field">
                <input type="text" placeholder="Card Num" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 col-sm-12 col-xs-12">
              <label>Name of Card</label>
              <div className="text_field">
                <input type="text" placeholder="Name of Card" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-6">
              <label>Date</label>
              <div className="text_field">
                <input type="date" placeholder="mm/dd/yyyy" />
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4">
              <label>CVV</label>
              <div className="text_field">
                <input type="text" placeholder="CVV" />
              </div>
            </div>
          </div>
          <div className="button-center">
            <button className="btn-normal at_bg2">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AlfalahPayment;
