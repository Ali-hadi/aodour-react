import React, { useState } from "react";
import moment from "moment";
import ComplaintProductRow from "./ComplaintProductRow";
import { Link } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";
const TrackIcon =
  "https://storage.googleapis.com/aodour_v1/website/track_icon.png";
const ComplaintRow = ({
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

  return (
    <>
      <table className="signal_row res_none">
        <tbody>
          <tr>
            <th>{orderNumber}</th>
            <th>{moment(orderDate).format("D-MMM-YY hh:mm")}</th>
            <th>{complaint_number}</th>
            <th>{moment(complaintDate).format("D-MMM-YY hh:mm")}</th>
            <th>{complaintstatus}</th>
            <th>
              {imageRequired == !0 && (
                <button
                  className="i-btn"
                  onClick={() => setSelectedProduct(complaintId)}
                >
                  <i className="fa fa-paperclip" aria-hidden="true"></i>Send
                  Images
                </button>
              )}
            </th>
            <th>
              <div className="right_contents">
                <span
                  className={isOpen ? "show" : "hide"}
                  aria-hidden="true"
                  onClick={() => setIsOpen((state) => !state)}
                >
                  <span className="show">Show Detail</span>
                  <span className="hide">hide Detail</span>
                </span>
              </div>
            </th>
          </tr>
        </tbody>
      </table>
      <Collapse isOpen={isOpen}>
        {products?.map((product) => (
          <ComplaintProductRow product={product} orderStatus={status} />
        ))} 
      </Collapse>
    </>
  );
};

export default ComplaintRow;
