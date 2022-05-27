import React from "react";
import ComplaintRow from "./ComplaintRow";
import ComplaintRowMobile from "./ComplaintRowMobile";

const ComplaintInfoTable = ({ orders,setSelectedProduct }) => {
  return (
    <>
      <table className="table_style b-line res_none">
        <thead>
          <tr>
            <th>Order Nr #</th>
            <th>Order Date</th>
            <th>Complaint Nr #</th>
            <th>Complaint Date</th>
            <th>Complaint Status</th>
            <th>Additional information</th>
            <th></th>
          </tr>
        </thead>
      </table>

      {orders.map((order) => (
        <ComplaintRow order={order} setSelectedProduct={setSelectedProduct}/>
      ))}
      {orders.map((order) => (
        <ComplaintRowMobile order={order} setSelectedProduct={setSelectedProduct} />
      ))}
    </>
  );
};

export default ComplaintInfoTable;
