import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/ThankYou.css";
import Helmet from 'react-helmet';

export default function ThankYou(props) {
  const id=props.match.params.id

  return (
    <div>
      <Helmet>
        <title>
          ThankYou
        </title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta
          name="description"
          content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery."
        />import { Helmet } from 'react-helmet';

      </Helmet>
      <div className="thankyou theme-bg">
        <div className="container">
          <h4>
            <i className="fa">✓</i>Your complaint ({id}) has been registered successfully. Please use Track
            Complaint to see status of your complaint
          </h4>
          <Link to="/" className="border-btn btn-normal">
            BACK TO HOME PAGE
          </Link>
          {/* <p>We will contact you for order confirmation shortly.</p> */}
        </div>
      </div>

      <div className="reviews_thanks">
        <div className="container">
          <a
            target="_blank"
            href="https://www.google.com.pk/search?ei=EbLbXO_VJ4Swaf7qh6gJ&q=aodour&oq=aodour&gs_l=psy-ab.3..0i71l8.2984.3142..3459...0.0..0.223.223.2-1......0....1..gws-wiz.j9XxHbOfVK0#lrd=0x391904e4aedf2eb1:0x921c60172861bb44,3,,,"
          >
            <div className="content_list">
              <ul className="list_1">
                <li>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
                <li>
                  <i className="fa fa-star-o" aria-hidden="true"></i>
                </li>
              </ul>
              <h4>submit your reviews</h4>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
