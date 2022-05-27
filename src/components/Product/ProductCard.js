import React, { useState, useEffect } from "react";
import "./ProductCardNormal.css";
import Carousel2 from "nuka-carousel";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../constants/actionTypes";
import { Link, useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
const Tag2 = "https://storage.googleapis.com/aodour_v1/campaign/PakistanDay/button.png";
const Tag3 = "https://storage.googleapis.com/aodour_v1/campaign_images/Buy1get1.png";
// const Compaigntag = "https://storage.googleapis.com/aodour_v1/campaign/tag2.png";
export default function ProductCard({ title, price, openModal, product,fromMiniso }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [shades, setShades] = useState([]);
  const [selectedShadeIndex, setSelectedShadeIndex] = useState(0);
  const [selectedVariationSlug, setSelectedVariationSlug] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const defaultModal = (product, slug) => {};
  const modal = openModal || defaultModal;

  const addToCart = () => {
    if (product.available_quantity > 0) {
      dispatch({ type: ADD_TO_CART, payload: { ...product, qty: 1 } });
    }
  };

  useEffect(() => {
    let productShades = [];
    if (product && product.variations && product.variations.length > 0) {
      for (const variation of product.variations) {
        for (const attr of variation.attributes) {
          if (
            attr.type === "image" &&
            attr.name === "Shade" &&
            attr.image !== null &&
            attr.image !== ""
          ) {
            productShades.push({
              attributeId: attr.attributeId,
              alt: attr.alt,
              image: attr.image,
              variationId: variation.id,
            });
            break;
          }
        }
      } 
      setSelectedVariationSlug(product.variations[0].slug);
    }
    setShades(productShades);
  }, [product]);

  const getStars = () => {
    let stars = [];
    for (let i = 0; i < product.rating; i++) {
      stars.push(
        <li>
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
      );
    }
    return stars;
  };

  const getTag = () => {
    if (!product.variations.find((v) => v.availableStock > 0)) {
      if (product.variations.find((v) => v.preOrder))
        return (
          <div className="figcaption">
            <span className="bg2">Pre-Order</span>
          </div>
        );
      return (
        <div className="figcaption">
          <span className="bg2">Sold Out</span>
        </div>
      );
    } else if (
      product.variations.find(
        (v) =>
          v.discountPercentage > 0 &&
          v.discountStartTime &&
          v.discountEndTime &&
          moment().isSameOrAfter(v.discountStartTime) &&
          moment().isSameOrBefore(v.discountEndTime)
      )
    ) {
      let variationsTem = product.variations.filter(
        (v) =>
          v.discountStartTime &&
          v.discountEndTime &&
          moment().isSameOrAfter(v.discountStartTime) &&
          moment().isSameOrBefore(v.discountEndTime)
      );

      let min = variationsTem[0].discountPercentage;
      let max = variationsTem[0].discountPercentage;
      for (const variation of variationsTem) {
        if (
          variation.discountPercentage < min &&
          variation.discountPercentage > 0
        ) {
          min = variation.discountPercentage;
        }
        if (variation.discountPercentage > max) {
          max = variation.discountPercentage;
        }
      }
      min = Math.round(min);
      max = Math.round(max);
      return min === max ? (
        <div className="figcaption">
          <span className="bg2">{min}% Off</span>
        </div>
      ) : (
        <div className="figcaption">
          {min !== 0 && (
            <span className="bg2">
              {min}%-{max}% Off
            </span>
          )}
          {min === 0 && <span className="bg2">{max}% Off</span>}
        </div>
      );
    }

    return <></>;
  };

  const getPriceElement = () => {
    return <h6 className="">{`PKR ${price}`}</h6>;
  };

  const getImage = () => {
    const selectedShade = shades.length > 0 ? shades[selectedShadeIndex] : {};
    let image = "";
    let alt = "";

    if (product.variations && product.variations.length > 0) {
      const selectedVariation = product.variations.find(
        ({ id }) => id === selectedShade.variationId
      );
      if (selectedVariation && selectedVariation.image.length > 0) {
        image = selectedVariation.image[0];
        alt = selectedVariation.productVariationName;
      }
      if (shades.length < 1) {
        image =
          product.variations[0].image.length > 0
            ? product.variations[0].image[0]
            : "";
        alt = product.variations[0].productVariationName;
      }
    }

    return { image, alt };
  };

  const selectShade = (index) => {
    setSelectedShadeIndex(index);
    const variationId =
      shades.length > 0 ? shades[index].variationId : undefined;
    if (variationId && product.variations) {
      const selectedVariation = product.variations.find(
        ({ id }) => id === variationId
      );
      if (selectedVariation) setSelectedVariationSlug(selectedVariation.slug);
    }
  };

  const getColorName = () => {
    return shades.length > 0 ? shades[selectedShadeIndex].alt.trim() : "";
  };

  // const toggleWishlist = (product) => {
  //   if (wishlist) {
  //     let newList = [...wishlist];
  //     if (wishlist.find((item) => item.productId === product.id)) {
  //       newList = wishlist.filter((item) => item.productId !== product.id);
  //     } else {
  //       newList.push({
  //         productId: product.id,
  //         variationId: product.variations[0].id,
  //         variationSlug: product.variations[0].slug,
  //         brandSlug: product.brandSlug,
  //         images: product.variations[0].image,
  //         price: product.variations[0].price,
  //         discountPrice: product.variations[0].discountPrice,
  //         name: product.name,
  //       });
  //     }
  //   } else {
  //     const temp = {
  //       productId: product.id,
  //       variationId: product.variations[0].id,
  //       variationSlug: product.variations[0].slug,
  //       brandSlug: product.brandSlug,
  //       images: product.variations[0].image,
  //       price: product.variations[0].price,
  //       discountPrice: product.variations[0].discountPrice,
  //       name: product.name,
  //     };
  //   }
  // };

  // const isInWishlist = (product) => {
  //   const found = wishlist.find((item) => item.productId === product.id);
  //   return found ? true : false;
  // };

  const getActiveCampaign = () => {
    console.log(product.variations['0'].activeCampaignName, 'activeCampaignName activeCampaignName');
    
    if(product.variations['0'].activeCampaignName != undefined && product.variations['0'].activeCampaignName != null && product.variations['0'].activeCampaignName != ""){
      if(product.variations['0'].activeCampaignName == 'Buy 1 Get 1 Free') return <div className="statis-tag"><img src={Tag3} alt="tag here"/></div>
      else if(product.variations['0'].activeCampaignName == 'Pakistan Day') return <div className="statis-tag"><img src={Tag2} alt="tag here"/></div>
    }
    return null
    // let com = product.variations.find(
    //   (v) =>
    //     v.activeCampaignName === "Grand Loreal Sale" &&
    //     moment().isSameOrAfter(v.discountStartTime) &&
    //     moment().isSameOrBefore(v.discountEndTime)
    // );
    // if (com) return com.activeCampaignName;
    //   return (
    //     <div className="statis-tag"><img src={Tag2} alt="tag here"/></div>
    //   );
    // return null;
  };

  return (
    <>
      <div className="product_style2">
        <div className="on_hover_class">
          <div
            className="upper_btn"
            onClick={() => {
              modal(product, selectedVariationSlug);
            }}
          >
            <span>Quick view</span>
            <span className="pulse"></span>
          </div>
          <figure
            onClick={() => {
              let url =  `/${fromMiniso ? 'product' : 'brand'}/${product.brandSlug}/${selectedVariationSlug}`;
              // const color = getColorName();
              // history.push(url.concat(color === "" ? "" : `?color=${color}`));
              history.push(url);
            }}
          >
            <img
              className="image2"
              src={getImage().image}
              alt={getImage().alt}
            />
            {getTag()}
            {/* {getActiveCampaign()} */}
          </figure>
        </div>

        <div className="product-content">
          {/* <span>{getActiveCampaign()}</span> */}
          {shades.length > 0 && (
            <Carousel2
              slidesToShow={isMobile ? 3 : 5}
              slidesToScroll={isMobile ? 2 : 3}
              defaultControlsConfig={{
                pagingDotsStyle: { display: "none" },
                nextButtonClassName: "icon-right",
                prevButtonClassName: "icon-left",
              }}
              getControlsContainerStyles={(key) => {
                switch (key) {
                  case "CenterLeft":
                    return { left: 0 };
                  case "CenterRight":
                    return { right: 0 };
                  default:
                    return {};
                }
              }}
            >
              {shades.map((shade, index) => (
                <ul className="colors_col">
                  <li
                    className={
                      selectedShadeIndex === index
                        ? "selected_image_attribute"
                        : ""
                    }
                  >
                    <img
                      src={shade.image}
                      alt={shade.alt}
                      onClick={() => selectShade(index)}
                    />
                  </li>
                </ul>
              ))}
            </Carousel2>
          )}

          {/* <span>Promotion</span> */}
          <h6>
            <Link
              to={{
                pathname: `/${fromMiniso ? 'product' : 'brand'}/${product.brandSlug}/${selectedVariationSlug}`,
                // search: getColorName() === "" ? "" : `color=${getColorName()}`,
              }}
            >
              {title}
            </Link>
          </h6>
          {/* <div className="pricepro">{getPriceElement()}</div> */}
          <div className="pricepro">Rs.{price}</div>
          <div className="ltr">
            {getStars().length > 0 && (
              <div className="rating-blog float-left">
                <ul className="rating">{getStars()}</ul>
                {product.totalComments > 0 && (
                  <span className="rate_result">{`(${product.totalComments})`}</span>
                )}
              </div>
            )}
          </div>
          <div className="rtl heart_style">
            <ul className="icons-shows">
              <li>
                <div className="check_hrt">
                  <input
                    id={`hrt_chk${product.id}`}
                    type="checkbox"
                    name=""
                    value=""
                    // onClick={() => {
                    //   toggleWishlist(product);
                    // }}
                    checked={isChecked}
                  />
                  {/* <label htmlFor={`hrt_chk${product.id}`}>
                    <i className="fa fa-heart-o" aria-hidden="true"></i>
                  </label> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
