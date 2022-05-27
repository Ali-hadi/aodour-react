import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_LIVE_SESSION_SALE } from "../constants/actionTypes";
import ReactPaginate from "react-paginate";
import "../styles/compaign11.css";
import CampaignProductsGrid from "../components/Campaign/CampaignProductsGrid";
import { isMobile } from "react-device-detect";
import ReactOwlCarousel from "react-owl-carousel";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader/compnentLoader";
const gradient = "https://storage.googleapis.com/aodour_v1/images/11compaign/bground.png";

// let filteredProducts = [];
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

export default function Campaign() {

  const dispatch = useDispatch();

  const forceUpdate = useForceUpdate();
  const { brandSlug } = useParams();

  const {
    // campaignProducts: { products },
    campaign11Brand: {products, banner,mobile_banner, upcomingbanner},
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
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  }, [selectedType]);

  useEffect(() => {
    setLoading(true);

    dispatch({
      type: GET_LIVE_SESSION_SALE,
      brandSlug,
      callback: () => {
        setLoading(false)
      }
    });
  }, []);

  const getSubSubCategory = () => {
    let subSubCategories = [];
    if (products && products.length > 0) {
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
    // return {
    //   products: newProducts,
    //   length: newProducts.length,
    // };
    return newProducts
  };

  const responsive = {
    0: {
      items: 2,
    },
    767: {
      items: 4,
    },
    1366: {
      items: 5,
    },
  };

  useEffect(() => {
    setPage(0);
  }, [selectedType, selectedBrand, selectedSubSubCategory]);

  return (
    <>
      <Helmet>
        <title>
          {"live-session-sale"}
        </title>
        <meta name="description" content={""} />
        <meta name="keywords" content={""} />
      </Helmet>
      <Loader loading={loading} />

      
      <div className="background-bg" >
        <div className="bg_gradient">
            <img className="desktop" src={banner} alt="brand banner" />
            <img className="Mobile" src={mobile_banner} alt="brand banner" />
        </div>
        {/* <div className="sprator-30"></div> */}
        {/* <div className="container-fluid">
          <div className="dropdown-mobile">
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
                        // setShowOthers(false);
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
        </div>   */}
        <div className="bg_gradient">
          {showOthers && (
            <>
              <CampaignProductsGrid lazyLoad={true} responsive={responsive}
                products={products ? filter() : []}
                infiniteScroll={true}
                title=""
                live_session={true}
              />

            </>
          )}
        </div>

        {/* <div className="section">
          <div className="container-fluid">
            <div className="heading_2">
              <h4>Upcoming Brands</h4>
            </div>
            <div className="upcoming_brands">
              <div className="row">
                {
                  upcomingbanner && upcomingbanner.map(item => ( 
                  <div className="col-md-4 col-sm-4 col-xs-12">
                  <img src={item.image} alt="img here" />
                </div>))
                }
              </div>
            </div>
          </div>
        </div> */}

      </div>

    </>
  );
}
