
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment"
import {
  ADD_TO_CART,
  UPDATE_WISHLIST,
  DELETE_WISHLIST,
} from "../../constants/actionTypes";
import notification from "../Notification";
const image1 = "https://storage.googleapis.com/aodour_v1/campaign_images/mystery_img1.png";


const MysteryBoxCard = ({ product, openCartModal }) => {
  const [open, setOpen] = useState(false);
  //const [qty, setQty] = useState(1);
  const [qty, setQty] = useState(product.qty || 1);
  const [showLimitText, setShowLimitText] = useState(false);
  const { cartList } = useSelector((state) => state);
  useEffect(() => {
  }, []);
  const dispatch = useDispatch();

  const addToCart = () => {
    // console.log(product)
    if (product.availableStock > 0) { //condition 1
      const found = cartList.find((item) => item.id === product.id);
      if (found) {
        if (found.qty < 5) {
          openCartModal(product);
          dispatch({
            type: ADD_TO_CART,
            payload: {
              id: product.id,
              title: product.title,
              images: product.images,
              price: product.price,
              availableQuantity: product.availableStock,
              skua: product.skua,
              activeCampaignName: product.activeCampaignName,
              rating: product.rating,
              discountPercentage: product.discountPercentage,
              discountPrice: product.discountPrice,
              brandSlug: product.brandSlug,
              variationSlugP: product.variationSlug,
              totalComments: product.totalComments,
              productName: product.productName,
              qty: qty,
              attributes: product.attributes,
              categoryName: product.categoryName,
              discountStartTime: product.discountStartTime,
              discountEndTime: product.discountEndTime,
            },
          });
        } else {
          notification({ message: "Item limited to max quantity of 5" });
        }
      } else {
        openCartModal(product);
        dispatch({
          type: ADD_TO_CART,
          payload: {
            id: product.id,
            title: product.title,
            images: product.images,
            price: product.price,
            availableQuantity: product.availableStock,
            sku: product.skua,
            rating: product.rating,
            discountPercentage: product.discountPercentage,
            activeCampaignName: product.activeCampaignName,
            discountPrice: product.discountPrice,
            brandSlug: product.brandSlug,
            variationSlug: product.variationSlug,
            totalComments: product.totalComments,
            productName: product.productName,
            qty: qty,
            attributes: product.attributes,
            categoryName: product.categoryName,
            discountStartTime: product.discountStartTime,
            discountEndTime: product.discountEndTime,
          },
        });
      }
    }
  }



  const changeQty = (newQty) => {
    const found = cartList.find((item) => item.id === product && product.id);
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


  const getPriceElement = () => {

    let tag = `Rs.${product.price}`;
    if (
      product.discountPercentage > 0 &&
      moment().isSameOrAfter(product.discountStartTime, ) &&
      moment().isSameOrBefore(product.discountEndTime)
    ) {

      tag = <>
        {`Rs.${Math.round(product.price - product.discountPrice)} `}
        <del className="del_price">{product.price}</del>
      </>
    }
    return tag;
  };


  return (
    <>
      <div className="mysterybox_product">
        <figure><img src={image1} alt="img here" /></figure>
        <div className="mystery_content">
          <h2>{product.name}</h2>
          <p>{product.shortDescription}</p>
          {/* <h3>Rs. 5000<del>Rs. 8247</del></h3> */}
          <h3> {getPriceElement()}</h3>
          <div className="qty-added">
            <button
              className="down_count"
              title="Down"
              onClick={() => {
                setQty(qty > 1 ? qty - 1 : qty);
              }}
            > <i className="icon-minus"></i>
            </button>
            <input
              className="counter"
              type="text"
              disabled
              value={qty}
            />
            <button

              className="up_count"
              onClick={() => {

                changeQty(
                  qty < (product && product.availableStock) ? qty + 1 : qty
                );
              }}
            >
              <i className="icon-plus"></i>
            </button>
          </div>
          <div>
            {showLimitText && (
              <h6 className="lowercase_error" style={{ color: "red" }}>
                Item limited to max quantity of 5
              </h6>
            )}
          </div>

          <div className="middle-buttons">
            <button className="btn-normal" onClick={addToCart}>
              add to cart</button>
          </div>
        </div>
      </div>

    </>
  );
};

export default MysteryBoxCard;

