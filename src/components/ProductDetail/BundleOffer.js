import React from "react";
import {Link} from 'react-router-dom';
export default function BundleOffer() {
  return (
    <>
      <div className="col-md-12 col-sm-12 col-xs-12">
        <div className="heading_style_2">
          <h5>Bundle Offers</h5>
        </div>
      </div>

      <div className="col-lg-10 col-md-10 col-sm-9 col-xs-12">
        <div className="pro_blog">
          <div className="row">
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="pro-item">
                <figure>
                  <img src="extra-images/prodcut_sm_1.png" alt="img here" />
                </figure>
                <div className="pro-content">
                  <h6>Mario Bedescu Skin Care</h6>
                  <span>rs. 4200</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="pro-item">
                <figure>
                  <img src="extra-images/prodcut_sm_1.png" alt="img here" />
                </figure>
                <div className="pro-content">
                  <h6>Mario Bedescu Skin Care</h6>
                  <span>rs. 4200</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="pro-item">
                <figure>
                  <img src="extra-images/prodcut_sm_1.png" alt="img here" />
                </figure>
                <div className="pro-content">
                  <h6>Mario Bedescu Skin Care</h6>
                  <span>rs. 4200</span>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-sm-6 col-xs-12">
              <div className="pro-item">
                <figure>
                  <img src="extra-images/prodcut_sm_1.png" alt="img here" />
                </figure>
                <div className="pro-content">
                  <h6>Mario Bedescu Skin Care</h6>
                  <span>rs. 4200</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-md-2 col-sm-3 col-xs-12">
        <div className="bundle-adding">
          <div className="qty-added">
            <button className="down_count" title="Down">
              <i className="icon-minus"></i>
            </button>
            <input
              className="counter"
              type="text"
              placeholder="value..."
              value="0"
            />
            <button className="up_count" title="Up">
              <i className="icon-plus"></i>
            </button>
          </div>
          <h3 className="clr1">pkr. 10200</h3>
          <h5>
            <del>was. 12200</del>
          </h5>
          <Link to='/'  className="btn-normal  at_bg4">
            <i className="fa fa-shopping-basket" aria-hidden="true"></i>
            add to cart
          </Link>
        </div>
      </div>
    </>
  );
}
