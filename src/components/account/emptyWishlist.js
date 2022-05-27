import React from "react";
import { Link } from "react-router-dom";
const CartImage = "https://storage.googleapis.com/aodour_v1/website/shop_png.png";
export default function Profile() {
  return (
    <>
      <div className="empty_cart mt50">
        <figure>
          <img src={CartImage} alt="image here" />
        </figure>
        <h6>No Items In The wishlist</h6>
        <p>
          Ad now, Buy Later. <br />
          Save your favourite beauty items here!
        </p>
        <Link to="/" className="btn-normal at_bg3">
          start shopping
        </Link>
      </div>
    </>
  );
}
