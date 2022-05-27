import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Filters from "./Filters";
import QuickBuyModal from "./QuickBuyModal";
import NotifyMeModal from "./NotifyMeModal";
import AddToCartModal from "../AddToCartModel";
import { gtagEvent } from "../../util/GoogleTagManager";
import { fbqTrack } from "../../util/FacebookAnalytics";
import { isMobile } from "react-device-detect";
import notification from "../Notification";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import moment from "moment";

import {
  ADD_TO_CART,
  INCREMENT_DECREMENT_QANTITY,
  DELETE_WISHLIST,
  GET_CITIES_LISTINGS,
  GET_FREE_GIFTS,
} from "../../constants/actionTypes";
import ThankYouModal from "../ThankYouModal";
import { isUserLoggedIn } from "../../util";
import LoginModal from "../account/LoginModal";
import { ADD_WISHLIST } from "./../../constants/actionTypes";
import NeedToLogin from "../account/NeedToLogin";
import CountDown from "../../components/countDown"
const Tag3 = "https://storage.googleapis.com/aodour_v1/campaign_images/detail_tag.png";
export default function ProductContent({
  attributes,
  selectedProduct,
  setSelectedProduct,
  productDetailPage,
  getStars,
  Product: { name, sku, price, brand_name, description, short_description, productType },
  selectedVariationId,
  features,
  totalReviews,
}) {
  const {
    country_name,
    country_flag,
    attribute_name,
    city_name,
    attribute_value,
    attribute_unit,
    name: productName,

  } = productDetailPage.product[0];

  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);

  const [qty, setQty] = useState(1);
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);
  const [isNotifyMeOpen, setIsNotifyMeOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [showLimitText, setShowLimitText] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const { cartList } = useSelector((state) => state);

  const dispatch = useDispatch();

  const transform = (node, index) => {
    if (node.type === "tag" && node.name === "pre") {
      node.name = "div";
      // console.log(node);
      return convertNodeToElement(node, index, transform);
    }
  };

  const addToCart = (e, fromWishLink = false) => {
    if (selectedProduct.available_quantity >= qty) {
      dispatch({
        type: ADD_TO_CART,
        payload: {
          id: selectedProduct.id,
          title: selectedProduct.name,
          images: selectedProduct.images,
          price: selectedProduct.price,
          availableQuantity: selectedProduct.available_stock,
          sku: selectedProduct.sku,
          rating: selectedProduct.rating,
          activeCampaignName: selectedProduct.activeCampaignName,
          discountPercentage: selectedProduct.discount_percentage,
          discountPrice: selectedProduct.discount_price,
          brandSlug: selectedProduct.brand_slug,
          variationSlug: selectedProduct.product_variation_slug,
          totalComments: selectedProduct.total_comments,
          productName: productDetailPage.product.length
            ? productDetailPage.product[0].name
            : "",
          qty: qty,
          attributes: selectedProduct.attributes,
          categoryName: selectedProduct.sub_sub_category_name,
          discountEndTime: selectedProduct.discount_end_time,
          discountStartTime: selectedProduct.discount_start_time,
          city_name: city_name,
        },
      });
      gtagEvent("add_to_cart", {
        value: `${selectedProduct.price}`,
        items: [
          {
            id: `${selectedProduct.sku}`,
            google_business_vertical: "retail",
          },
        ],
      });
      if (!fromWishLink) {
        setIsCartModalOpen(true);
      }

      fbqTrack("AddToCart", {
        content_ids: `["${selectedProduct.sku}"]`,
        // content_id: `${selectedProduct.sku}`,
        content_type: "product",
        // contents: [{ quantity: 1, id: `${selectedProduct.sku}` }],
        value: `${selectedProduct.price}`,
        currency: 'PKR'
      });
    } else {
      notification({ message: "Please change the quantity" });
    }
  };

  const changeQty = (newQty) => {
    const found = cartList.find((item) => item.id === selectedProduct.id);
    if (found) {
      if (found.qty + newQty <= 5) {
        setQty(newQty);
        // setShowLimitText(false);
        return;
      }
    } else if (newQty <= 5) {
      setQty(newQty);
      // setShowLimitText(false);
      return;
    }
    setShowLimitText(true);
  };

  const openQuickBuy = () => {
    setIsQuickBuyOpen(true);
  };

  const openNotifyMe = () => {
    setIsNotifyMeOpen(true);
  };

  const openThankYouModal = () => {
    setIsThankYouModalOpen(true);
  };

  useEffect(() => {
    dispatch({ type: GET_CITIES_LISTINGS });
    // dispatch({ type: GET_FREE_GIFTS });
  }, []);


  const getPriceElement = (ignoreDate = false) => {

    let priceElement = <h4 className="price_tag">Rs. {Math.round(price)}</h4>;
    if (
      selectedProduct.discount_start_time &&
      selectedProduct.discount_end_time &&
      selectedProduct.discount_percentage > 0
    ) {
      
      if (
        moment().isSameOrAfter(selectedProduct.discount_start_time) &&
        moment().isSameOrBefore(selectedProduct.discount_end_time)
      ) {

        priceElement = (
          <>
            {/* <h4 className="bg_value">
              <del> Rs.{Math.round(price)}{" "} </del>
              <span>Rs.{Math.round(price - selectedProduct.discount_price)}</span>
            </h4> */}
            <h4 className="price_tag">
              <del> Rs.{Math.round(price)}{" "} </del>
              Rs.{Math.round(price - selectedProduct.discount_price)}
            </h4>
            {/* <del className="del_price"> Rs.{Math.round(price)}{" "} </del>
            <div className="prices11"> Rs.{Math.round(price - selectedProduct.discount_price)}</div> */}

          </>
        );
      } else if(moment().isBefore(selectedProduct.discount_start_time) && selectedProduct.activeCampaignName === 'Beloved Sale') {
        priceElement = (
          <>
            <h4 className="price_tag">Rs. {Math.round(price)}</h4>
            <div class="prices12">Rs.{Math.round(price - selectedProduct.discount_price)}<small>will be live on 09 Feb</small></div>
          </>
        );
      }
    }
    return priceElement;
  };



  const getOriginalPrice = (ignoreDate = false) => {
    let priceElement = <>Rs. {Math.round(price)}</>;
    if (
      selectedProduct.discount_start_time &&
      selectedProduct.discount_end_time
    ) {
      if (
        moment().isSameOrAfter(selectedProduct.discount_start_time) &&
        moment().isSameOrBefore(selectedProduct.discount_end_time)
      ) {
        priceElement = (
          <>
            {/* Rs.{Math.round(price - selectedProduct.discount_price)}{" "}
            {selectedProduct.discount_percentage > 0 && (*/}
            <del className="del_price"> Rs.{Math.round(price)}</del>
            {/*})}*/}
          </>
        );
      }
    }
    return priceElement;
  };





  const getPriceElement2 = (ignoreDate = false) => {

    let priceElement = <>
      RS. {Math.round(price)}
      <div className="prices12">Rs.{Math.round(price - selectedProduct.discount_price)}<small> will be live on {moment(selectedProduct.discount_start_time).format('DD-MM')}</small></div>
    </>
    if (
      selectedProduct.discount_percentage > 0 &&
      selectedProduct.discount_start_time &&
      selectedProduct.discount_end_time
    ) {
      if (
        moment().isSameOrAfter(selectedProduct.discount_start_time) &&
        moment().isSameOrBefore(selectedProduct.discount_end_time)
      ) {
        priceElement = (
          priceElement = <> <del className="del_price">Rs. {Math.round(price)}</del>Rs.{Math.round(price - selectedProduct.discount_price)}</>
        );
      } else {
        priceElement = <></>
      }
    }
    //  if(moment(selectedProduct.discount_start_time).isSameOrAfter('02-11-2020T00:00:00') &&
    // moment(selectedProduct.discount_end_time).isSameOrBefore('15-11-2020T00:00:00')){
    //   priceElement = <>
    //   RS. {Math.round(price)}
    //   <div className="prices12">Rs.{Math.round(price - selectedProduct.discount_price)}<small> will be live on {moment(selectedProduct.discount_start_time).format('DD-MM')}</small></div>
    //   </>
    // }
    return priceElement;
  };

  const handleAddToWishlist = () => {
    if (disable) return;
    if (isUserLoggedIn()) {
      setDisable(true);
      // TODO: handle add to wishlist
      if (selectedProduct.wishlistStatus) {
        dispatch({
          type: DELETE_WISHLIST,
          payload: { productVariationId: selectedProduct.id },
          callback: () => setDisable(false),
        });
      } else {
        dispatch({
          type: ADD_WISHLIST,
          payload: { productVariationId: selectedProduct.id },
          callback: () => setDisable(false),
        });
      }
    } else {
      setIsOpenLoginModal(true);
    }
  };

  const getActiveCampaignName = () => {
    if (
      selectedProduct.discount_start_time &&
      selectedProduct.discount_end_time
    ) {
      if (
        moment().isSameOrAfter(selectedProduct.discount_start_time) &&
        moment().isSameOrBefore(selectedProduct.discount_end_time)
      ) {
        return selectedProduct.activeCampaignName || "";
      }
    }
    return "";
  };


  const getTime = () => {
    var d = new Date(); // for now
    let year = d.getFullYear()
    let month = d.getMonth();
    let day = d.getDate()
    let hour = d.getHours(); // => 9
    let minuts = d.getMinutes(); // =>  30
    let seconds = d.getSeconds();

    console.log(`${year}-${month}-${day} ${hour}:${60 - minuts}:${60 - seconds}`, 'ytrefgfds');

    return `${year}-${month}-${day} ${minuts >= 30 ? hour + 1 : hour}:${60 - minuts}:${60 - seconds}`

  }

  return (
    <>
      {selectedProduct?.id && (
        <div className="product_detail">

          <div className="rating-blog">
            <ul className="rating">{getStars && getStars()}</ul>
            {totalReviews > 0 && (
              <span className="rate_result">{`${
                totalReviews ? totalReviews : 0
                }`}</span>
            )}
          </div>
          <div className="product-detail-content">
            <h5>{brand_name}</h5>
            <figure className="contry-flg">
              {country_flag && <img src={country_flag} alt={country_name} />}
              <small>{country_name}</small>
            </figure>
            <h1>{productName || name}</h1>
            <span className="pro_code">
              Product Code :{" "}
              {selectedProduct.barcodes ? selectedProduct.barcodes[0] : sku}
              {attribute_name && (
                <span className="clr1 reboto-m">
                  {attribute_name}:
                  <small>
                    {attribute_value}
                    {attribute_unit}
                  </small>
                </span>
              )}
            </span>
            {/* {
              selectedProduct.activeCampaignName === 'Buy 1 Get 1 Free' ? (<div className="detail_tag"><img src={Tag3} alt="tag here"/><span>Fill Your Carts with TWO & Get ONE Free</span></div>) : null
            } */}

            {/* <h6 className="p-title p20">
            {
              getPriceElement()
              moment().isSameOrAfter(selectedProduct.discount_start_time) ? 
              <>{getPriceElement()}<div className="prices11">{getPriceElement()}</div></>
              :
              <>{getPriceElement(true)}
              <div className="prices12">{getPriceElement(true)}<small>will be live on 09.11</small></div></>
            }
            </h6> */}


            <div className="nyr_title">
              {getPriceElement()}
            </div>

            {/* <div className="nyr_title">
              {getPriceElement()}
              <div className="prices12">{getPriceElement()}<small>will be live on 09.11</small></div>
            </div> */}


            {/* <div className="counter_dev">
              <h6 className="clr1">shop upto 5000 Rs & Above and get a 200 Rs extra discount on your final cart value</h6>
              <h4>flash<br /> Offer</h4>
              <ul className="countdown_timer right-bottom">
              <CountDown timeTillDate={moment(products[0].discountEndTime).format('DD-MM-YYYY HH:mm:ss')} /> 
                <CountDown
                  timeTillDate={products[0].discountEndTime} 
                  timeTillDate={getTime()}
                />
              </ul>
            </div> */}
            <p>
              {short_description &&
                ReactHtmlParser(short_description, { transform })}
            </p>
            {features && features.length > 0 && (
              <ul className="meta-checkbox">
                {features.map(({ value }, index) => {
                  if (value !== null) {
                    return (
                      <li key={index}>
                        <div className="checkbox">
                          <input
                            type="checkbox"
                            name="check1"
                            readOnly
                            id="checkbox1"
                            checked
                            disabled
                          />
                          <label htmlFor="checkbox1">
                            <span></span>
                            {value}
                          </label>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>
            )}

            <h6 className="d-pro">
              {/* {getActiveCampaignName()} */}
              {/* <Link to="/" >
              Details
            </Link> */}
            </h6>
            <div className="sparate_div">
              <h6 className="p-title mb7 p16">Services:</h6>
              <ul className="meta-checkbox ">
                <li>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      name="check1"
                      readOnly
                      id="checkbox3"
                      disabled
                      checked
                    />
                    <label htmlFor="checkbox3">
                      <span></span>Delivery 7-10 Working days
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      name="check1"
                      readOnly
                      id="checkbox4"
                      disabled
                      checked
                    />
                    <label htmlFor="checkbox4">
                      <span></span>72 hours return & claim
                    </label>
                  </div>
                </li>
                <li>
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      name="check1"
                      readOnly
                      id="checkbox4"
                      disabled
                      checked
                    />
                    <label htmlFor="checkbox4">
                      <span></span>Original Guaranteed
                    </label>
                  </div>
                </li>
              </ul>
              <div className="sparate_div mb10">
                <h6 className="p-title mb7 p16">
                  Ship From: <span className="at_bg3">{city_name}</span><span className="clr1"> {city_name === "Lahore" && productType === "aodour" && selectedProduct.pre_order !== 1 ? "( Delivered within 24 hours in Lahore)" : ""}</span>
                </h6>
              </div>
            </div>

            {selectedProduct.available_quantity > 0 ? (
              <h6 className="p-title p16">
                Available Stock: {selectedProduct.available_quantity}
              </h6>
            ) : selectedProduct.pre_order === 0 ? (
              <h6 className="p-title p16 clr1">OUT OF STOCK</h6>
            ) : (
                  <></>
                )}

            <>
              <Filters
                product={productDetailPage}
                filterList={attributes}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                selectedVariationId={selectedVariationId}
              />
            </>
            {!isMobile && selectedProduct.available_quantity > 0 && (
              <div>
                {" "}
                <div className="qty-added rs-none">
                  <button
                    onClick={() => {
                      setQty(qty > 1 ? qty - 1 : qty);
                      // setShowLimitText(false);
                    }}
                    className="down_count"
                    title="Down"
                  >
                    <i className="icon-minus"></i>
                  </button>
                  <input
                    className="counter"
                    type="text"
                    readOnly
                    placeholder="value..."
                    value={qty}
                  />
                  <button
                    onClick={() => {
                      changeQty(
                        qty < selectedProduct.available_quantity ? qty + 1 : qty
                      );
                    }}
                    className="up_count"
                    title="Up"
                  >
                    <i className="icon-plus"></i>
                  </button>
                </div>
                {showLimitText && (
                  <h6 className="lowercase_error" style={{ color: "red" }}>
                    Item limited to max quantity of 5
                  </h6>
                )}
                <div className="btns rs-none">
                  {selectedProduct.available_quantity > 0 ? (
                    <>
                      <button className="btn-normal at_bg2" onClick={addToCart}>
                        {selectedProduct.sku == '3474636819706' ? 'Pre Order' : 'add to cart'}
                      </button>
                      {
                        selectedProduct.sku !== "LPK3474636819706" &&
                        <button
                          className="btn-normal at_bg3"
                          onClick={openQuickBuy}
                        >
                          Quick Buy
                      </button>
                        // <button className="btn-normal wish_btn" onClick={(e) => addToCart(e, true)} ><img src="https://storage.googleapis.com/aodour_v1/campaign/Feb/btn_for_mobile_text.png" alt="wish list add" /></button>
                      }
                    </>
                  ) : (
                      <></>
                    )}
                </div>
              </div>
            )}
            {!isMobile &&
              selectedProduct.pre_order === 1 &&
              selectedProduct.available_quantity < 1 && (
                <div className="btns rs-none">
                  <button className="btn-normal at_bg2" onClick={openNotifyMe}>
                    Pre-Order
                  </button>
                </div>
              )}
            {/* <div className="check_hrt">
              <input
                id="hrt_chk"
                type="checkbox"
                name=""
                readOnly
                checked={selectedProduct.wishlistStatus}
              />
              <label htmlFor="hrt_chk" onClick={handleAddToWishlist}>
                <i className="fa fa-heart-o" aria-hidden="true"></i>add to
                wishlist
              </label>
            </div> */}

            {/* <span className="iconntitle">
            <i className="fa fa-usd" aria-hidden="true"></i>Earn up to 45 points
            in <b className="clr1">Royal Bazaar</b>
          </span> */}
          </div>
        </div>
      )}{" "}
      <QuickBuyModal
        isOpen={isQuickBuyOpen}
        setIsOpen={setIsQuickBuyOpen}
        selectedProduct={{ ...selectedProduct, qty }}
        openThankYouModal={openThankYouModal}
      />
      <NotifyMeModal
        isOpen={isNotifyMeOpen}
        setIsOpen={setIsNotifyMeOpen}
        selectedProduct={{ ...selectedProduct, qty }}
        openThankYouModal={openThankYouModal}
      />
      <AddToCartModal
        isOpen={isCartModalOpen}
        setIsOpen={setIsCartModalOpen}
        selectedProduct={{ ...selectedProduct, qty }}
      />
      <ThankYouModal
        isOpen={isThankYouModalOpen}
        setIsOpen={setIsThankYouModalOpen}
        cartList={[{ ...selectedProduct, qty }]}
      />
      <div className="bottom_bar">
        {selectedProduct.available_quantity > 0 && (
          <div className="qty-added">
            <button
              onClick={() => {
                setQty(qty > 1 ? qty - 1 : qty);
                // setShowLimitText(false);
              }}
              className="down_count"
              title="Down"
            >
              <i className="icon-minus"></i>
            </button>
            <input
              className="counter"
              type="text"
              readOnly
              placeholder="value..."
              value={qty}
            />
            <button
              onClick={() => {
                changeQty(
                  qty < selectedProduct.available_quantity ? qty + 1 : qty
                );
              }}
              className="up_count"
              title="Up"
            >
              <i className="icon-plus"></i>
            </button>
          </div>
        )}
        <div className="buttons_fixed">
          {selectedProduct.available_quantity > 0 ? (
            <>
              <button className="btn-normal at_bg2" onClick={addToCart}>
                {selectedProduct.sku == '3474636819706' ? 'Pre Order' : 'add to cart'}
              </button>
              {
                selectedProduct.sku !== "LPK3474636819706" &&
                <button className="btn-normal at_bg3" disabled={selectedProduct.sku === "LPK3474636819706"} onClick={openQuickBuy}>
                  Quick Buy
                </button>
                // <button className="btn-normal at_bg3" onClick={(e) => addToCart(e, true)}><img src="https://storage.googleapis.com/aodour_v1/campaign/Feb/btn_for_mobile_text.png" alt="wish list add" /></button>
              }
            </>
          ) : (
              <></>
            )}
        </div>

        {selectedProduct.pre_order === 1 &&
          selectedProduct.available_quantity < 1 && (
            <div className="buttons_fixed widthfull">
              <button className="btn-normal at_bg2" onClick={openNotifyMe}>
                Pre-Order
              </button>
            </div>
          )}
      </div>

      <NeedToLogin isOpen={isOpenLoginModal} setIsOpen={setIsOpenLoginModal} />
    </>
  );
}
