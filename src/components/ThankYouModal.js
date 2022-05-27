import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import "../styles/ThankYou.css";
import { gtagEvent } from "../util/GoogleTagManager";
import { fbqTrack, fbqPageView } from "../util/FacebookAnalytics";

const ThankYouModal = ({ isOpen, setIsOpen, cartList }) => {
  // const dispatch = useDispatch();
  // const { checkoutResponse } = useSelector((state) => state);

  // const GACheckoutEvent = (transaction, items) => {
  //   window.ga("require", "ecommerce");
  //   performOrderTransaction(transaction);
  //   for (const item of items) {
  //     performItemTransaction(transaction.id, item);
  //   }
  //   window.ga("ecommerce:send");
  // };

  // const performOrderTransaction = ({
  //   id,
  //   affiliation,
  //   revenue,
  //   shipping,
  //   tax,
  // }) => {
  //   window.ga("ecommerce:addTransaction", {
  //     id: `${id}`,
  //     affiliation: `${affiliation}`,
  //     revenue: `${revenue}`,
  //     shipping: `${shipping}`,
  //     tax: `${tax}`,
  //   });
  // };

  // const performItemTransaction = (
  //   transactionId,
  //   { name, sku, sub_sub_category_name, price, qty }
  // ) => {
  //   // const category = category_name || sub_sub_category_name;
  //   window.ga("ecommerce:addItem", {
  //     id: `${transactionId}`,
  //     name: `${name}`,
  //     sku: `${sku}`,
  //     category: `${sub_sub_category_name}`,
  //     price: `${price}`,
  //     quantity: `${qty}`,
  //   });
  // };

  // const getTransaction = () => {
  //   return {
  //     id: checkoutResponse.OrderNumber,
  //     affiliation: "Aodour",
  //     revenue: checkoutResponse.totalpayableamount,
  //     shipping: 0,
  //     tax: 0,
  //   };
  // };

  // const FBQCheckoutEvent = () => {
  //   gtagEvent("conversion", {
  //     send_to: "AW-835343819/f_a-CNv305QBEMurqY4D",
  //     value: `${checkoutResponse.totalpayableamount}`,
  //     currency: "PKR",
  //     transaction_id: `${checkoutResponse.OrderNumber}`,
  //   });
  //   gtagEvent("conversion", {
  //     send_to: "AW-835343819/09WjCKae_n8Qy6upjgM",
  //     value: `${checkoutResponse.totalpayableamount}`,
  //     currency: "PKR",
  //     transaction_id: `${checkoutResponse.OrderNumber}`,
  //   });
  //   fbqTrack("Purchase", {
  //     value: `${checkoutResponse.totalpayableamount / 160}`,
  //     currency: "USD",
  //     content_ids: getSkus(),
  //     content_type: "product",
  //   });
  // };

  // useEffect(() => {
  //   if (cartList.length > 0 && checkoutResponse.totalpayableamount) {
  //     GACheckoutEvent(getTransaction(), cartList);
  //     FBQCheckoutEvent();

  //     // dispatch({
  //     //   type: EMPTY_CART,
  //     // });
  //   }
  // }, [checkoutResponse]);

  // const getSkus = () => {
  //   return cartList.map((item) => item.sku);
  // };

  const onOpen = () => {
    // window.ga("send", {
    //   hitType: "pageview",
    //   page: "/thankyou",
    // });
    // fbqPageView();
  };

  return (
    <Modal
      closeTimeoutMS={500}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick={true}
      onAfterOpen={onOpen}
      className="thanksmodel"
    >
      <div>
        <div className="thankyou theme-bg">
          <div className="container">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <span
                className="cross-btn icon-close"
                data-dismiss="modal"
              ></span>
              {/* CLOSE BUTTON */}
            </button>
            <h4>
              <i className="fa">✓</i>Your order has been placed successfully
            </h4>
            <Link to="/" className="border-btn btn-normal">
              Continue Shopping 
            </Link>
            <p>We wil contact you for order confirmation shortly.</p>
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
    </Modal>
  );
};

export default ThankYouModal;
