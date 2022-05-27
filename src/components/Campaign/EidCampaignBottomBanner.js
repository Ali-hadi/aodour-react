import React from "react";
import { Link } from "react-router-dom";
const EidCampaignBottomBanner = () => {
  const DiscountBanner = "https://storage.googleapis.com/aodour_v1/campaign/bottom_banner.jpg";

  return (
    <Link to="/grand-loreal-sale">
      <div className="discount_banner">
        <figure>
          <img src={DiscountBanner} alt="img here" />
        </figure>
      </div>
    </Link>
  );
};

export default EidCampaignBottomBanner;
