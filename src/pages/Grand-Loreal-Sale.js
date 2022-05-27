import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CAMPAIGN_LISTING } from "../constants/actionTypes";
import ReactPaginate from "react-paginate";
import "../styles/sale.css";
import CampaignProductsGrid from "../components/Campaign/CampaignProductsGrid";
import { isMobile } from "react-device-detect";
import ReactOwlCarousel from "react-owl-carousel";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/compnentLoader";

// let filteredProducts = [];
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

export default function Campaign() {
  const SaleBanner =
    "https://storage.googleapis.com/aodour_v1/campaign/Banner6.jpg";
  const BrandsBanner =
    "https://storage.googleapis.com/aodour_v1/campaign/BrandsBanner.png";
  const BrandsBannerMobile =
    "https://storage.googleapis.com/aodour_v1/campaign/BrandsBannerMobile.jpg";
  const SaleBannerMobile =
    "https://storage.googleapis.com/aodour_v1/campaign/sale_mobile_banner4.jpg";
  const SaleIcon1 =
    "https://storage.googleapis.com/aodour_v1/campaign/salelogo.png";
  const SaleIcon2 =
    "https://storage.googleapis.com/aodour_v1/campaign/sale_icon_20.png";
  const SaleIcon3 =
    "https://storage.googleapis.com/aodour_v1/campaign/salelogo2.png";
  const SaleIcon4 =
    "https://storage.googleapis.com/aodour_v1/campaign/salelogo3.png";
  const SaleIcon5 =
    "https://storage.googleapis.com/aodour_v1/campaign/salelogo4.png";
  const SaleIcon6 =
    "https://storage.googleapis.com/aodour_v1/campaign/sale_icon_100.png";
  const SaleIcon7 =
    "https://storage.googleapis.com/aodour_v1/campaign/salelogo5.png";
  const DiscountBanner =
    "https://storage.googleapis.com/aodour_v1/campaign/discount_banner.jpg";

  const dispatch = useDispatch();

  const forceUpdate = useForceUpdate();

  const {
    campaignProducts: { products },
  } = useSelector((state) => state);

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
    // forceUpdate();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [selectedType]);

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
    setBundleProducts(
      products.filter((product) => product.menu === "bundles")
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
        newProducts = newProducts.filter(
          (product) => product.menu === selectedType
        );
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
          {"Grand Loreal sale"}
        </title>
        <meta name="description" content={""} />
        <meta name="keywords" content={""} />
      </Helmet>
      <Loader loading={loading} />

      {/*  For Desktop banners  */}
      <div className="eid_sale for-desktop">
          <h1>
            <img src={SaleBanner} alt="img here" />
          </h1>
          <img src={BrandsBanner} alt="img here" />
      </div>

      {/*  For Mobile banners  */}
      <div className="eid_sale for-mobile">
        <h1>
          <img src={SaleBannerMobile} alt="img here" />
        </h1>
        <img src={BrandsBannerMobile} alt="img here" />
      </div>

      <div className="group_filter">
        <div className="container-fluid">
          <div className="services_columns">
            <ReactOwlCarousel lazyLoad={true} responsive={responsive}>
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
                  setLoading(true);
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

              {/* <div
                onClick={() => {
                  if (selectedType === "40% off") {
                    return;
                  }
                  setSelectedType("40% off");
                  setSelectedBrand("");
                  setSelectedSubSubCategory("");
                  setShowOthers(false);
                  setTitle("40% off");
                  setLoading(true);
                }}
              >
                <span className="fullimg">
                  <img src={SaleIcon2} alt="icon image png" />
                </span>
                <small className={selectedType === "40% off" ? "current" : ""}></small>
              </div> */}
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
                  setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon3} alt="icon image png" />
                </span>
                <small className={selectedType === "makeup" ? "current" : ""}>
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
                  setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon4} alt="icon image png" />
                </span>
                <small className={selectedType === "skincare" ? "current" : ""}>
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
                  setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon5} alt="icon image png" />
                </span>
                <small className={selectedType === "haircare" ? "current" : ""}>
                hair care
                </small>
              </div>
              {/* <div
                onClick={() => {
                  if (selectedType === "face-mask") {
                    return;
                  }
                  setSelectedType("face-mask");
                  setSelectedBrand("");
                  setSelectedSubSubCategory("");
                  setShowOthers(false);
                  setTitle("face mask");
                  setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon6} alt="icon image png" />
                </span>
                <small className={selectedType === "face-mask" ? "current" : ""}>
                face mask
                </small>
              </div> */}
              <div
                onClick={() => {
                  if (selectedType === "bundles") {
                    return;
                  }
                  setSelectedType("bundles");
                  setSelectedBrand("");
                  setSelectedSubSubCategory("");
                  setShowOthers(false);
                  setTitle("bundles");
                  setLoading(true);
                }}
              >
                <span>
                  <img src={SaleIcon6} alt="icon image png" />
                </span>
                <small className={selectedType === "bundles" ? "current" : ""}>
                bundles
                </small>
              </div>
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
      <section className="bg1_r">
        {showOthers && (
          <>
            <CampaignProductsGrid
              products={bestSellerProducts}
              title="Best Seller"
              infiniteScroll={false}
            />
            <CampaignProductsGrid products={bundleProducts} title="Bundle" infiniteScroll={false} />
          </>
        )}

        <CampaignProductsGrid
          products={filter().products}
          title={title}
          infiniteScroll={true}
        />
      </section>
      {/* { !isMobile &&
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={filter().length / 50}
          initialPage={0}
          marginPagesDisplayed={3}
          pageRangeDisplayed={5}
          onPageChange={(value) => {
						setPage(value.selected);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
					forcePage={page}
          breakClassName={"pagination_item"}
          breakLinkClassName={"pagination_link"}
          containerClassName={"pagination_conainter"}
          pageClassName={"pagination_item"}
          pageLinkClassName={"pagination_link"}
          previousClassName={"previous_page"}
          previousLinkClassName={"pagination_link"}
          nextClassName={"next_page"}
          nextLinkClassName={"pagination_link"}
          activeClassName={"active"}
        />
      } */}
    </>
  );
}
