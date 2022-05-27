import React, { useState } from "react";
import "../styles/TrackOrder.css";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import TrackingInfoTable from "../components/TrackOrder/TrackingInfoTable";
import { POST_TRACK_ORDER } from "../constants/actionTypes";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/compnentLoader";
const sliderbanner = "https://storage.googleapis.com/aodour_v1/complaint/track-banner.jpg";
export default function UnderThousand() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [type, setType] = useState("order_number");

  const {
    trackOrderResponse: { orders },
  } = useSelector((state) => state);

  const findOrder = () => {
    if (number !== "") {
      setLoading(true);
      dispatch({
        type: POST_TRACK_ORDER,
        payload: {
          number,
          type,
        },
        callback: () => setLoading(false),
      });
      setNumberError(false);
    } else {
      setNumberError(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Track Orders
        </title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta
          name="description"
          content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery."
        />
      </Helmet>
      <Loader loading={loading} />
      <div className="track_banner">
        <div className="container-fluid">
          <figure className="banner_relative">
            <img src={sliderbanner} alt="" title="" />
            <h1>
              Track <br />
              your Order
            </h1>
          </figure>
        </div>
      </div>
      <div className="container-fluid">
        <div className="caption">
          <p>
            To track your order please enter your Order ID in the box below and
            press the “Find My Order” button.This was given to your on your
            receipt and in the confirmation email you should have received.
          </p>
        </div>
      </div>
      <div className="order_felid">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-6">
              <div className="selectric ">
                <select
                  value={type}
                  onChange={({ target: { value } }) => setType(value)}
                >
                  <option value="order_number">Order Number</option>
                  <option value="tracking_number">Tracking Number</option>
                  <option value="contact_number">Contact Number</option>
                </select>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-6">
              <div className="text_field">
                {numberError && (
                  <p style={{ color: "red" }}>Field cannot be empty</p>
                )}
                <input
                  type="text"
                  placeholder={`${
                    type === "order_number"
                      ? "Enter Order Number"
                      : type === "tracking_number"
                      ? "Enter Tracking Number"
                      : "Enter Contact Number"
                  }`}
                  value={number}
                  onChange={({ target: { value } }) => setNumber(value)}
                  onBlur={({ target: { value } }) =>
                    value !== "" ? setNumberError(false) : setNumberError(true)
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-5">
              <button
                type="submit"
                className="btn-normal wd100 bg-1"
                onClick={findOrder}
              >
                find my order
              </button>
            </div>

            {/* 
            ==========================================
                    Cancel My Order Section 
            ==========================================
             */}

            {/* <div className="col-md-4 col-sm-4 col-xs-6">
              <div className="selectric">
                <select>
                  <option >Cancel Order</option>
                </select>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-6">
              <div className="text_field">
                {numberError && (
                  <p style={{ color: "red" }}>Field cannot be empty</p>
                )}
                <input
                  type="text"
                  placeholder={`Enter Order Number`}/>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-5">
              <button
                type="submit"
                className="btn-normal wd100 bg-1">
                Cancel order
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <div className="product_table">
        <div className="container-fluid">
          <TrackingInfoTable orders={orders} />
          <div className="track_order_content">
            <div className="caption">
              <p>
                You can track the status of your order online at Aodour. Enter
                your order number / contact number / tracking ID to check the
                status of your most recent order and your order history. Click
                on the order number for the shipment that you would like to
                track and a detailed order information page will be displayed.
                Click on order number to view detailed tracking information. You
                can review the tracking history and the estimated date of
                delivery. Please estimate 7 - 10 business days from the time
                your order has been placed.
              </p>
            </div>
            <h5>ORDER STATUSES:</h5>
            <ul>
              <li>
                <p>
                  <b>Order Submitted - "Placed"</b>
                  <br /> Once you have placed your order on Aodour, your order
                  status will appear as "Placed."
                </p>
              </li>
              <li>
                <p>
                  <b>Order Processing - "In Progress"</b>
                  <br /> Once you have placed your order, it will be sent to our
                  warehouse to be processed and packed for shipment. During this
                  time, your order status will appear as "In Progress." Please
                  allow 3 - 5 business days for the order to be processed and
                  prepared for shipment. Once the order enters the "In Progress"
                  status, no changes, or cancellations of your order can be
                  made.
                </p>
              </li>
              <li>
                <p>
                  <b>Order Delivery - "Shipped"</b>
                  <br />
                  Once your order has left our warehouse, the order status will
                  appear as "Shipped."
                </p>
              </li>
              <li>
                <p>
                  <b>Order Returned - "Returned"</b>
                  <br />
                  It takes up to 10 to 15 days to process the return. Once your
                  order has been returned and processed, the order status will
                  show "Returned." We will notify you via e-mail once your
                  return has been processed.
                </p>
              </li>
            </ul>
            <h5>CANCELING OR MODIFYING AN ORDER</h5>
            <p>
              Before you place your order, you can view the contents and the
              total amount in your shopping basket. Once your order has been
              submitted successfully, the order will be placed in a "Placed"
              status. Your order is then "In Progress," entering the shipping
              process almost immediately. The only time that you can cancel or
              modify your order is during "Placed" status. Once your order
              enters the shipping process by being "In Progress," no further
              changes can be made.
              <br />
              <br />
              If the order has been "In Progress," we are unable to cancel or
              modify your order.
            </p>
            <div className="bulets_points">
              <h5>HOW TO REGISTER COMPLAINT</h5>
              <ol>
                <li>Enter your Order number / Contact no / Tracking No. of delivered parcel in “Order Tracking”</li>
                <li>Select the order you want to complaint against by clicking “complaint button” </li>
                <li>Select the complaint type (Damaged Product, Incomplete Order, need to exchange, want to return)</li>
                <li>Select the relevant products against which you want to submit complaint </li>
                <li>Select Reason of relevant complaint type from drop down box</li>
                <li>Enter the complaint notes in the text box </li>
                <li>Upload the attachment of relevant evidence against which complaint has to be submitted (Invoice, Product image, box image etc.) </li>
                <li>Click on submit complaint in order to receive your Complaint no. for further tracking </li>
                <li>Once submitted our agent will contact you in 24 working hours to verify your complaint for further process </li>
              </ol> 
          </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
