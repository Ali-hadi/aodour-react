import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import "./header.css";
import {GET_MANISO_MENU } from "../../constants/actionTypes";
import { Link, useHistory } from "react-router-dom";
import MinisoMobileNav from "./MinisoMobileNav";
import ProfileIcon from "./ProfileIcon";
const MinisoLogo =
  "https://storage.googleapis.com/aodour_v1/website/miniso-logo.png";
const TrackIcon =
  "https://storage.googleapis.com/aodour_v1/website/track_icon.png";

export default function MinisoNav({
  // minisoMenu,
  // categories,
  // subSubCategories,
  // subCategories,
}) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_MANISO_MENU });
  }, [])

  const { minisoMenu } = useSelector(({ minisoMenu }) => minisoMenu);

  const mainData =
    minisoMenu && minisoMenu.result && minisoMenu.result.category;

  const categories = mainData && mainData.categories;

  const subCategories = mainData && mainData.subcategories;

  const subSubCategories = mainData && mainData.subsubcategories;

  const data = minisoMenu && minisoMenu.result && minisoMenu.result.data;
  const cate = minisoMenu && minisoMenu.result && minisoMenu.result.category;

  const history = useHistory();

  const [selectedCategory, setSelectedCategory] = useState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const getCategorySlug = (subCategory) => {
    for (const category of selectedCategory.subcategory) {
      if (category.id === subCategory.id) {
        return category.slug;
      }
    }
  };
  const chunkify = (a, n, balanced) => {
    if (n < 2) return [a];

    var len = a && a.length,
      out = [],
      i = 0,
      size;

    if (len % n === 0) {
      size = Math.floor(len / n);
      while (i < len) {
        out.push(a.slice(i, (i += size)));
      }
    } else if (balanced) {
      while (i < len) {
        size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, (i += size)));
      }
    } else {
      n--;
      size = Math.floor(len / n);
      if (len % size === 0) size--;
      while (i < size * n) {
        out.push(a.slice(i, (i += size)));
      }
      out.push(a.slice(size * n));
    }

    return out;
  };

  const handleMouseOver = (e, item, from) => {
    
    e.stopPropagation();
    e.preventDefault();
    if (item && item.subcategory) {
      // alert('if')
      setSelectedCategory(item);
    } else if (item && item.category && Array.isArray(item.category)) {
      // alert('else if')
      setSelectedCategory(item.category[0]);
    } else {
      // alert('else')
      setSelectedCategory(item);
    }
  };

  const SelectedCategorySubCates =  () => {
    let temp1 =
      subCategories &&
      subCategories.filter((cate) => {
        return (
          Number(cate.category_id) ===
          Number(selectedCategory && selectedCategory.id)
        );
      });
    let withcount =
      temp1 &&
      temp1.map((cat) => {
        cat = { ...cat, count: 0 };
        subSubCategories.map((subCat) => {
          if (subCat.category_id === cat.id) {
            cat.count++;
          }
        });
        return cat;
      });

    const chunks = chunkify(
      withcount && withcount.filter((cate) => cate.count > 0),
      3,
      true
    );

    return chunks.map((subCat, index) => {
      return (
        <div key={index} className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          {index === 0 &&
            withcount
              .filter((cate) => cate.count < 1)
              .map((subCategory) => (
                <div key={subCategory.slug} className="list-column">
                  <Link to={`/miniso/subcategory/${subCategory.slug}`}>
                    <h6>{subCategory.name}</h6>
                  </Link>
                </div>
              ))}
          {subCat.map((subCategory) => {
            if (subCategory.category_id === selectedCategory.id) {
              return (
                <div key={subCategory.slug} className="list-column">
                  <Link
                    to={`/miniso/subcategory/${
                      subCategory.slug
                    }`}
                  >
                    <h6>{subCategory.name}</h6>
                  </Link>
                  <ul className="list">
                    {subSubCategories.map((subSubCategory) => {
                      if (subSubCategory.category_id === subCategory.id) {
                        return (
                          <li key={subSubCategory.slug}>
                            <Link
                              to={`/miniso/${getCategorySlug(subCategory)}/${
                                subSubCategory.slug
                              }`}
                            >
                              {subSubCategory.name}
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              );
            }
          })}
        </div>
      );
    });
  };

  return (
    <header className="miniso-header">
      <div className="container-fluid">
        {/* <div className="responsive-btn">
          <label className="sidebaricon" onClick={() => setOpen(true)}>
            <div className="spinner diagonal part-1"></div>
            <div className="spinner horizontal"></div>
            <div className="spinner diagonal part-2"></div>
          </label>
          <MobileNav isOpen={open} onClose={setOpen} categories={cate} />
        </div> */}

        <div className="responsive-btn">
          <div className="miniso_btn" onClick={() => setOpen(true)}>
            <i classNames="fa fa-bars" aria-hidden="true"></i>
            <span>category</span>
          </div>
          <MinisoMobileNav
            isOpen={open}
            onClose={setOpen}
            categories={data}
            // new_brands={new_brands ? new_brands : []}
            // popular_brands={popular_brands ? popular_brands : []}
            // all_brands={all_brands ? all_brands : []}
            // isMiniso={isMiniso}
          />
        </div>



        <div className="logo center">
          <h1>
            <Link to="/miniso">
              <img src={MinisoLogo} alt="miniso logo" />
            </Link>
          </h1>
        </div>

        <div className="navigation-menu">
          <nav className="miniso-nav">
            <ul className="miniso-menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              {data &&
                data.map((category, index) => {
                  return (
                    <li
                      key={index}
                      onMouseEnter={(e) => {
                        handleMouseOver(e, category, 3);
                      }}

                      // onMouseOut={(e) =>
                      //   handleMouseOver(e, selectedCategory, 4)
                      // }
                    >
                      <a href="#">{category.main_category}</a>
                      <div className="mega-menu">
                        <div className="mega-content">
                          <div className="list-column side-list">
                            {category &&
                              category.category &&
                              category.category.map((items, index) => {
                                return (
                                  <div key={index}>
                                    <ul className="list">
                                      <li
                                        key={items.id}
                                        className={
                                          selectedCategory &&
                                          selectedCategory.id === items.id
                                            ? "active"
                                            : ""
                                        }
                                        onMouseEnter={(e) => {
                                          handleMouseOver(e, items, 1);
                                        }}
                                        // onMouseOut={(e) =>
                                        //   handleMouseOver(e, selectedCategory, 2)
                                        // }
                                      >
                                        {/* "active" for Active Class*/}
                                        <Link to={`/miniso/${items.slug}`}>
                                          {items.name}
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                );
                              })}
                          </div>
                          <div className="tab-mega">
                            <div className="row">
                              <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
                                <div className="row">
                                  {SelectedCategorySubCates()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              <li></li>
            </ul>
          </nav>
        </div>

        {/* <div className="pull-right">
          <div className="right-btns">
            <ul className="shop_cart meta">
              <li>
                <div className="logo res">
                  <Link to="/track-order">
                    <img src={TrackIcon} alt="img here" />
                  </Link>
                </div>
              </li>
              <ProfileIcon />
            </ul>
          </div>
        </div> */}
        
      
      </div>
    </header>
  );
}
