import React, { useEffect, useRef } from "react";
import Drawer from "rc-drawer";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  GET_SEARCH_RESULT,
  GET_SEARCH_RESULT_EMPTY
} from "../constants/actionTypes";
// import "rc-drawer/assets/index.css";
import "./MobileSearchDrawer.css";
export default function MobileSearchModal({ isOpen, onClose }) {
  let inputref = useRef();
  const {
    searchResult: {
      brands = [],
      categories = [],
      subcategories = [],
      subsubcategories = [],
      products = []
    },
    menu: { category }
  } = useSelector(state => state);
  useEffect(() => {
    // console.log(inputref);
    if (inputref.current !== undefined) inputref.current.focus();
  });

  useEffect(() => {
    return () =>
      dispatch({
        type: GET_SEARCH_RESULT_EMPTY,
        payload: {
          brands: [],
          categories: [],
          subcategories: [],
          subsubcategories: [],
          products: []
        }
      });
  }, []);

  const dispatch = useDispatch();
  const onChangeHandler = ({ target: { value } }) => {
    // setsearchValue(value)
    if (value.length > 1) {
      dispatch({
        type: GET_SEARCH_RESULT,
        payload: value
      });
    }
  };

  const getCategorySlug = subSubCat => {
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

  return (
    <>
      <Drawer
        width="100vw"
        handler={false}
        open={isOpen}
        onClose={() => {
          dispatch({
            type: GET_SEARCH_RESULT_EMPTY,
            payload: { brands: [], categories: [], products: [] }
          });
          onClose(!true);
        }}
        className="SearchDrawer"
        placement="right"
        level={"#root"}
        // style={{ opacity: isOpen ? 0 : 1 }}
      >
        <div className="search_row ">
          <form>
            <div className="search-box">
              <span
                onClick={() => {
                  dispatch({
                    type: GET_SEARCH_RESULT_EMPTY,
                    payload: { brands: [], categories: [], products: [] }
                  });
                  onClose(!true);
                }}
              >
                <i className="icon-left-chevron" aria-hidden="true"></i>
              </span>
              <input
                ref={inputref}
                autoFocus={true}
                type="text"
                placeholder="Aodour Search ..."
                onChange={onChangeHandler}
              />
              <button className="">
                <i className="icon-search"></i>
              </button>
            </div>
            <div className="search_dav">
              {brands.length > 0 && (
                <div className="group_search">
                  <h5>Brand</h5>
                  {brands &&
                    brands.map(brand => (
                      <Link to={`/brand/${brand.slug}`} >
                        <div className="dev_search">
                          <img
                            src="https://via.placeholder.com/150"
                            alt={brand.name}
                          />
                          <div className="dev_caption">
                            <p>{brand.name}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
              {(categories.length > 0 ||
                subcategories.length > 0 ||
                subsubcategories.length > 0) && (
                <div className="group_search">
                  <h5>categories</h5>
                  {categories &&
                    categories.map(cat => (
                      <Link to={`/shop/${cat.slug}`} >
                        <div className="dev_search">
                          <img
                            src="https://via.placeholder.com/150"
                            alt={cat.name}
                          />
                          <div className="dev_caption">
                            <p>{cat.name}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  {subcategories &&
                    subcategories.map(cat => (
                      <Link to={`/subcategory/${cat.slug}`} >
                        <div className="dev_search">
                          <img
                            src="https://via.placeholder.com/150"
                            alt={cat.name}
                          />
                          <div className="dev_caption">
                            <p>{cat.name}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  {subsubcategories &&
                    subsubcategories.map(cat => (
                      <Link
                        to={`/shop/${getCategorySlug(cat)}/${cat.slug}`}
                        
                      >
                        <div className="dev_search">
                          <img
                            src="https://via.placeholder.com/150"
                            alt={cat.name}
                          />
                          <div className="dev_caption">
                            <p>{cat.name}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
              {products.length > 0 && (
                <div className="group_search">
                  <h5>products</h5>
                  {products &&
                    products.map(product => (
                      <Link
                        to={{
                          pathname: `/brand/${product.brand_slug}/${product.slug}`
                        }}
                        
                      >
                        <div className="dev_search">
                          <img
                            src="https://via.placeholder.com/150"
                            alt={product.name}
                          />
                          <div className="dev_caption">
                            <p>{product.name}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </form>
        </div>
      </Drawer>
    </>
  );
}
