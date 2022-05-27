import React from "react";
import OrderRow from "./OrderRow";
import OrderRowMobile from "./OrderRowMobile";

const TrackingInfoTable = ({ orders }) => {
  return (
    <>
      {orders.length > 0 && (
        <table className="table_style res_none">
          <thead>
            <tr>
              <th>Order Nr #</th>
              <th>Amount</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th>Tracing Nr #</th>
              <th>Complaint Nr #</th>
              <th>Ship From</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
        </table>
      )}
      {orders.map((order) => (
        <OrderRow order={order} />
      ))}
      {orders.map((order) => (
        <>
          <OrderRowMobile order={order} />
          {/* <Collapse isOpen={isOpen}>
            <table className="table_style for_mobile">
              <tbody>
                {order.products.map((product) => (
                  <ProductRow product={product} orderStatus={order.status} />
                ))}
              </tbody>
            </table>
          </Collapse> */}
        </>
      ))}
    </>
  );
};

export default TrackingInfoTable;
