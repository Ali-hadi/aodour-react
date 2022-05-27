import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";

import MobileCategoryList from "./MobileCategoryList";
import BrandListMobileNav from "./MobileBrandList";
import MobileAtoZListing from "./MobileAtoZListing";
import { Link, useHistory } from "react-router-dom";
import { isAndroid } from "react-device-detect";
import MinisoMobileCategoryList from "./MinisoMobileCategoryList"

const CategoryListMobileNav = ({ categories, showSubCate, setshowSubCate, isMiniso, onClose }) => {
  const [selectCategory, setSelectedCategory] = useState(null);
  const history = useHistory();
  const cats =
    categories && categories.categories ? categories.categories : categories;

  // console.log(categories, 'cats cats cats', selectCategory);

  const onSelectChange = (item) => {
    setSelectedCategory(item);
    setshowSubCate(true);
  }

  return (
    <>
      {!showSubCate && (
        <>
          {cats.map((item, index) => {
            return (
              <MinisoMobileCategoryList
                Name={item.name || item.main_category}
                onSelectChange={onSelectChange}
                categories={item.category}
                category={item.category}
                key={index}

              />
              // <li
              //   key={item.id}
              //   onClick={() => {
              //     setSelectedCategory(item);
              //     setshowSubCate(true);
              //   }}
              // >
              //   {item.name || item.main_category}

              //   <span className="icon-right" aria-hidden="true"></span>
              // </li>
            );
          })}
        </>
      )}

      <SubSubCategoryCategoryListMobileNav
        selectCategory={selectCategory}
        categories={categories}
        Show={showSubCate}
        setShow={setshowSubCate}
        onClose={onClose}
      />
    </>
  );
};

const SubSubCategoryCategoryListMobileNav = ({
  selectCategory,
  categories,
  Show,
  setShow,
  onClose
}) => {
  const relativeSubSubCategory = (SubSubCategory, SubCategory) => {
    return SubSubCategory.filter((item) =>
      item.category_id === SubCategory ? true : false
    );
  };
  const history = useHistory();
  // console.log(selectCategory, Show, "categories list", categories);
  return (
    <>
      {Show && (
        <div className="side-heading">
          <div className="back-to-menu">
            <span
              className="icon-left-chevron"
              onClick={() => setShow(false)}
            ></span>
          </div>
          <h6>
            <Link
              to={
                history.location.pathname === "/miniso"
                  ? `/miniso/${selectCategory.slug}`
                  : `/shop/${selectCategory.slug}`
              }

            >
              {selectCategory.name || selectCategory.main_category}
            </Link>
          </h6>
        </div>
      )}

      <CSSTransition in={Show} timeout={300} classNames="slide">
        <div className="third_level">
          {Show &&
            selectCategory.subcategory &&
            selectCategory.subcategory.map((item, index) => {
              // if (item.slug === selectCategory.slug) {
              return (
                <div>
                  <MobileCategoryList
                    Name={item.name}
                    SubSubCategory={item.subsubcategory}
                    subCategory={selectCategory}
                    categories={selectCategory.subcategory}
                    key={index}
                    fromMiniso={true}
                    setShow={setShow}
                    onClose={onClose}
                    
                  />
                </div>
              );
              // }
              // return null;
            })}
        </div>
      </CSSTransition>
    </>
  );
};

const BrandList = ({
  popular_brands,
  new_brands,
  Show,
  setShow,
  all_brands,
}) => {
  return (
    <>
      {Show && (
        <div className="side-heading">
          <div className="back-to-menu">
            <span
              className="icon-left-chevron"
              onClick={() => setShow(false)}
            ></span>
          </div>
          <h6>Brands</h6>
        </div>
      )}
      <CSSTransition in={Show} timeout={300} classNames="slide">
        <div className="lavel2_drop">
          {Show && (
            <div className="">
              <MobileAtoZListing brands={all_brands} />
              <BrandListMobileNav Name="Popular" brands={popular_brands} />
              <BrandListMobileNav Name="New" brands={new_brands} />
            </div>
          )}
        </div>
      </CSSTransition>
    </>
  );
};

export default function NavBarCategoryMenu({
  popular_brands,
  new_brands,
  all_brands,
  isOpen,
  onClose,
  categories,
  isMiniso
}) {
  const [showBrands, setshowBrands] = useState(false);
  const [showSubCate, setshowSubCate] = useState(false);

  return (
    <>
      <Drawer
        width="100vw"
        handler={false}
        open={isOpen}
        onClose={() => onClose(false)}
        className="miniso_nav_menu"
        placement="right"
        level={null}
      >
        <div className="icon_button" onClick={() => onClose(false)}>
          <i className="icon-left" aria-hidden="true"></i> Back to store
        </div>

        <CSSTransition in={!showBrands} timeout={300} classNames="slide">
          <div>
            {!showBrands && (
              <ul className="side_list_menu">
                <li>
                  <Link to="/miniso">Home</Link>
                </li>
                <CategoryListMobileNav
                  categories={categories}
                  showSubCate={showSubCate}
                  setshowSubCate={setshowSubCate}
                  isMiniso={isMiniso}
                  onClose={onClose}
                />
              </ul>
            )}
          </div>
        </CSSTransition>

        {!showSubCate && !showBrands && (
          <div className="fix_bottom w-100">
            <ul className="social-icons">
              <li>
                <a
                  href={
                    isAndroid
                      ? "fb://page/271430946584506"
                      : "fb://profile/271430946584506"
                  }
                  target="_blank"
                >
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/aodourpakistan/"
                  target="_blank"
                >
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/AodourPakistan" target="_blank">
                  <i className="fa fa-twitter" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/channel/UCr81MePqWu-OfInHM7xjZmQ"
                  target="_blank"
                >
                  <i className="fa fa-youtube-play" aria-hidden="true"></i>
                </a>
              </li>
              <li>
                <a
                  href="https://api.whatsapp.com/send?phone=+923134846158"
                  target="_blank"
                >
                  <i className="fa fa-whatsapp" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
            {/* <ul className="social_icons">
              <li>
                <h6>
                  <i className="icon-user"></i>login
                </h6>
              </li>
              <li>
                <h6>
                  <i className="icon-user"></i>login
                </h6>
              </li>
              <li>
                <h6>
                  <i className="icon-user"></i>login
                </h6>
              </li>
            </ul> */}
            <div className="MobileNumbeNav">
              <span className="btn-normal bg-1">
                <i className="fa fa-phone" aria-hidden="true"></i>03099671141
              </span>
            </div>
          </div>
        )}
      </Drawer>
    </>
  );
}
