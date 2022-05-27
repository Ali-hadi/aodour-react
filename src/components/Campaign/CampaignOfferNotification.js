import React from "react";
import Notification from "rc-notification";
import "rc-notification/assets/index.css";
import "../../styles/gift.css";

let notification = null;
Notification.newInstance(
  { maxCount: 1, style: { top: "300px", right: 0 } },
  (n) => (notification = n)
);




export default function CampaignOfferNotification({ image, prCount=3 }) {
  return notification.notice({
    duration: 3,
    className: "notification_offers",
    style: { background: '#344447' },
    content: (
      <div className="Offer_card middle">
        {/* <button className="cross-btn icon-close" ></button> */}
        <span>
        <h6 className="title_nofi">add <b>{prCount}</b> more product to win</h6>
          <img src={image} alt="img here" />
        </span>
      </div>
    ),
  });
}
