import React, { useState } from "react";
import moment from "moment";
import ProductRow from "./ProductRow";
import { Link } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";
const TrackIcon =
  "https://storage.googleapis.com/aodour_v1/website/track_icon.png";
const OrderRow = ({
  order: {
    orderDate,
    orderNumber,
    products,
    status,
    id,
    payableAmount,
    delivered,
    courierLink,
    trackingNumber,
    order_origin,
    complaint_number,
  },
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
      <div className="tracking_table_mobile">
        <ul>
          <li>Order Nr #</li>
          <li>Amount:</li>
          <li>Order Status:</li>
          <li>Order Date:</li>
          <li>Ship From</li>
          <li>Tracing Nr #</li>
          <li>Complaint Nr #</li>
        </ul>
        <ul>
          <li>{orderNumber}</li>
          <li>Rs {payableAmount} </li>
          <li>{status}</li>
          <li>{moment(orderDate).format("D-MMM-YY hh:mm")}</li>
          <li>{order_origin}</li>
          <li>{trackingNumber}</li>
          <li>{complaint_number}</li>
        </ul>
        <div className="clearfix"></div>
        {!complaint_number && delivered===1 && (
          <Link to={`/order/${id}/complaint`} className="i-btn">
            <i className="fa fa-info-circle" aria-hidden="true"></i>
            Complaint
          </Link>
        )}
        <div className="floating_dev">
          {courierLink !== "" && (
            <a href={courierLink} className="btn_trackorder" target="_blank">
              <img src={TrackIcon} alt="img here" />
              track order
            </a>
          )}
          <span
            className="showing_order"
            onClick={() => setIsOpen((state) => !state)}
          >
            <i className="fa fa-eye" aria-hidden="true"></i> view details
          </span>
        </div>
      </div>

      <Collapse isOpen={isOpen}>
        
            {products.map((product) => (
              <ProductRow product={product} orderStatus={status} />
            ))}
         
      </Collapse>
    </>
  );
};

export default OrderRow;
