import React, { useEffect, useState } from "react";
import "../styles/Category.css";
import LeftBar from "../components/Category/LeftBar";
import ContentSection from "../components/Category/ContentSection";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  GET_CATEGORY_PRODUCTS,
  EMPTY_CATEGORY_PRODUCTS,
} from "../constants/actionTypes";
import MobileLeftBarModal from "../components/Category/MobileLeftBarModal";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShowMoreText from "react-show-more-text";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
import EidCampaignBottomBanner from "../components/Campaign/EidCampaignBottomBanner";
import Loader from "../components/Loader/compnentLoader";

const transform = (node, index) => {
  if (node.type === "tag" && node.name === "pre") {
    node.name = "div";
    // console.log(node);
    return convertNodeToElement(node, index, transform);
  }
};

export default function Category() {
  const DiscountBanner =
    "https://storage.googleapis.com/aodour_v1/campaign/discount_banner.jpg";

  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [SelectCategory, setSelectCategory] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const {
    categoryPageProducts,
    menu: { category },
  } = useSelector((state) => state);

  const history = useHistory();

  const { slug } = useParams();

  useEffect(() => {
    if (categoryPageProducts.category.length < 1) {
      dispatch({ type: EMPTY_CATEGORY_PRODUCTS });
      history.push("/404");
    }
  }, [categoryPageProducts]);

  useEffect(() => {
    setLoading(true);

    dispatch({
      type: GET_CATEGORY_PRODUCTS,
      slug,
      callback: () => setLoading(false),
    });
    return () => {
      dispatch({ type: EMPTY_CATEGORY_PRODUCTS });
    };
  }, [slug]);

  useEffect(() => {
    // console.log("categor", category.categories);
    for (let cate of category.categories) {
      if (cate.slug === slug) {
        setSelectCategory(cate);
        return;
      }
    }
    setSelectCategory({});
  }, [slug, category]);
  return (
    <>
      <Helmet>
        <title>
          {categoryPageProducts.category.length > 0 &&
          categoryPageProducts.category[0].meta_title !== null &&
          categoryPageProducts.category[0].meta_title !== ""
            ? `${categoryPageProducts.category[0].meta_title}`
            : "Online Cosmetics Shopping in Pakistan"}
        </title>
        <meta
          name="description"
          content={
            categoryPageProducts.category.length > 0
              ? categoryPageProducts.category[0].meta_description
              : ""
          }
        />
        <meta
          name="keywords"
          content={
            categoryPageProducts.category.length > 0
              ? categoryPageProducts.category[0].meta_keywords
              : ""
          }
        />
      </Helmet>
      <Loader loading={loading} />

      <div className="wapper">
        <div
          className="menu_button"
          onClick={() => setIsOpen((state) => !state)}
        >
          <span className="filter_btn">
            {SelectCategory && SelectCategory.name}
            <i className="fa fa-angle-down"></i>
          </span>
        </div>

        <div className="content">
          <div className="inner-banner">
            <div className="container-fluid">
              <ul className="breadcrumbs">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/">Category</Link>
                </li>
                <li>{SelectCategory ? SelectCategory.name : ""} </li>
              </ul>
            </div>
          </div>
          <div className="category-page">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12 mobile-hide">
                  <LeftBar
                    category={category}
                    selectedCategoryId={SelectCategory ? SelectCategory.id : 0}
                    SelectCategory={SelectCategory}
                  />
                </div>
                <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                  <div className="content_area">
                    <div className="add_section">
                      {categoryPageProducts.category.length > 0 &&
                        categoryPageProducts.category[0].image !== null && (
                          <div
                            className="picture_section"
                            style={{
                              backgroundImage: `url(${categoryPageProducts.category[0].image})`,
                            }}
                          >
                            {/* <figure>
                          <img src={banner.image} alt={banner.title} /> */}
                            <div className="brand_content">
                              <h1
                                style={{
                                  color: `#${categoryPageProducts.category[0].story_text_color}`,
                                }}
                              >
                                {categoryPageProducts.category[0].name}>
                              </h1>
                              <p
                                style={{
                                  color: `#${categoryPageProducts.category[0].story_text_color}`,
                                }}
                              >
                                {categoryPageProducts.category[0].story_cover}
                              </p>
                            </div>
                            {/* </figure> */}
                          </div>
                        )}
                    </div>
                    {categoryPageProducts.product.length > 0 &&
                      categoryPageProducts.product.map((item) => (
                        <ContentSection
                          Products={item.products}
                          Title={item.title}
                          Description={item.desc}
                        />
                      ))}
                  </div>
                  <div className="category_caption">
                    <ShowMoreText
                      /* Default options */
                      lines={2}
                      more="Show more"
                      less="Show less"
                      expanded={false}
                      anchorclassName="text-primary-color"
                    >
                      {ReactHtmlParser(
                        categoryPageProducts.category[0]
                          ? categoryPageProducts.category[0].story_text
                          : "",
                        { transform }
                      )}
                    </ShowMoreText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileLeftBarModal
        category={category}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        id={SelectCategory ? SelectCategory.id : 0}
        SelectCategory={SelectCategory}
      />

      {/* <EidCampaignBottomBanner /> */}
    </>
  );
}
