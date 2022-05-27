import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CAMPAIGN_LISTING } from "../constants/actionTypes";
import ReactPaginate from "react-paginate";
import "../styles/sale.css";
import CampaignProductsGrid from "../components/Campaign/CampaignProductsGrid";
import { isMobile } from "react-device-detect";
import ReactOwlCarousel from "react-owl-carousel";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader/compnentLoader";
const SaleIcon1 = "https://storage.googleapis.com/aodour_v1/images/icon/sale_icon_1.png";
const SaleIcon2 = "https://storage.googleapis.com/aodour_v1/images/icon/sale_icon_2.png";
const SaleIcon3 = "https://storage.googleapis.com/aodour_v1/images/icon/sale_icon_3.png";
const SaleIcon4 = "https://storage.googleapis.com/aodour_v1/images/icon/sale_icon_4.png";
const gradient = "https://storage.googleapis.com/aodour_v1/images/11compaign/bground.png";
const Banner = "https://storage.googleapis.com/aodour_v1/banners/othergoodiesWeb-Banners-4.jpg";
const Bannermobile = "https://storage.googleapis.com/aodour_v1/banners/othergoodiesMobiile-Banners-4.jpg";
// let filteredProducts = [];

export default function Campaign() {
  // const SaleBanner =
  //   "https://storage.googleapis.com/aodour_v1/campaign/Banner6.jpg";
  // const SaleIcon1 =
  //   "https://storage.googleapis.com/aodour_v1/campaign/sale_icon_1.png";
  // const SaleIcon2 =
  //   "https://storage.googleapis.com/aodour_v1/campaign/sale_icon_2.png";
  // const SaleIcon3 =
  //   "https://storage.googleapis.com/aodour_v1/campaign/sale_icon_3.png";
  // const SaleIcon4 =
  //   "https://storage.googleapis.com/aodour_v1/campaign/sale_icon_4.png";
  // const SaleIcon5 =
  //   "https://storage.googleapis.com/aodour_v1/campaign/sale_icon_5.png";
  // const SaleIcon6 =
  //   "https://storage.googleapis.com/aodour_v1/campaign/sale_icon_6.png";
  // const DiscountBanner =
  //   "https://storage.googleapis.com/aodour_v1/campaign/discount_banner.jpg";

  const dispatch = useDispatch();

  const {
    campaignProducts: { products },
  } = useSelector((state) => state);

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
      type: GET_CAMPAIGN_LISTING,
      callback: () => setLoading(false),
    });
  }, []);

  useEffect(() => {
    setBestSellerProducts(
      products.filter((product) => product.bestSeller === "1")
    );
    setOtherProducts(products.filter((product) => product.menu === "others"));
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
          {"11.11 Upcoming Sale of the 2020 Year | Aodour"}
        </title>
        <meta name="description" content={""} />
        <meta name="keywords" content={"11.11 Upcoming Sale of the 2020 Year | Aodour"} />
      </Helmet>
      <Loader loading={loading} />

      <div className="background-bg pt-30">

        <div className="screen-show">
          <div className="container-fluid">
            <div className="banner_screen">
              <img className="for-desktop" src={Banner} alt="brand banner" />
              <img className="for-mobile" src={Bannermobile} alt="brand banner" />
            </div>
          </div>
        </div>
        
        <div className="group_filter">
          <div className="container-fluid">
            <div className="services_columns">
              <ReactOwlCarousel lazyLoad={true} responsive={responsive}>
                <div
                  onClick={() => {
                    setSelectedType("allProducts");
                    setSelectedBrand("");
                    setSelectedSubSubCategory("");
                    setShowOthers(true);
                    setTitle("All Products");
                  }}
                >
                  <span>
                    <img src={SaleIcon1} alt="icon image png" />
                  </span>
                  <small>All Products</small>
                </div>
                {/* <div
                  onClick={() => {
                    setSelectedType("offProducts");
                    setSelectedBrand("");
                    setSelectedSubSubCategory("");
                    setShowOthers(false);
                    setTitle("Above 50% Off");
                  }}
                >
                  <span>
                    <img src={SaleIcon2} alt="icon image png" />
                  </span>
                  <small>off products</small>
                </div> */}
                <div
                  onClick={() => {
                    setSelectedType("makeup");
                    setSelectedBrand("");
                    setSelectedSubSubCategory("");
                    setShowOthers(false);
                    setTitle("Make Up");
                  }}
                >
                  <span>
                    <img src={SaleIcon2} alt="icon image png" />
                  </span>
                  <small>Makeup</small>
                </div>
                <div
                  onClick={() => {
                    setSelectedType("skincare");
                    setSelectedBrand("");
                    setSelectedSubSubCategory("");
                    setShowOthers(false);
                    setTitle("Skin Care");
                  }}
                >
                  <span>
                    <img src={SaleIcon3} alt="icon image png" />
                  </span>
                  <small>skin care</small>
                </div>
                <div
                  onClick={() => {
                    setSelectedType("hair");
                    setSelectedBrand("");
                    setSelectedSubSubCategory("");
                    setShowOthers(false);
                    setTitle("Hair Care");
                  }}
                >
                  <span>
                    <img src={SaleIcon4} alt="icon image png" />
                  </span>
                  <small>hair care</small>
                </div>
                {/* <div
                  onClick={() => {
                    setSelectedType("health");
                    setSelectedBrand("");
                    setSelectedSubSubCategory("");
                    setShowOthers(false);
                    setTitle("Health Care");
                  }}
                >
                  <span>
                    <img src={SaleIcon5} alt="icon image png" />
                  </span>
                  <small>health care</small>
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
                      <option value="">Select</option>
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

        <CampaignProductsGrid
          products={filter().products}
          title={title}
          infiniteScroll={true}
        />
      </div>  

      
    </>
  );
}
