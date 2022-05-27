import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/complaintform.css";
import notification from "../components/Notification";
import Leftsection from "../components/ComplaintRegistration/Leftsection";
import RightSection from "../components/ComplaintRegistration/RightSection";
import Loading from "../components/Loader/compnentLoader";
import { useHistory } from "react-router-dom";
import {
  GET_COMPLAINT_DATA,
  POST_COMPLAINT_DATA,
} from "./../constants/actionTypes";

const ComplaintForm = (props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const compliantFromData = useSelector(
    ({ compliantFromData }) => compliantFromData
  );
  const id = props.match.params.id;
  useEffect(() => {
    dispatch({
      type: GET_COMPLAINT_DATA,
      payload: {
        id,
      },
      callback: () => setLoading(false),
    });
  }, []);

  const onSubmit = (payload) => {
    if (payload.orderDetails.products.length === 0) {
      notification({ message: "Please Select at least one product", error: true });
      return;
    }
    if (payload.images.length === 0) {
      notification({ message: "Please upload at least one image", error: true });
      return;
    }
    setLoading(true);
    dispatch({
      type: POST_COMPLAINT_DATA,
      payload: {
        ...payload,
        complaintType: compliantFromData.complaintType,
        orderDetails: {
          id: compliantFromData.orders[0].id,
          customer_id: compliantFromData.orders[0].customer_id,
          ...payload.orderDetails,
        },
      },
      callback: (id) => {
        setLoading(false);
        history.push(`/complaint/thankyou/${id}`);
      },
    });
  };
  return (
    <>
      <Loading loading={loading} />
      <section>
        <div className="heading align-center">
          <h4 className="title4">Complaint Portal</h4>
        </div>
        <div className="container-fluid responsive_flex">
          <div className="floating">
            <div className="row">
              <Leftsection data={compliantFromData} onSubmit={onSubmit} />
              <RightSection data={compliantFromData} />
            </div>
          </div>
        </div>
      </section>
      <div className="bulets_points">
        <div className="container">
          <h6>How to Register complaint</h6>
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
    </>
  );
};

export default ComplaintForm;
