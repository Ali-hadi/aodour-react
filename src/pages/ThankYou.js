import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/ThankYou.css";
// import GACheckoutEvent from "../util/GoogleAnalytics";
import ReactGA from "react-ga";
import { gtagEvent } from "../util/GoogleTagManager";
import { fbqTrack } from "../util/FacebookAnalytics";
import { savyourOrderPlace } from "../util/savyour"
import { EMPTY_CART } from "../constants/actionTypes";
import { Helmet } from "react-helmet";
import insta_logo from "../assets/images/insta-logo.png"

export default function ThankYou() {
  const dispatch = useDispatch();
  const { checkoutResponse, cartList } = useSelector((state) => state);

  const GACheckoutEvent = (transaction, items) => {
    window.ga("require", "ecommerce");
    performOrderTransaction(transaction);
    for (const item of items) {
      performItemTransaction(transaction.id, item);
    }
    window.ga("ecommerce:send");
  };

  const performOrderTransaction = ({
    id,
    affiliation,
    revenue,
    shipping,
    tax,
  }) => {
    window.ga("ecommerce:addTransaction", {
      id: `${id}`,
      affiliation: `${affiliation}`,
      revenue: `${revenue}`,
      shipping: `${shipping}`,
      tax: `${tax}`,
    });
  };

  const performItemTransaction = (
    transactionId,
    { title, sku, categoryName, price, qty }
  ) => {
    // const category = category_name || sub_sub_category_name;
    window.ga("ecommerce:addItem", {
      id: `${transactionId}`,
      name: `${title}`,
      sku: `${sku}`,
      category: `${categoryName}`,
      price: `${price}`,
      quantity: `${qty}`,
    });
  };

  const getTransaction = () => {
    return {
      id: checkoutResponse.OrderNumber,
      affiliation: "Aodour",
      revenue: checkoutResponse.totalpayableamount,
      shipping: 0,
      tax: 0,
    };
  };

  const FBQCheckoutEvent = () => {
    gtagEvent("conversion", {
      send_to: "AW-835343819/f_a-CNv305QBEMurqY4D",
      value: `${checkoutResponse.totalpayableamount}`,
      currency: "PKR",
      transaction_id: `${checkoutResponse.OrderNumber}`,
    });
    gtagEvent("conversion", {
      send_to: "AW-835343819/09WjCKae_n8Qy6upjgM",
      value: `${checkoutResponse.totalpayableamount}`,
      currency: "PKR",
      transaction_id: `${checkoutResponse.OrderNumber}`,
    });
    //--------------------Loreal Google Adward-----------------------/
    gtagEvent("conversion", {
      send_to: "AW-623961244/lg9zCNbKp90BEJzJw6kC",
      value: `${checkoutResponse.totalpayableamount}`,
      currency: "PKR",
      transaction_id: `${checkoutResponse.OrderNumber}`,
    });
    gtagEvent("conversion", {
      send_to: "AW-623961244/UV9mCOeCnd0BEJzJw6kC",
      value: `${checkoutResponse.totalpayableamount}`,
      currency: "PKR",
      transaction_id: `${checkoutResponse.OrderNumber}`,
    });
    //--------------------Loreal Google Adward-----------------------/

    fbqTrack("Purchase", {
      value: `${checkoutResponse.totalpayableamount / 160}`,
      currency: "USD",
      content_ids: getSkus(),
      content_type: "product",
      contents: cartList.map((item) => ({ quantity: item.qty, id: item.sku })),
    });
  };

  useEffect(() => {
    if (cartList.length > 0 && checkoutResponse.totalpayableamount) {
      GACheckoutEvent(getTransaction(), cartList);
      FBQCheckoutEvent();
      savyourOrderPlace(checkoutResponse, cartList)

      dispatch({
        type: EMPTY_CART,
      });
    }
  }, [checkoutResponse]);

  const getSkus = () => {
    return cartList.map((item) => item.sku);
  };


  return (
    // <section>
    //   <div>
    //     <div className="content">
    //       <span className="content_1"><h4>Thanks for shopping from Aodour</h4></span>
    //       <h4>We Will contact you for</h4>
    //       <div className="content_list">
    //         <ul className="list_1">
    //         <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
    //         <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
    //         <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
    //         <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
    //         <li><i className="fa fa-star-o" aria-hidden="true"></i></li>
    //         </ul>
    //       </div>
    //       <small className="list_review">SUBMIT YOUR REVIEWS</small>
    //       <div className="link_page">
    //       <Link to="/">BACK TO HOME PAGE</Link>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <div>
      <Helmet>
        <title>Thank you</title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta
          name="description"
          content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery."
        />
      </Helmet>
      <div className="thankyou theme-bg">
        <div className="container">
          <h4>
            <i className="fa">✓</i>Your order has been placed successfully
          </h4>
          <Link to="/" className="border-btn btn-normal">
            BACK TO HOME PAGE
          </Link>
          <br />

          

          <p>We will contact you for order confirmation shortly.</p>
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
          <a
            className="btn-icon btn-normal"
            target="_blank"
            href="https://instagram.com/aodourpakistan">
            <img src={insta_logo} />
            {" "} FOLLOW US<span></span>
          </a>
        </div>
      </div>
    </div>
  );
}
