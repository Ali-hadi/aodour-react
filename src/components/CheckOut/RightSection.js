import React, { useState } from "react";
import ProductCard from "./ProductCard";
import Collapse from "@kunukn/react-collapse";
import PaymentMethod from "../../constants/paymentMethods";
const promo = "https://storage.googleapis.com/aodour_v1/images/11compaign/com-title.png";
export default function RightSection({
  cartList,
  handleCheckout,
  outOfStockProducts,
  totalPrice,
  cartListEmptyError,
  submitDisabled,
  setSubmitDisabled,
  getDeliveryCharges,
  setVoucher_code,
  voucher_code,
  getDiscount,
  getVocherDiscount,
  getFlashOfferDiscount,
  paymentMethod,
}) {
  const [open, setOpen] = useState(true);
  const [promo_code, setPromo_code] = useState("");
  const [promoCodeError, setPromoCodeError] = useState(false)

  const deliveryCharges = () => {
    if (getDeliveryCharges) {
      return getDeliveryCharges();
    }
    return 200;   
  };

  const checkIsOutOfStock = (product) => {
    for (const p of outOfStockProducts) {
      if (p.id === product.id) {
        return true;
      }
    }
    return false;
  };

  const applyPromoCode = (e) => {

    e.preventDefault()
    // if (promo_code.toLocaleUpperCase() === "EXTRA10OFF") {
    //   setVoucher_code(promo_code)
    //   setPromoCodeError(false)
    //   setPromo_code("")
    // } else {
      setVoucher_code(null)
      setPromoCodeError(true)
      setPromo_code("")
    // }
  }

  return (
    <>
      <div className="widget_cart">
        
        {cartListEmptyError && (
          <h5 style={{ color: "red", marginBottom: 10 }}>
            Cart is empty. Add products in cart.
          </h5>
        )}
        {cartList.length > 0 &&
          cartList.map((product) => (
            <ProductCard
              product={product}
              checkIsOutOfStock={checkIsOutOfStock}
            />
          ))}

        <div className="promo_code_blog">
          <h6 onClick={() => setOpen((state) => !state)}>
            <i className={`${open ? "icon-minus" : "icon-plus"}`}
              aria-hidden="true"></i>
            Promo code
          </h6>

          <Collapse isOpen={open}>
            <form className="collapse_dev">
              <div className="promo_code">
                <input type="text" name="promo_code" value={promo_code}
                  className={promoCodeError ? "input-error" : ""} 
                  onChange={e => setPromo_code(e.target.value)} placeholder="Enter your promo code" />
                <button onClick={applyPromoCode} disabled={voucher_code != null} className="btn-normal  at_bg2">
                  Apply
                </button>
              </div>
              {promoCodeError && <p style={{ color: "red", marginTop: -7 }}>Invalid Promo Code</p>}
              {/* <div className="caption">
                <p>
                  Not Applicable on "Masks" and "MAC" products. Derma vouchers
                  are only for skin-care products
                </p>
              </div> */}
            </form>
          </Collapse>

          <div className="total_bar">
            <ul>
              <li>
                <span>Items</span>
                <span>Rs. {totalPrice()}</span>
              </li>
              <li>
                <span>Discount</span>
                <span>Rs. {getDiscount()}</span>
              </li>
              {/* <li>
                <span>Discount
                   on discount
                   </span>
                <span>Rs. {getFlashOfferDiscount()}</span>
              </li> */}
              {/* <li>
                <span>Voucher discount</span>
                <span>Rs. {getVocherDiscount()}</span>
              </li> */}
              <li>
                <span>Shipping</span>
                <span>Rs. {deliveryCharges()}</span>
              </li>
              <li>
                <h5>Total:</h5>
                <h5>Rs. {totalPrice() + deliveryCharges() - getDiscount() - getVocherDiscount() - getFlashOfferDiscount()}</h5>
              </li>
            </ul>
            <button
              disabled={submitDisabled || paymentMethod == PaymentMethod.DEBIT_CREDIT_CARD}
              type="button"
              className="btn-normal  at_bg2"
              onClick={(e) => {
                // setSubmitDisabled(true);
                handleCheckout();
              }}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
