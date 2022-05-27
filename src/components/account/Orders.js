import React from "react";
import { Link } from "react-router-dom";
export default function Profile() {
  return (
    <>
      <div className="ao_ordertable">
        <div className="heading align-center mb14">
          <h4>my orders</h4>
        </div>

        <div className="nav_tab">
          <ul>
            <li>
              All Orders<span>(1)</span>
            </li>
            <li>
              In confirmation<span>(1)</span>
            </li>
            <li>
              Procesing<span>(1)</span>
            </li>
            <li>
              Dispatched<span>(1)</span>
            </li>
            <li>
              Received<span>(1)</span>
            </li>
          </ul>
        </div>

        <div className="profile_table">
          <table className="table_style res_mobo">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Amount</th>
                <th>Order Status</th>
                <th>Order Date</th>
                <th></th>
              </tr>
            </thead>
          </table>

          <table className="signal_row">
            <thead>
              <tr>
                <th>Q537</th>
                <th>Rs. 910.00</th>
                <th>Shipped</th>
                <th>May 14, 2020 1:56 PM</th>
                <th>
                  <span className="icon-plus" aria-hidden="true"></span>
                </th>
              </tr>
            </thead>
          </table>

          <table className="table_style">
            <thead>
              <tr>
                <th>Image</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <img
                    className="track_order_product_image"
                    src="https://storage.googleapis.com/aodour_v1/products/8809416470245.jpg"
                    alt="Cosrx "
                  />
                </td>
                <td>
                  Estee Lauder
                  <br />
                  Perfectly Clean Multi Action
                  <br />
                  Volume: 150ml
                  <br />
                  Shade: N/A{" "}
                </td>
                <td>x 1</td>
                <td>
                  Rs. <del>1250/-</del> 950/-
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    className="track_order_product_image"
                    src="https://storage.googleapis.com/aodour_v1/products/8809416470245.jpg"
                    alt="Cosrx "
                  />
                </td>
                <td>
                  Estee Lauder
                  <br />
                  Perfectly Clean Multi Action
                  <br />
                  Volume: 150ml
                  <br />
                  Shade: N/A{" "}
                </td>
                <td>x 1</td>
                <td>
                  Rs. <del>1250/-</del> 950/-
                </td>
              </tr>
              <tr>
                <td>
                  <img
                    className="track_order_product_image"
                    src="https://storage.googleapis.com/aodour_v1/products/8809416470245.jpg"
                    alt="Cosrx "
                  />
                </td>
                <td>
                  Estee Lauder
                  <br />
                  Perfectly Clean Multi Action
                  <br />
                  Volume: 150ml
                  <br />
                  Shade: N/A{" "}
                </td>
                <td>x 1</td>
                <td>
                  Rs. <del>1250/-</del> 950/-
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td><h5 className="pull-right"></h5></td>
                <td><h5 className="pull-right"></h5></td>
                <td><h5 className="pull-right"></h5></td>
                <td><h5 className="pull-right"></h5></td>
                <td><span>Delivery Charges</span></td>
                <td><span className="pull-right">Rs.200/-</span></td>
              </tr>
            </tfoot>
          </table>
          
        </div>
      </div>
    </>
  );
}
