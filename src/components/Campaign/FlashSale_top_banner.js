import React from "react";
import { Link } from "react-router-dom";
const Banner_Image = "https://storage.googleapis.com/aodour_v1/website/Garnier/Upper-Banner.jpg";
const Banner_Mobile = "https://storage.googleapis.com/aodour_v1/website/Garnier/Upper-Banner-Mobile.jpg";


// const Banner_Mobile = "https://storage.googleapis.com/aodour_v1/website/Upper-Banner-Mobile3.jpg";
// const Banner_Image = "https://storage.googleapis.com/aodour_v1/website/Upper-Banner3.jpg";
const CompaignFlashsale = () => {
  return (
    <>
    <a href="https://ecom-awards.com/nominee/aodour" className="top_banner">
      <div className="addontop for_mobile_desktop">
        <img src={Banner_Image} alt="sale banenr"/>
      </div>

      <div className="addontop for_mobile_top">
        <img src={Banner_Mobile} alt="sale banenr"/>
      </div>
      {/* <div className="bg_heart"></div> */}
    </a>
    </>
  );
};

export default CompaignFlashsale;
