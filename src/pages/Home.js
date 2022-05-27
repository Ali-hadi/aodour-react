import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import ImageCarousel from "../components/ImageCarousel";
import ButtonBar from "../components/Home/ButtonBanner";
import TopSellerBanner from "../components/Home/TopSellerBanner";
import FlashSale from "../components/Home/FlashSale";
import MainLinkButton from "../components/Home/MainLinkButton";
import DualBanner from "../components/Home/DualBanner";
import MainTab from "../components/Home/MainTab";
import Blog from "../components/Home/Blog";
import InstaSection from "../components/Home/InstaSection";
import ProductDetailModal from "../components/Product/ProductDetailModal";
import BannerSections from "../components/Home/DermatologySection";
import {showCampaignNotification} from "../util"
import {
  GET_HOMEPAGE_BANNER,
  GET_HOMEPAGE_PRODUCTS,
  GET_PRODUCT_DETAIL,
  GET_BEST_SELLER_PRODUCTS,
  GET_FLASH_SALE_PRODUCTS,
} from "../constants/actionTypes";
import {
  instaImages,
  MainSlider,
  TopSellerBannerResponsive,
  Brand_InstaResponsive,
} from "../util/responsive";
// import EidCampaignBottomBanner from "../components/Campaign/EidCampaignBottomBanner";

export default function Home() {
  // const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isShowWishlistOpen, setShowWishlistOpen] = useState(false);

  const dispatch = useDispatch();
  const {
    sliders,
    top_seller_banners,
    dual_banner,
    brands_slider,
    hot_categories,
    bottom_banners,
    
  } = useSelector(({ homePageBanners }) => homePageBanners);

  const { newArrival, bestSellerProducts, flashSaleProducts } = useSelector(
    ({ homePageProducts }) => homePageProducts
  );

  const {cartList} = useSelector(state => state)

  useEffect(() => {
    // showCampaignNotification(cartList, 2000, 3)

    dispatch({ type: GET_HOMEPAGE_PRODUCTS });
    dispatch({ type: GET_HOMEPAGE_BANNER });
    dispatch({ type: GET_BEST_SELLER_PRODUCTS });
    dispatch({ type: GET_FLASH_SALE_PRODUCTS });
  }, []);

  // const openModal = product => {
  //   setSelectedProductVariation(product);
  //   setIsProductModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsProductModalOpen(false);
  //   setSelectedProductVariation({});
  // };

  const [selectedProductVariation, setSelectedProductVariation] = useState({});

  // const [product, setProduct] = useState({})

  const { productDetailPage } = useSelector((state) => state);

  useEffect(() => {
    const { product_variations, product } = productDetailPage;
    // console.log("productDetailPage", productDetailPage);

    setSelectedProductVariation(
      product_variations.length > 0 ? { ...product_variations[0], qty: 1 } : {}
    );
  }, [productDetailPage]);

  return (
    <>
      <Helmet>
        <title>
          aodour - Online Shopping for Guaranteed Products - Cosmetics, Fashion,
          Skin Care, Health, Life Style
        </title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta
          name="description"
          content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery."
        />
      </Helmet>
      <div className="container-fluid">
        <div className="main_banner dot_active">
          <ImageCarousel images={sliders} responsive={MainSlider} />
        </div>
      </div>
      <div className="content">
        
        <div className="columns-row">
          <MainLinkButton />
          {/* <ButtonBar /> */}
          <DualBanner dual_banner={dual_banner} />
          <MainTab products={{ newArrival, bestSellerProducts }} />
          <TopSellerBanner banners={top_seller_banners} />
          {flashSaleProducts.today.length > 0 && (
            <FlashSale products={flashSaleProducts} />
          )}

          {/* Brand section */}
          <div className="brand-section">
            <div className="container-fluid">
              <div className="brand-slider slider_nav">
                <ImageCarousel
                  images={brands_slider}
                  responsive={Brand_InstaResponsive}
                />
              </div>
            </div>
          </div>

          <BannerSections
            content={{
              hotCategories: hot_categories || [],
              bottomBanners: bottom_banners || [],
            }}
          />

          {/* Brand section */}
          {/* <Blog /> */}
          {/* <InstaSection images={instaImages} responsive={Brand_InstaResponsive} /> */}
        </div>
      </div>
      {/* <ProductDetailModal
        selectedProductVariation={selectedProductVariation}
        isOpen={isProductModalOpen}
        closeModal={closeModal}
      /> */}
      {/* <EidCampaignBottomBanner /> */}

    </>
  );
}
