import React, { useState } from "react";
import "../styles/TrackOrder.css";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ComplaintInfoTable from "../components/Complaint/ComplaintInfoTable";
import {
  POST_TRACK_ORDER,
  POST_COMPLAINT_IMAGE,
  POST_TRACK_COMPLAINT,
} from "../constants/actionTypes";
import notification from "../components/Notification";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/compnentLoader";
import UploadImageModel from "../components/UploadImagesModal";
export default function UnderThousand() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState(false);
  const [type, setType] = useState("complaint_number");

  const {
    trackComplaintResponse: { orders },
  } = useSelector((state) => state);

  const findOrder = () => {
    if (number !== "") {
      setLoading(true);
      dispatch({
        type: POST_TRACK_COMPLAINT,
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

  const onSubmitHandler = (images, cb) => {
    setLoading(true);
    dispatch({
      type: POST_COMPLAINT_IMAGE,
      payload: {
        ordercomplaintid: selectedProduct,
        images,
      },
      callback: () => {
        notification({
          message: "Images uploaded Successfully",
          error: false,
        });

        dispatch({
          type: POST_TRACK_COMPLAINT,
          payload: {
            number,
            type,
          },
          callback: () => {
            setLoading(false);
            cb();
          },
        });
      },
    });
  };

  const placeholder = () => {
    switch (type) {
      case "complaint_number":
        return "Enter Complaint Number";
      case "contact_number":
        return "Enter Contact Number";
      default:
        return "Enter Order Number";
    }
  };
  return (
    <>
      <Helmet>
        <title>
           Track Complaint
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
            <img
              src="https://storage.googleapis.com/aodour_v1/complaint/complaint-banner.jpg"
              alt=""
              title=""
            />
            <h1>
              Track <br />
              your Complaint
            </h1>
          </figure>
        </div>
      </div>
      <div className="container-fluid">
        <div className="caption">
          <p>
            To track your compaint please enter your Complaint Number in the box
            below and press the “Find My Complaint Status" button. You can view
            complaint number against order in My Orders tab.
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
                  <option value="complaint_number">Complaint Number</option>
                  <option value="contact_number">Contact Number</option>
                  <option value="order_number">Order Number</option>
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
                  placeholder={placeholder()}
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
                Find my Complaint
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="product_table">
        <div className="container-fluid">
          <ComplaintInfoTable
            orders={orders}
            setSelectedProduct={setSelectedProduct}
            onSubmitHandler={onSubmitHandler}
          />
          <div className="track_order_content">
            <div className="caption">
              <p>You can track the status of your complaint online at Aodour. Enter your Complaint No. / Contact number / Order no. to check the status of your complaint history. Click on show detail to view detailed information. Please estimate 24 hours to get your complaint registered by our agent and gives you confirmation for further process.
              </p>
            </div>
            <h5>COMPLAINT STATUSES:</h5>
            <ul>
              <li>
                <p>
                  <b>Complaint Submitted - "Pending"</b>
                  <br /> Customer support executive will contact you to confirm your complaint.
                </p>
              </li>
              <li>
                <p>
                  <b>Complaint Registered - "In Progress"</b>
                  <br />
                  Your complaint has been successfully registered and assigned to related department for fulfilment.
                </p>
              </li>
              <li>
                <p>
                  <b>Complaint Resolved - "Closed"</b>
                  <br />
                  Required action has been taken against your complaint and after acknowledgement complaint has been closed.
                </p>
              </li>
              <li>
                <p>
                  <b>Complaint “Invalid/Rejected”</b>
                  <br />
                  After investigation if a complaint not fall as per policy of company or not justified in order to take any further action the complaint has been marked as invalid
                </p>
              </li>
            </ul>
            <h5><b>POLICIES:</b></h5>
            <ol>
              <li>
                <p>Complaint will be considered valid if generated within 72 hours after delivery</p>
              </li>
              <li>
                <p>Customer need to attach proper evidence in order to make his/her complaint successfully registered</p>
              </li>
              <li>
                <p>Any used product cannot be returned to Aodour neither customer can claim any return or refund </p>
              </li>
              <li>
                <p>
                  For replacement of any damaged product the lead delivery time will be 5-7 Days
                </p>
              </li>
              <li>
                <p>For refund the customer has to provide complete banking details (IBAN acc no.- Bank Name - Account title). The lead time to generate refund is 48 working hours (That can be increased if any issue in banking channel)</p>
              </li>
              <li>
                If customer has to return the product to Aodour then customer will send the parcel to 387-L DHA phase V mentioning (Order No. & Return). 
                Upload the courier slip in supporting attachment against your complaint. Once received and checked as per SOP of product condition it will be processed for further action
              </li>
              <li>
                <p>Aodour reserves the right to change this policy</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <UploadImageModel
        isOpen={selectedProduct ? true : false}
        onClose={() => setSelectedProduct(null)}
        onSubmitHandler={onSubmitHandler}
      />
    </>
  );
}
