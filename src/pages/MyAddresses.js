import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LeftSection from "../components/account/leftSection";
import Addresses from "../components/account/MyProfile/Addresses";
import "../styles/Profile_default.css";
import "../styles/svg-icons.css";

export default function MyAddresses() {
  const { user } = useSelector((state) => state);

  useEffect(() => {
    // console.log(user.address);
  }, [user]);

  return (
    <>
      <div className="profile_page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 col-sm-4 col-xs-12">
              <LeftSection page="addresses" />
            </div>
            <div className="col-md-9 col-sm-8 col-xs-12">
              <div className="tab_content">
                <Addresses addresses={user.address} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
