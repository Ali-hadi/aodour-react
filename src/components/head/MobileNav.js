import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";

import MobileCategoryList from "./MobileCategoryList";
import BrandListMobileNav from "./MobileBrandList";
import MobileAtoZListing from "./MobileAtoZListing";
import { Link, useHistory } from "react-router-dom";
import { isAndroid } from "react-device-detect";

const CategoryListMobileNav = ({ categories, showSubCate, setshowSubCate,isMiniso }) => {
  const [selectCategory, setSelectedCategory] = useState(null);
  const history = useHistory();
  const cats =
    categories && categories.categories ? categories.categories : categories;

  return (
    <>
      {!showSubCate && (
        <>
          {cats.map((item) => {
            return (
              <li
                key={item.id}
                onClick={() => {
                  setSelectedCategory(item);
                  setshowSubCate(true);
                }}
              >
                {item.name || item.main_category}

                <span className="icon-right" aria-hidden="true"></span>
              </li>
            );
          })}
        </>
      )}

      <SubSubCategoryCategoryListMobileNav
        selectCategory={selectCategory}
        categories={categories}
        Show={showSubCate}
        setShow={setshowSubCate}
      />
    </>
  );
};

const SubSubCategoryCategoryListMobileNav = ({
  selectCategory,
  categories,
  Show,
  setShow,
}) => {
  const relativeSubSubCategory = (SubSubCategory, SubCategory) => {
    return SubSubCategory.filter((item) =>
      item.category_id === SubCategory ? true : false
    );
  };
  const history = useHistory();
  // console.log("history", history);
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
            categories.subcategories &&
            categories.subcategories.map((item, index) => {
              if (item.category_id === selectCategory.id) {
                return (
                  <div>
                    <MobileCategoryList
                      Name={item.name}
                      SubSubCategory={relativeSubSubCategory(
                        categories.subsubcategories,
                        item.id
                      )}
                      subCategory={item}
                      categories={categories.categories}
                      key={index}
                    />
                  </div>
                );
              }
              return null;
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
        width="70vw"
        handler={false}
        open={isOpen}
        onClose={() => onClose(false)}
        className="drawer1"
        placement="left"
        level={null}
      >
        <CSSTransition in={!showBrands} timeout={300} classNames="slide">
          <div>
            {!showBrands && (
              <ul className="side_list_menu">
                <li onClick={() => setshowBrands(true)}>
                  Brands
                  <span className="icon-right" aria-hidden="true"></span>
                </li>
                <CategoryListMobileNav
                  categories={categories}
                  showSubCate={showSubCate}
                  setshowSubCate={setshowSubCate}
                  isMiniso={isMiniso}
                />
                {!showSubCate && (
                  <>
                    {/* <li>
                      <Link to="/New-Year-Bling">New Year Bling</Link>
                    </li> */}
                    {/* <li>
                      <Link to="/fridayfrenzy">Friday Frenzy</Link>
                    </li> */}
                    {/* <li>
                      <Link to="/pakistanday">Pakistan Day</Link>
                    </li> */}
                    <li>
                      <Link to="/flash-sale">flash sale</Link>
                    </li>
                    <li>
                      <Link to="/professional-hair">professional hair</Link>
                    </li>
                    <li>
                      <Link to="/miniso">Miniso</Link>
                    </li>
                    {/* <li>
                      <Link to="/womenday">Womenday Spacial</Link>
                    </li> */}
                    <li>
                      <Link to="/Shop/new_arrival">New Arrivals</Link>
                    </li>
                    <li>
                      <Link to="/allbestsellers">Best Sellers</Link>
                    </li>
                    <li>
                      <Link to="/track-order">Track Order</Link>
                    </li>
                    <li>
                      <Link to="/track-complaint">Track Complaint</Link>
                    </li>
                    {/* <li>
                      <Link to="/commingsoon" >
                        beauty Blogs
                      </Link>
                    </li> */}
                  </>
                )}
              </ul>
            )}
          </div>
        </CSSTransition>

        <BrandList
          popular_brands={popular_brands}
          new_brands={new_brands}
          Show={showBrands}
          setShow={setshowBrands}
          all_brands={all_brands}
        />
        {!showSubCate && !showBrands && (
          <div className="fix_bottom">
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
