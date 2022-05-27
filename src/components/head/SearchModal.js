import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GET_SEARCH_RESULT,
  GET_SEARCH_RESULT_EMPTY,
} from "../../constants/actionTypes";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import "../../styles/Modal.css";
import { fbqTrack } from "../../util/FacebookAnalytics";
import { isMobile } from "react-device-detect";
import $ from "jquery"
export default function SearchModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");
  const [pageDisplay, setPageDisplay] = useState(true);

  const {
    searchResult,
    menu: { category },
  } = useSelector((state) => state);
  const onChangeHandler = ({ target: { value } }) => {
    if (value.trim().length > 2) {
      dispatch({
        type: GET_SEARCH_RESULT,
        payload: value.trim(),
      });
      fbqTrack("Search", {
        search_string: value,
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: GET_SEARCH_RESULT_EMPTY,
      payload: {
        brands: [],
        categories: [],
        subcategories: [],
        subsubcategories: [],
        products: [],
      },
    });

    $(document).ready(function(){
      $(document).click(function(e){
          if ($(e.target).is('#search-form-modal,#search-form-modal *')) {
              return;
          }
          else
          {
            filterPageHide()
          }
      });
  });

  }, []);

  const getCategorySlug = (subSubCat) => {
    for (const subcategory of category.subcategories) {
      if (subSubCat.category_id === subcategory.id) {
        for (const cat of category.categories) {
          if (subcategory.category_id === cat.id) {
            return cat.slug;
          }
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      history.push(`/shop/searchresult/${e.target.value}`);
      fbqTrack("Search", {
        search_string: e.target.value,
      });
      dispatch({
        type: GET_SEARCH_RESULT_EMPTY,
        payload: {
          brands: [],
          categories: [],
          subcategories: [],
          subsubcategories: [],
          products: [],
        },
      });
    } else if (e.target.value) {
      setSearchValue(e.target.value);
    }
  };

  const onsubmit = (e) => {
    if (searchValue) {
      history.push(`/shop/searchresult/${searchValue}`);
      fbqTrack("Search", {
        search_string: searchValue,
      });
      dispatch({
        type: GET_SEARCH_RESULT_EMPTY,
        payload: {
          brands: [],
          categories: [],
          subcategories: [],
          subsubcategories: [],
          products: [],
        },
      });
    }
  };

  const filterPageHide = () => {
    setPageDisplay(false);
  };

  const OnMobile = (e) => {
    if (isMobile) {
      return {
        brands: searchResult.brands.slice(0, 1),
        categories: searchResult.categories.slice(0, 1),
        subcategories: searchResult.subcategories.slice(0, 1),
        subsubcategories: searchResult.subsubcategories.slice(0, 1),
        products: searchResult.products,
      };
    }
    return searchResult;
  };
  const {
    brands,
    categories,
    subcategories,
    subsubcategories,
    products,
  } = OnMobile();
  const showSearchList =
    (brands.length > 0 || categories.length > 0 || products.length > 0) &&
    pageDisplay;
  return (
    <>
      {/*
	=========================================
		SEARCH POPUP STARTS
	=========================================
	*/}

      <div className="search-form">
        {/*
					=========================================
						SEARCH FORM
					=========================================
			  		*/}
        <form>
          <div className="search_element" id="search-form-modal"> 
            <div className="search_componet">
              <input
                type="text"
                // autoFocus={true}
                placeholder="Search in Aodour...."
                onChange={onChangeHandler}
                onFocus={() => setPageDisplay(true)}
                onKeyDown={handleKeyDown}
              />
              {/*INPUT FELID*/}
              <button onClick={onsubmit}>
                <i className="icon-search"></i>
              </button>
            </div>
            {/*BUTTON FELID*/}
            {/* <ul className="btn-linked">
		  						<li><Link to='/' >Best Sellers</Link></li>
		  						<li><Link to='/' >New Arrival</Link></li>
		  						<li><Link to='/' >Royal Bazaar</Link></li>
		  					</ul> */}
            <div
              className="filter_search"
              style={{
                display: showSearchList ? "block" : "none",
              }}
            >
              {brands.length > 0 && (
                <div className="search-dropmenu">
                  <h5>Brands</h5>
                  {brands &&
                    brands.map(({ item: brand }) => (
                      <Link to={`/brand/${brand.slug}`}>
                        <div onClick={filterPageHide} className="sea_dev logo_width">
                          <figure>
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              title={brand.name}
                            />
                          </figure>
                          {/* <p>
                                  <span>{brand.name}</span>
                                </p> */}
                        </div>
                      </Link>
                    ))}
                </div>
              )}
              {(categories.length > 0 ||
                subcategories.length > 0 ||
                subsubcategories.length > 0) && (
                <>
                  <div className="search-dropmenu auto-width">
                    <h5>categories</h5>
                    {categories &&
                      categories.map(({ item: cat }) => (
                        <Link to={`/shop/${cat.slug}`}>
                          <div onClick={filterPageHide} className="sea_dev ">
                            <p>
                              <span>{cat.name}</span>
                            </p>
                          </div>
                        </Link>
                      ))}
                    {subcategories &&
                      subcategories.map(({ item: cat }) => (
                        <Link to={`/subcategory/${cat.slug}`}>
                          <div onClick={filterPageHide} className="sea_dev ">
                            <p>
                              <span>{cat.name}</span>
                            </p>
                          </div>
                        </Link>
                      ))}
                    {subsubcategories &&
                      subsubcategories.map(({ item: cat }) => (
                        <Link to={`/shop/${getCategorySlug(cat)}/${cat.slug}`}>
                          <div onClick={filterPageHide} className="sea_dev">
                            <p>
                              <span>{cat.name}</span>
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
                </>
              )}
              <div>
                {products.length > 0 && (
                  <div className="search-dropmenu">
                    <h5 className="enable_mobile">Products</h5>
                    {products &&
                      products.map(({ item: product }) => (
                        <Link
                          to={{
                            pathname: `/brand/${product.brand_slug}/${product.slug}`,
                          }}
                        >
                          <div onClick={filterPageHide} className="sea_dev">
                            <div className="dev_image">
                              <div
                                className="dev_picture"
                                style={{
                                  backgroundImage: `url(${product.image})`,
                                }}
                              ></div>
                            </div>
                            <p>
                              <span>{product.name}</span>
                              <small>Rs.{product.price}</small>
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
              <span
                    className="cross-btn icon-close"
                    heigh="200px"
                    width="200px"
                    onClick={filterPageHide}
                  >
              </span>
            </div>
            {/*CLOSE BUTTON*/}
          </div>
        </form>
        {/*
					=========================================
						SEARCH FORM ENDS
					=========================================
			  		*/}
      </div>
    </>
  );
}
