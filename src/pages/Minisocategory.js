import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { useParams } from "react-router-dom";
import "../styles/Category.css";
import {
  GET_MINISO_CATEGORYPRODUCT,
  GET_MANISO_MENU,
} from "../constants/actionTypes";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import { filterProducts } from "../util";
import { Link, useHistory } from "react-router-dom";
import LeftSection from "../components/SubCategory&Brand/LeftSection";
import RightSection from "../components/SubCategory&Brand/RightSection";
import MinisoNav from "../components/head/MinisoNav";
import Loader from "../components/Loader/compnentLoader";
import LeftBar from "../components/Category/LeftBar";
import "../styles/miniso.css";

const transform = (node, index) => {
  if (node.type === "tag" && node.name === "pre") {
    node.name = "div";
    // console.log(node);
    return convertNodeToElement(node, index, transform);
  }
};

export default function Minisocategory() {
  const { slug, catSlug, subcatSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [range, setRange] = useState({ lower: 0, upper: 10000 });
  const [priceFilter, setPriceFilter] = useState({
    min: range.lower,
    max: range.upper,
  });
  const [viewLimit, setViewLimit] = useState(10);
  const [SelectCategory, setSelectCategory] = useState(undefined);
  const [sort, setSort] = useState("none");
  const [discount, SetDiscount] = useState(false);
  const [page, SetPage] = useState(0);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [appliedFeature, setAppliedFeature] = useState([]);
  const [features, setFeatures] = useState([]);

  //Mobile States//

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openCategoryList, setOpenCategoryList] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: GET_MINISO_CATEGORYPRODUCT,
      payload: slug,
      callback: () => setLoading(false),
    });
    // dispatch({ type: GET_MANISO_MENU });
  }, []);

  const { minisoCategoryPageProducts } = useSelector((state) => state);
  const { minisoMenu } = useSelector(({ minisoMenu }) => minisoMenu);
  const mainData =
    minisoMenu && minisoMenu.result && minisoMenu.result.category;

  const categories = mainData && mainData.categories;

  const subCategories = mainData && mainData.subcategories;

  const subsubCategories = mainData && mainData.subsubcategories;

  const category =
    minisoMenu && minisoMenu.result && minisoMenu.result.category;

  useEffect(() => {
    if (minisoCategoryPageProducts && minisoCategoryPageProducts.products) {
      setProducts(minisoCategoryPageProducts.products);
    }
  }, [minisoCategoryPageProducts]);

  const filter = () => {
    return filterProducts(
      products,
      priceFilter,
      page,
      isMobile ? 10000 : viewLimit,
      sort,
      appliedFeature,
      selectedBrands,
      discount
    );
  };

  useEffect(() => {
    if (category && category.categories) {
      for (let cate of category.categories) {
        if (cate.slug === slug) {
          setSelectCategory(cate);
          return;
        }
      }
    }
    setSelectCategory({});
  }, [slug, category]);

  return (
    <>
      {/* <MinisoNav
        minisoMenu={minisoMenu}
        categories={categories}
        subCategories={subCategories}
        subSubCategories={subsubCategories}
      /> */}
      <div className="content">
        <div className="inner-banner">
          <div className="container-fluid">
            <ul className="breadcrumbs">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/miniso">Miniso</Link>
              </li>
              <li>{SelectCategory ? SelectCategory.name : ""} </li>
            </ul>
          </div>
        </div>
        {/* <Loader loading={loading} /> */}
        <div className="rtl-content">
          <div className="container-fluid">
            <div className="row">
              {!isMobile && (
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  {category && (
                    <LeftBar
                      category={category}
                      selectedCategoryId={
                        SelectCategory ? SelectCategory.id : 0
                      }
                      SelectCategory={SelectCategory}
                      fromMiniso={true}
                    />
                  )}

                  {/* <LeftSection
                    range={range}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                    setAppliedFeature={setAppliedFeature}
                    appliedFeature={appliedFeature}
                    setPage={SetPage}
                    subcategoryFeatures={features}
                    // ApplyFeature={ApplyFeature}
                    allBrands={allBrands}
                    selectedBrands={selectedBrands}
                    // applyBrand={applyBrand}
                    // CategoryListing={children.length ? children[0] : children}
                  /> */}
                </div>
              )}
              <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <RightSection
                  sort={sort}
                  fromMiniso={true}
                  Data={filter()}
                  viewLimit={viewLimit}
                  setViewLimit={setViewLimit}
                  setSort={setSort}
                  SetDiscount={SetDiscount}
                  SetPage={SetPage}
                  page={page}
                  setOpenFilterModal={setOpenFilterModal}
                  // setOpenSortModal={setOpenSortModal}
                  // banner={banner}
                  // title={RightSectionTitle}
                  // description={description}
                  // cover={cover ? cover.cover : ""}
                  // coverTextColor={cover ? cover.color : ""}
                  // grid={children[1]}
                  // saleBanners={children[2]}
                  // Products={
                  //   minisoCategoryPageProducts &&
                  //   minisoCategoryPageProducts.Products
                  // }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
