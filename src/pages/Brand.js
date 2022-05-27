import React, { useEffect, useState } from "react";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import { getBreadCrumbs } from "../util";

import {
  GET_BRAND_PAGE_PRODUCTS,
  BRAND_PAGE_EMPTY,
} from "../constants/actionTypes";

import ProductList from "../components/ProductListing";
import LeftSubListing from "../components/SubCategory&Brand/CategoryListing";
import { Link } from "react-router-dom";
import "../styles/SubCategory.css";
import EidCampaignBottomBanner from "../components/Campaign/EidCampaignBottomBanner";
import Loader from "../components/Loader/compnentLoader";

export default function Category(props) {
  const DiscountBanner =
    "https://storage.googleapis.com/aodour_v1/campaign/website/discount_banner.jpg";

  const { slug } = useParams();

  const history = useHistory();

  const query = new URLSearchParams(useLocation().search);

  const catSlug = query.get("category");
  const subcatSlug = query.get("subcategory");
  const subsubcatSlug = query.get("subsubcategory");

  const [SubList, setSubList] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {
    brandPageProducts,
    menu: {
      category: { categories, subcategories, subsubcategories },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: GET_BRAND_PAGE_PRODUCTS,
      payload: slug,
      callback: () => setLoading(false),
    });
    return () => {
      dispatch({ type: BRAND_PAGE_EMPTY });
    };
  }, [slug]);

  useEffect(() => {
    if (brandPageProducts.brand.length < 1) {
      dispatch({ type: BRAND_PAGE_EMPTY });
      history.push("/404");
      return;
    }
    let CategoryList = [];
    const { products } = brandPageProducts;
    for (const { categoryID, categoryName, categorySlug } of products) {
      let indexof = CategoryList.findIndex((cate) => cate.id === categoryID);
      if (CategoryList.length < 1 || indexof === -1) {
        CategoryList.push({
          id: categoryID,
          name: categoryName,
          slug: categorySlug,
          count: 1,
          url: `/brand/${slug}?category=${categorySlug}`,
          className: `${categorySlug === catSlug ? "selected" : ""}`,
          childrens: getAllChildresOfCategory(categoryID),
        });
      } else {
        CategoryList[indexof].count++;
      }
    }

    setSubList(CategoryList.sort((a, b) => b.count - a.count));
    // console.log(CategoryList);
  }, [brandPageProducts, catSlug, subcatSlug, subsubcatSlug]);

  const getAllChildresOfCategory = (catID) => {
    let childrens = [];
    const { products } = brandPageProducts;
    for (let {
      categoryID,
      categorySlug,
      subCategoryID,
      subCategoryName,
      subCategorySlug,
    } of products) {
      let indexof = childrens.findIndex((cate) => cate.id === subCategoryID);
      if (catID === categoryID) {
        if (childrens.length < 1 || indexof === -1) {
          childrens.push({
            id: subCategoryID,
            name: subCategoryName,
            slug: subCategorySlug,
            count: 1,
            url: `/brand/${slug}?category=${categorySlug}&subcategory=${subCategorySlug}`,
            className: `${subCategorySlug === subcatSlug ? "selected" : ""}`,
            childrens: getAllChildresOfSubCategory(catID, subCategoryID),
          });
        } else {
          childrens[indexof].count++;
        }
      }
    }
    return childrens.sort((a, b) => b.count - a.count);
  };

  const getAllChildresOfSubCategory = (catID, subcatID) => {
    let childrens = [];
    const { products } = brandPageProducts;
    for (let {
      categoryID,
      categorySlug,
      subCategorySlug,
      subCategoryID,
      subSubCategoryID,
      subSubCategoryName,
      subSubCategorySlug,
    } of products) {
      let indexof = childrens.findIndex((cate) => cate.id === subSubCategoryID);
      if (catID === categoryID && subcatID === subCategoryID) {
        if (childrens.length < 1 || indexof === -1) {
          childrens.push({
            id: subSubCategoryID,
            name: subSubCategoryName,
            slug: subSubCategorySlug,
            count: 1,
            url: `/brand/${slug}?category=${categorySlug}&subcategory=${subCategorySlug}&subsubcategory=${subSubCategorySlug}`,
            className: `${
              subSubCategorySlug === subsubcatSlug ? "selected" : ""
            }`,
          });
        } else {
          childrens[indexof].count++;
        }
      }
    }
    return childrens.sort((a, b) => b.count - a.count);
  };

  const filter = () => {
    let products = brandPageProducts.products;
    if (subsubcatSlug) {
      products = products.filter(
        (product) => product.subSubCategorySlug === subsubcatSlug
      );
    } else if (subcatSlug) {
      products = products.filter(
        (product) => product.subCategorySlug === subcatSlug
      );
    } else if (catSlug) {
      products = brandPageProducts.products.filter(
        (product) => product.categorySlug === catSlug
      );
    }
    return {
      products,
      banner: {
        image: brandPageProducts.brand[0].image,
        title: brandPageProducts.brand[0].name,
      },
      description: brandPageProducts.brand[0].storyText,
      cover: {
        cover: brandPageProducts.brand[0].StoryCover,
        color: brandPageProducts.brand[0].storyTextColor,
      },
    };
  };

  const getTitle = () => {
    // const selected =
    //   catSlug && catSlug !== ""
    //     ? categories.find(({ slug }) => slug === catSlug)
    //     : undefined;
    let selected;
    if (subsubcatSlug) {
      selected = getSubSubCategory();
    } else if (subcatSlug) {
      selected = getSubCategory();
    } else if (catSlug) {
      selected = getCategory();
    }

    if (selected) return selected.name;
    return brandPageProducts.brand[0].name;
  };

  const getCategory = () => {
    return categories.find(({ slug }) => slug === catSlug);
  };

  const getSubSubCategory = () => {
    return subsubcategories.find(({ slug }) => slug === subsubcatSlug);
  };

  const getSubCategory = () => {
    return subcategories.find(({ slug }) => slug === subcatSlug);
  };


  // console.log(SubList,'SubList SubList12');

  return (
    <>
      {brandPageProducts.brand.length > 0 && (
        <>
          <Helmet>
            <title>
              {brandPageProducts.brand.length > 0 &&
              brandPageProducts.brand[0].metaTitle !== null &&
              brandPageProducts.brand[0].metaTitle !== ""
                ? `${brandPageProducts.brand[0].metaTitle}`
                : "Online Cosmetics Shopping in Pakistan"}
            </title>
            <meta
              name="description"
              content={
                brandPageProducts.brand.length > 0
                  ? brandPageProducts.brand[0].metaDescription
                  : ""
              }
            />
            <meta
              name="keywords"
              content={
                brandPageProducts.brand.length > 0
                  ? brandPageProducts.brand[0].metaKeywords
                  : ""
              }
            />
          </Helmet>
          <Loader loading={loading} />
          <div className="inner-banner">
            <div className="container-fluid">
              <ul className="breadcrumbs">
                {getBreadCrumbs(
                  getCategory(),
                  getSubCategory(),
                  getSubSubCategory(),
                  "Brands",
                  brandPageProducts.brand[0].name
                ).map(({ name, url }) => {
                  if (url && url !== "") {
                    return (
                      <li>
                        <Link to={url}>{name}</Link>
                      </li>
                    );
                  } else {
                    return <li>{name}</li>;
                  }
                })}
              </ul>
            </div>
          </div>
          <ProductList
            productData={filter()}
            RightSectionTitle={getTitle()}
            topTitle={"Category"}
            MobileListing={{
              title: (
                <div className="listbutton_mobile">
                  <span>Explore Brands</span>
                  {getCategory() && <span>{getCategory().name}</span>}
                  {getSubCategory() && <span>{getSubCategory().name}</span>}
                  {getSubSubCategory() && (
                    <span>{getSubSubCategory().name}</span>
                  )}
                </div>
              ),
              sublist: SubList,
              modalTitle: { text: "Brands", url: `` },
            }}
          >
            <LeftSubListing Title={"Category"} List={SubList} />
          </ProductList>
        </>
      )}

      {/* <EidCampaignBottomBanner /> */}
    </>
  );
}
