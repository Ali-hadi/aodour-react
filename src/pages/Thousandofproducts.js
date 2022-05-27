import React, { useState, useEffect,useParams } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RESET_11CAMPAIGN_BRAND, GET_11CAMPAIGN_BRAND } from "../constants/actionTypes";
import ReactPaginate from "react-paginate";
import "../styles/sale.css";
import CampaignProductsGrid from "../components/Campaign/CampaignProductsGrid";
import { isMobile } from "react-device-detect";
import ReactOwlCarousel from "react-owl-carousel";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader/compnentLoader";
const SaleIcon1 = "https://storage.googleapis.com/aodour_v1/campaign_images/icons_black/icon2.png";
const SaleIcon2 = "https://storage.googleapis.com/aodour_v1/Fridayfrenzy_campaign/icon_50.png";
const SaleIcon3 = "https://storage.googleapis.com/aodour_v1/campaign_images/icons_black/icon3.png";
const SaleIcon4 = "https://storage.googleapis.com/aodour_v1/campaign_images/icons_black/icon4.png";
const SaleIcon5 = "https://storage.googleapis.com/aodour_v1/campaign_images/icons_black/icon5.png";
const SaleIcon6 = "https://storage.googleapis.com/aodour_v1/campaign_images/icons_black/icon6.png";

const SaleBanner = "https://storage.googleapis.com/aodour_v1/Fridayfrenzy_campaign/banner.png";
const SaleBannerMobile = "https://storage.googleapis.com/aodour_v1/Fridayfrenzy_campaign/mbanner.png";

const Freebanner = "https://storage.googleapis.com/aodour_v1/Fridayfrenzy_campaign/free_delivery.png";
const mobileFree = "https://storage.googleapis.com/aodour_v1/Fridayfrenzy_campaign/mfree_delivery.png";
// let filteredProducts = [];

export default function Campaign() {

  const dispatch = useDispatch();

  const {
    campaign11Brand
  } = useSelector((state) => state);

  const {products} = campaign11Brand

  const [selectedType, setSelectedType] = useState();
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [bundleProducts, setBundleProducts] = useState([]);
  const [showOthers, setShowOthers] = useState(true);
  const [otherProducts, setOtherProducts] = useState([]);
  const [pagination, setPagination] = useState(0);
  const [page, setPage] = useState(0);
  const [title, setTitle] = useState("All Products");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)

    dispatch({
      type: GET_11CAMPAIGN_BRAND,
      callback: () => {
        setLoading(false)
      }
    });
  }, []);

  useEffect(() => {
    setBestSellerProducts(
      products.filter((product) => product.bestSeller === "1")
    );
    setBundleProducts(products.filter((product) => product.menu === 'bundles'));
    // setOtherProducts(products.filter((product) => product.menu === "others"));
    setPagination(products.length / 50);
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

    // console.log(selectedType, 'selectedBrand selectedSubSubCategory 12345', newProducts.filter(
    //   (product) => product.menu === selectedType
    // ),title);
    if (selectedType) {
      if (selectedType !== "allProducts") {
        if (selectedType === "offProducts") {
          newProducts = newProducts.filter(
            (product) => parseFloat(product.discountPercentage) >= 50
          );
        } else {
          // console.log('else inner');
          
          newProducts = newProducts.filter(
            (product) => product.menu === selectedType
          );
        }
      }
      // filteredProducts = newProducts;
    }

    if (selectedBrand && selectedBrand !== "") {
      // console.log(selectedSubSubCategory,'if brand',selectedBrand);
      
      newProducts = newProducts.filter(
        (product) => product.brandName === selectedBrand
      );
    }

    if (selectedSubSubCategory && selectedSubSubCategory !== "") {
      // console.log('if category');
      newProducts = newProducts.filter(
        (product) => product.subSubCategoryName === selectedSubSubCategory
      );
    }

    // filteredProducts = newProducts;
    if(title === 'All Products'){
      // console.log('if title');
      let prs = products.filter((product) => product.bestSeller !== "1");
      return {
        products: prs.filter((product) => product.menu !== 'bundles'),
        length: newProducts.length,
      }
    }
    return {
      products: newProducts,
      length: newProducts.length,
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
      items: 6,
    },
  };

  useEffect(() => {
    setPage(0);
  }, [selectedType, selectedType, selectedSubSubCategory]);


  const getActiveClass = (type) =>{
    if(selectedType === type){
      return "current"
    }
    return ""
  }

  return (
    <>
      <Helmet>

        <title>
          {"Aodour Sale 2021 upto 70% OFF - Aodour"}
        </title>
        <meta name="description" content={"Aodour Valentine's Day Sale is here with discounts upto 70% off on Valentine's Day stock,  Hurry Up! Catch our Aodour Valentine's Day With UPTO 70% off. "} />
        <meta name="keywords" content={"Aodour Valentine's Day 2021 upto 70% OFF - Aodour"} />
      </Helmet>
      <Loader loading={loading} />

      <div className="background-bg">

        <div className="screen-show">
          <img className="for-desktop" src={SaleBanner} alt="brand banner" />
          <img className="for-mobile" src={SaleBannerMobile} alt="brand banner" />
        </div>
        <div className="screen-show cus_pandding">
          <div className="container-fluid">
            <img className="for-desktop" src={Freebanner} alt="brand banner" />
            <img className="for-mobile" src={mobileFree} alt="brand banner" />
          </div>
        </div>
        
        
        <div className="group_filter">
          <div className="container-fluid">
            <div className="services_columns">
            <ReactOwlCarousel className="owl-theme" lazyLoad={true} responsive={responsive} nav>
              <div
                onClick={() => {
                  if (selectedType === "allProducts") {
                    return;
                  }
                  setSelectedType("allProducts");
                  setSelectedBrand("");
                  setSelectedSubSubCategory("");
                  setShowOthers(true);
                  setTitle("All Products");
                  // setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon1} alt="icon image png" />
                </span>
                <small
                  className={selectedType === "allProducts" ? "current" : ""}
                >
                  All Products
                </small>
              </div>

              <div
                onClick={() => {
                  if (selectedType === "50% off") {
                    return;
                  }
                  setSelectedType("50% off");
                  setSelectedBrand("");
                  setSelectedSubSubCategory("");
                  setShowOthers(false);
                  setTitle("50% off");
                  // setLoading(true);
                }}
              >
                <span className="fullimg" className={getActiveClass('50% off')}>
                  <img src={SaleIcon2} alt="icon image png" />
                </span>
                <small className={getActiveClass('50% off')}>
                  products
                </small>
              </div>
              <div
                onClick={() => {
                  if (selectedType === "makeup") {
                    return;
                  }
                  setSelectedType("makeup");
                  setSelectedBrand("");
                  setSelectedSubSubCategory("");
                  setShowOthers(false);
                  setTitle("makeup");
                  // setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon3} alt="icon image png" />
                </span>
                <small className={getActiveClass('makeup')}>
                makeup
                </small>
              </div>
              <div
                onClick={() => {
                  if (selectedType === "skincare") {
                    return;
                  }
                  setSelectedType("skincare");
                  setSelectedBrand("");
                  setSelectedSubSubCategory("");
                  setShowOthers(false);
                  setTitle("Skin Care");
                  // setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon4} alt="icon image png" />
                </span>
                <small className={getActiveClass('skincare')}>
                  skin care
                </small>
              </div>
              <div
                onClick={() => {
                  if (selectedType === "haircare") {
                    return;
                  }
                  setSelectedType("haircare");
                  setSelectedBrand("");
                  setSelectedSubSubCategory("");
                  setShowOthers(false);
                  setTitle("haircare");
                  // setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon5} alt="icon image png" />
                </span>
                <small className={getActiveClass('haircare')}>
                hair care
                </small>
              </div>
              {/* <div
                onClick={() => {
                  if (selectedType === "face-mask") {
                    return;
                  }
                  setSelectedType("face-mask");
                  setSelectedBrand("face-mask");
                  setSelectedSubSubCategory("");
                  setShowOthers(false);
                  setTitle("face mask");
                  setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon5} alt="icon image png" />
                </span>
                <small className={selectedType === "face-mask" ? "current" : ""}>
                face mask
                </small>
              </div> */}
              {/* <div
                onClick={() => {
                  if (selectedType === "hair-style") {
                    return;
                  }
                  setSelectedType("hair-style");
                  setSelectedBrand("hair-style");
                  setSelectedSubSubCategory("");
                  setShowOthers(false);
                  setTitle("hair-style");
                  setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon5} alt="icon image png" />
                </span>
                <small className={selectedType === "hair-style" ? "current" : ""}>
                hair style
                </small>
              </div> */}

              
              {/* <div
                onClick={() => {
                  if (selectedType === "bundles") {
                    return;
                  }
                  setSelectedType("bundles");
                  setSelectedBrand("");
                  setSelectedSubSubCategory("");
                  setShowOthers(false);
                  setTitle("bundles");
                  // setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon6} alt="icon image png" />
                </span>
                <small className={getActiveClass('bundles')}>
                bundles
                </small>
              </div> */}
            </ReactOwlCarousel>
            </div>
            <div className="dropdown-mobile">
              <div className="pull-left">
                <div className="brand_select">
                  <h6>Brand:</h6>
                  <div className="dropmenu_select">
                    <select
                      value={selectedBrand}
                      className="dropdown_styl1"
                      onChange={({ target: { value } }) => {
                        setSelectedBrand(value);
                        setSelectedType();
                        if (value !== "") {
                          setShowOthers(false);
                          setTitle(value);
                        } else {
                          if (selectedSubSubCategory !== "") {
                            setShowOthers(false);
                          } else {
                            setShowOthers(true);
                          }
                          setSelectedType("allProducts");
                          setTitle("All Products");
                        }
                      }}
                    >
                      <option value="">Select</option>
                      {getBrands().map((brand) => (
                        <option value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="pull-right">
                <div className="brand_select">
                  <h6>Category:</h6>
                  <div className="dropmenu_select">
                    <select
                      value={selectedSubSubCategory}
                      className="dropdown_styl1"
                      onChange={({ target: { value } }) => {
                        setSelectedSubSubCategory(value);
                        setSelectedType();
                        if (value !== "" || selectedBrand !== "") {
                          setShowOthers(false);
                          if (selectedBrand === "") {
                            setTitle("All Products");
                          }
                        } else {
                          setShowOthers(true);
                        }
                      }}
                    >
                      <option value="allProducts">Select</option>
                      {getSubSubCategory().map((category) => (
                        <option value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showOthers && (
          <>
            <CampaignProductsGrid
              products={bestSellerProducts}
              title="Best Seller"
              infiniteScroll={true}
            />
            {/* <CampaignProductsGrid products={otherProducts} title="Only For You" infiniteScroll={false} /> */}
          </>
        )}

{/* {showOthers && (bundleProducts.length > 0) && (
          <>
            <CampaignProductsGrid
              products={bundleProducts}
              title="bundles"
              infiniteScroll={true}
            />
          </>
        )} */}

        <CampaignProductsGrid
          products={filter().products}
          title={title}
          infiniteScroll={true}
        />
      </div>  

      
    </>
  );
}
