import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
// import SaleImage1 from "../../assets/images/campain/product_img1.jpg";
import { ADD_TO_CART } from "../../constants/actionTypes";
import moment from 'moment';
const Tag2 = "https://storage.googleapis.com/aodour_v1/campaign/PakistanDay/button.png";
const Tag3 = "https://storage.googleapis.com/aodour_v1/campaign_images/Buy1get1.png";
const CampaignProductCard = ({ product, openCartModal }) => {
  const {
    images,
    discountPercentage,
    productVariationName,
    discountPrice,
    price,
    brandSlug,
    productVariationSlug,
    discountEndTime,
    discountStartTime,
  } = product;

  const dispatch = useDispatch();

  const addToCart = () => {
    openCartModal(product);
    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: product.productVariationID,
        title: productVariationName,
        images,
        price,
        activeCampaignName: product.activeCampaignName,
        availableQuantity: product.availableStock,
        sku: product.sku,
        rating: product.rating,
        discountPercentage,
        discountPrice,
        brandSlug,
        variationSlug: product.productVariationSlug,
        totalComments: product.totalComments,
        productName: product.name,
        qty: 1,
        attributes: product.attributes,
        categoryName: product.subSubCategoryName,
        discountEndTime: product.discountEndTime,
        discountStartTime: product.discountStartTime,
      },
    });
  };

  const percetageTag = () => {
    if (
      discountPercentage > 0 &&
      moment().isSameOrAfter(discountStartTime) &&
      moment().isSameOrBefore(discountEndTime)
    ) {
      return (

        // <div className="tag">{Math.round(discountPercentage)}% Off</div>
        <div className="tag2">{Math.round(discountPercentage)}%</div>
      );
    }

    if(product.activeCampaignName == 'Buy 1 Get 1 Free') return <div className="statis-tag"><img src={Tag3} alt="tag here"/></div>
    
    return <></>;
  }

  const getPriceElement = () => {
    if (
      discountPercentage > 0 &&
      moment().isSameOrAfter(discountStartTime) &&
      moment().isSameOrBefore(discountEndTime)
    ) {
      return (
        <>
          <h5>
            <b> Rs.{Math.round(price - discountPrice)}</b>
          </h5>
          <span>
            <del >Rs.{price}</del>
          </span>
        </>
      );
    } else {
      return <h5 >Rs.{Math.round(price)} </h5>;
    }
  };

  const getActiveCampaign = () => {
    // if (
    //   activeCampaignName === "11.11 sale" &&
    //   moment().isSameOrAfter(discountStartTime) &&
    //   moment().isSameOrBefore(discountEndTime)
    // )
    //   return activeCampaignName;
    //   return (
    //     <div className="statis-tag"><img src={Tag2} alt="tag here"/></div>
    //   );
    if (product.activeCampaignName != undefined && product.activeCampaignName != null && product.activeCampaignName != "") {
      if (product.activeCampaignName == 'Buy 1 Get 1 Free') {
        return <div className="statis-tag"><img src={Tag3} alt="tag here" /></div>
      }
      else if (product.activeCampaignName == 'Pakistan Day') {
        return <div className="statis-tag"><img src={Tag2} alt="tag here" /></div>
      }
    }
    return null
  };


  const getPriceElement2 = (ignoreDate=false) => {
   
    let priceElement = <>
       RS. {Math.round(price)}
       </>
     if (
       discountPercentage > 0 &&
       discountStartTime &&
       discountEndTime
     ) {
       if (
         moment().isSameOrAfter(discountStartTime) &&
         moment().isSameOrBefore(discountEndTime) 
       ) {
         priceElement = (
            // priceElement = <> <del className="del_price">Rs. {Math.round(price)}</del><div className="prices11">Rs.{Math.round(price - discountPrice)}</div></>
            priceElement = <> Rs.{Math.round(price - discountPrice)}<del className="del_price ">Rs. {Math.round(price)}</del></>
         );
       }else{
        //  priceElement = <>
        //    RS. {Math.round(price)}
        //     <div className="prices12 statis-tag">Rs.{Math.round(price - discountPrice)}<small> will be live on {moment(discountStartTime).format('DD-MM')}</small></div>
           // </>
       }
     }
     return priceElement;
   };


  return (
    // <div className="col-md-3 col-sm-6 col-xs-6">
      <div className="col-product overflow-view">
        <Link to={`/brand/${brandSlug}/${productVariationSlug}`}>
          <figure>
            <img src={images[0]} alt="image here" />
              {/* <div className="tag2">40%</div> */}
            {/* {getActiveCampaign()} */}
            {percetageTag()}
          </figure>
        </Link>
        <div className="col-content">
          <Link to={`/brand/${brandSlug}/${productVariationSlug}`}>
            <h6>{productVariationName}</h6>
          </Link>
          <h6 className="p-title p20 for_mobo">
            {getPriceElement2()}
          </h6>
        </div>
        <div className="footer_bottom">
          <span className="at_bg00 w8" onClick={addToCart}>
            add to cart
          </span>
          <Link
            to={`/brand/${brandSlug}/${productVariationSlug}`}
            className="at_bg2 w2 bg2"
          >
            view
          </Link>
        </div>
      </div>
    // </div>
  );
};

export default CampaignProductCard;
