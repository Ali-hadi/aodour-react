import React, { useState } from "react";
import moment from "moment";
import ComplaintProductRow from "./ComplaintProductRow";
import { Link } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";
const TrackIcon =
  "https://storage.googleapis.com/aodour_v1/website/track_icon.png";
const ComplaintRowMobile = ({
  order: {
    orderDate,
    orderNumber,
    products,
    complaintDate,
    complaint_number,
    complaintId,
    status,
    complaintstatus,
    courierLink,
    trackingNumber,
    imageRequired,
  },
  setSelectedProduct,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalAmount = () => {
    let total = 0;
    products.map(({ quantity, price, discountPrice }) => {
      total = total + (price - discountPrice) * quantity;
    });

    return total;
  };

  return (
    <>
      <div className="tracking_table_mobile cms_style">
        <ul>
          <li>Order Nr #</li>
          <li>Order Date:</li>
          <li>Complaint Nr #</li>
          <li>Complaint Date:</li>
          <li>Complaint Status:</li>
          <li>Additional information:</li>
          <li>
            <span
              className="showing_order pull-left"
              onClick={() => setIsOpen((state) => !state)}
            >
              <i className="fa fa-eye" aria-hidden="true"></i> view details
            </span>
          </li>
        </ul>

        <ul>
          <li>{orderNumber}</li>
          <li>{moment(orderDate).format("D-MMM-YY hh:mm")}</li>
          <li>{complaint_number}</li>
          <li>{moment(complaintDate).format("D-MMM-YY hh:mm")}</li>
          <li>{complaintstatus}</li>
          <li>
            {imageRequired == !0 && (
              <button
                className="i-btn"
                onClick={() => setSelectedProduct(complaintId)}
              >
                <i className="fa fa-paperclip" aria-hidden="true"></i>Send File
              </button>
            )}
          </li>
        </ul>
        <br />
      </div>


      <Collapse isOpen={isOpen}>
        {products?.map((product) => (
          <ComplaintProductRow product={product} orderStatus={status} />
        ))}
      </Collapse>


    </>
  );
};

export default ComplaintRowMobile;
