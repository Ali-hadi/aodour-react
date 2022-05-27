import React from "react";

const RightSection = ({ data }) => {
  if (data?.orders?.length>0)
    return (
      <div className="col-md-3 col-sm-6 col-xs-12">
        <div className="sprator_50"></div>
        <div className="order_column_rtl">
          <h6>Order Details</h6>
          <div className="order_info">
            <ul>
              <li>
                Name:
                <span>
                  {data.orders[0]?.first_name} {data.orders[0]?.last_name}
                </span>
              </li>
              <li>
                Contact.#<span>{data.orders[0]?.phone}</span>
              </li>
              <li>
                Email:<span className="texthidden">{data.orders[0]?.email}</span>
              </li>
              <li>
                Address:
                <span>{data.orders[0]?.address}</span>
              </li>
              <li>
                Order Number:<span>{data.orders[0]?.orderNumber}</span>
              </li>
              <li>
                Order Amount:<span>Rs {data.orders[0]?.payableAmount}/-</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );


    return null;
};

export default RightSection;
