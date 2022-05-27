import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import LeftSection from "../components/account/leftSection";
import Myorders from "../components/account/Orders";
import EmptyOrder from "../components/account/NoOrder";
import "../styles/Profile_default.css";
import "../styles/svg-icons.css";
import { GET_MY_ORDERS, EMPTY_USER } from "../constants/actionTypes";
import TrackingInfoTable from "../components/TrackOrder/TrackingInfoTable";
import "../styles/TrackOrder.css";
import Loader from "../components/Loader/compnentLoader";
import { deleteUserToken } from "../util";
import notification from "../components/Notification";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const { myOrders } = useSelector((state) => state);

  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: GET_MY_ORDERS,
      callback: () => setLoading(false),
    });
  }, []);

  const getPlaced = () => {
    return myOrders.filter((order) => order.status === "Placed");
  };

  const getInProgress = () => {
    return myOrders.filter((order) => order.status === "In Progress");
  };

  const getShipped = () => {
    return myOrders.filter((order) => order.status === "Shipped");
  };

  const getReturned = () => {
    return myOrders.filter((order) => order.status === "Returned");
  };

  const getCancelled = () => {
    return myOrders.filter((order) => order.status === "Canceled");
  };

  const logout = () => {
    deleteUserToken();
    history.push("/");
    dispatch({
      type: EMPTY_USER,
    });
    notification({
      message: "User logout successful",
      error: false,
    });
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="profile_page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 col-sm-3 col-xs-12">
              <LeftSection logout={logout} page="orders" />
            </div>
            <div className="col-md-10 col-sm-9 col-xs-12">
              {myOrders.length > 0 && (
                <div className="heading align-center">
                  <h3>My Orders</h3>
                </div>
              )}
              <div className="tab_content">
                {myOrders.length > 0 ? (
                  <Tabs className="tab_orders">
                    <div className="tab_content_area">
                      <TabList className="">
                        <Tab>
                          <span>All Orders ({myOrders.length})</span>
                        </Tab>
                        <Tab>
                          <span>Placed ({getPlaced().length})</span>
                        </Tab>
                        <Tab>
                          <span>In Progress ({getInProgress().length})</span>
                        </Tab>
                        <Tab>
                          <span>Shipped ({getShipped().length})</span>
                        </Tab>
                        <Tab>
                          <span>Returned ({getReturned().length})</span>
                        </Tab>
                        <Tab>
                          <span>Cancelled ({getCancelled().length})</span>
                        </Tab>
                      </TabList>
                    </div>
                    <TabPanel>
                      <TrackingInfoTable orders={myOrders} />
                    </TabPanel>
                    <TabPanel>
                      <TrackingInfoTable orders={getPlaced()} />
                    </TabPanel>
                    <TabPanel>
                      <TrackingInfoTable orders={getInProgress()} />
                    </TabPanel>
                    <TabPanel>
                      <TrackingInfoTable orders={getShipped()} />
                    </TabPanel>
                    <TabPanel>
                      <TrackingInfoTable orders={getReturned()} />
                    </TabPanel>
                    <TabPanel>
                      <TrackingInfoTable orders={getCancelled()} />
                    </TabPanel>
                  </Tabs>
                ) : (
                  <EmptyOrder />
                )}
                {/* <Myorders /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
