import React from "react";

const CampaignOfferCard = ({ showCard, setShowCard, image }) => {
  return (
    <div className="Offer_card middle" style={!showCard ? { display: "none" } : {}}>
      <span>
        <img src={image} alt="img here" />
      </span>
    </div>
  );
};

export default CampaignOfferCard;
