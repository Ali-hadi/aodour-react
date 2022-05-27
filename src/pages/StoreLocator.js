import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { POST_CONTACT_US } from "../constants/actionTypes";
import notification from "../components/Notification";
import {Helmet} from "react-helmet";

export default function StoreLocator() {
  return (
    <>
    <Helmet>
        <title>Store Locator</title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta name="description" content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery." />
      </Helmet>
      <div className="wapper">
        {/*
		=========================================
			CONTENT STARTS 
		=========================================
  		*/}
        <div className="content">
          <div className="contact_map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0817219554233!2d74.26373291547462!3d31.466938056926306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391904e4aedf2eb1%3A0x921c60172861bb44!2sAodour%20Cosmetic!5e0!3m2!1sen!2s!4v1580275465648!5m2!1sen!2s"
              allowfullscreen=""
            ></iframe>
          </div>
          <div className="light-gry padding40x">
            <div className="container-fluid">
              <div className="heading align-center">
                  <h1 className="">STORE LOCATOR</h1>
              </div>
              <div className="flaoting">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/1.jpg' alt="product image"/></a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                     <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/2.jpg' alt="product image"/></a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/3.jpg' alt="product image"/></a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/4.jpg' alt="product image"/></a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/5.jpg' alt="product image"/></a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/6.jpg' alt="product image"/></a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/7.jpg' alt="product image"/></a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/8.jpg' alt="product image"/></a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/9.jpg' alt="product image"/></a>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/10.jpg' alt="product image"/></a>
                    </div>
                  </div> 
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      <a href=""><img src='https://storage.googleapis.com/aodour_v1/store/11.jpg' alt="product image"/></a>
                    </div>
                  </div> 
                  <div className="col-lg-3 col-md-3 col-sm-4 col-xs-6">
                    <div className="grid-column">
                      
                    </div>
                  </div> 
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="iframe-column">
                      <iframe src="https://www.youtube.com/embed/abRLN57wBCw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                  </div> 
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                    <div className="iframe-column">
                      <iframe  src="https://www.youtube.com/embed/H9J39duPWgA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*
		=========================================
			CONTENT ENDS 
		=========================================
  		*/}
      </div>
    </>
  );
}
