
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CAMPAIGN_MYSTERYBOX } from "../constants/actionTypes";
import "../styles/sale.css";
import AddToCartModal from '../components/AddToCartModel';
import CampaignProductsGrid from "../components/Campaign/CampaignProductsGrid";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import ReactOwlCarousel from "react-owl-carousel";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader/compnentLoader";
import MysteryBoxCard from "../components/Campaign/MysteryBoxCard"
const SaleBanner = "https://storage.googleapis.com/aodour_v1/campaign_images/mysterybox.png";
const SaleBannerMobile = "https://storage.googleapis.com/aodour_v1/campaign_images/mobile_mystery.png";
const image1 = "https://storage.googleapis.com/aodour_v1/campaign_images/mystery_img1.png";
// let filteredProducts = [];

export default function Campaign() {
  const dispatch = useDispatch();

  const {
    campaignMysterBoxes: {products},
  } = useSelector((state) => state);

  const [loading, setLoading] = useState(false);
  const [mysteryBoxes, setMysteryBoxes] = useState([1,2,3,4]);

  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const openCartModal = product => {
    setSelectedProduct(product);
    setIsCartModalOpen(true);
  }


  useEffect(() => {
    setLoading(true);

    dispatch({
      type: GET_CAMPAIGN_MYSTERYBOX,
      callback: () => setLoading(false),
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {"Mystery Box Offer | Save upto 7000 | Aodour Annual Sale"}
        </title>
        <meta name="description" content={""} />
        <meta name="keywords" content={"Mystery Box Offer | Save upto 7000 | Aodour Annual Sale"} />
      </Helmet>
      <Loader loading={loading} />

      <div className="background-bg pt-30">

        <div className="screen-show mb20">
          <div className="container-fluid">
            <img className="for-desktop" src={SaleBanner} alt="brand banner" />
            <img className="for-mobile" src={SaleBannerMobile} alt="brand banner" />
          </div>
        </div>
        
        <div className="mysterybox">
            <div className="container-fluid">
              {
                products && products.map(item => <MysteryBoxCard openCartModal={openCartModal} product={item} />)
              }
             </div>
        </div>  
      </div>    
 
      <AddToCartModal
        isOpen={isCartModalOpen}
        setIsOpen={setIsCartModalOpen}
        selectedProduct={{ ...selectedProduct, qty: 1 }}
      />

      
    </>
  );
}

