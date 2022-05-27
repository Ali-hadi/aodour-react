import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CAMPAIGN_BUY2_GET_1 } from "../constants/actionTypes";
import "../styles/sale.css";
import CampaignProductsGrid from "../components/Campaign/CampaignProductsGrid";
import { isMobile } from "react-device-detect";
import ReactOwlCarousel from "react-owl-carousel";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader/compnentLoader";
const SaleBanner = "https://storage.googleapis.com/aodour_v1/campaign_images/buy1get1.png";
const SaleBannerMobile = "https://storage.googleapis.com/aodour_v1/campaign_images/mobile_buy1get1.png";
// let filteredProducts = [];

export default function Campaign() {
  const dispatch = useDispatch();

  const {
    campaignBuy2Get1,
  } = useSelector((state) => state);
  // console.log(campaignBuy2Get1, 'campaignBuy2Get1 campaignBuy2Get1');
  

  const { products }= campaignBuy2Get1;

  const [selectedType, setSelectedType] = useState();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [showOthers, setShowOthers] = useState(true);
  const [otherProducts, setOtherProducts] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState("All Products");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    dispatch({
      type: GET_CAMPAIGN_BUY2_GET_1,
      callback: () => setLoading(false),
    });
  }, []);

  useEffect(() => {
    // console.log(campaignBuy2Get1, products, 'campaignBuy2Get1');
    if(products){
      setBestSellerProducts(
        products.filter((product) => product.bestSeller === "1")
      );
      setOtherProducts(products.filter((product) => product.menu === "others"));
      setPagination(products.length / 50);
    }
    // filteredProducts = products;
  }, [products]);

  // useEffect(() => {
  // 	setPagination(filteredProducts.length / 50);
  // }, [filteredProducts]);

  const getBrands = () => {
    let brands = [];
    if (products.length > 0) {
      for (const product of products) {
        if (!brands.find((value) => product.brandName === value)) {
          brands.push(product.brandName);
        }
      }
    }
    return brands;
  };

  const getSubSubCategory = () => {
    let subSubCategories = [];
    if (products.length > 0) {
      for (const product of products) {
        if (
          !subSubCategories.find(
            (value) => product.subSubCategoryName === value
          )
        ) {
          subSubCategories.push(product.subSubCategoryName);
        }
      }
    }
    return subSubCategories;
  };

  const filter = () => {
    let newProducts = products;
    // console.log(products, 'products are thd');
    

    if (selectedType) {
      if (selectedType !== "allProducts") {
        if (selectedType === "offProducts") {
          newProducts = newProducts.filter(
            (product) => parseFloat(product.discountPercentage) >= 50
          );
        } else {
          newProducts = newProducts.filter(
            (product) => product.menu === selectedType
          );
        }
      }
      // filteredProducts = newProducts;
      return {
        products: newProducts,
        length: newProducts.length,
      };
    }

    if (selectedBrand && selectedBrand !== "") {
      newProducts = newProducts.filter(
        (product) => product.brandName === selectedBrand
      );
    }

    if (selectedSubSubCategory && selectedSubSubCategory !== "") {
      newProducts = newProducts.filter(
        (product) => product.subSubCategoryName === selectedSubSubCategory
      );
    }

    // filteredProducts = newProducts;
    return {
      products: newProducts,
      length: newProducts&&newProducts.length,
    };
  };

  const responsive = {
    0: {
      items: 3,
    },
    767: {
      items: 5,
    },
    1366: {
      items: 8,
    },
  };

  useEffect(() => {
    setPage(0);
  }, [selectedType, selectedBrand, selectedSubSubCategory]);

  return (
    <>
      <Helmet>
        <title>
          {"Aodour Annual Sale - Buy 1 Get 1 Free offer"}
        </title>
        <meta name="description" content={""} />
        <meta name="keywords" content={"Aodour Annual Sale of the 2020 Year | Aodour"} />
      </Helmet>
      <Loader loading={loading} />

      <div className="background-bg pt-30">

        <div className="screen-show">
          <div className="container-fluid">
            <img className="for-desktop" src={SaleBanner} alt="brand banner" />
            <img className="for-mobile" src={SaleBannerMobile} alt="brand banner" />
          </div>
        </div>
        <div className="style4 align-center">
          <div className="container-fluid">
            <h3>Add any <b>2 products</b> in your Cart one with <br/>the lowest price comes <b>free</b></h3>
          </div>
        </div>
        <div className="buy1get1">
          {showOthers && (
            <>
              <CampaignProductsGrid
                products={bestSellerProducts}
                title={""}
                infiniteScroll={true}
              />
              {/* <CampaignProductsGrid products={otherProducts} title="Only For You" infiniteScroll={false} /> */}
            </>
          )}

          <CampaignProductsGrid
            products={filter().products}
            title={""}
            infiniteScroll={true}
          />
        </div>  
      </div>  

      
    </>
  );
}
