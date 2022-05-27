import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "../styles/SubCategory.css";
import { Helmet } from "react-helmet";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../components/ProductListing";
import LeftSubListing from "../components/SubCategory&Brand/CategoryListing";
import { getBreadCrumbs } from "../util";
import VariationGrid from "../components/VariationGrid";
import { GET_SEARCH_LISTING_PRODUCTS } from "../constants/actionTypes";
import Loader from "../components/Loader/compnentLoader";

import { Link } from "react-router-dom";
import EidCampaignBottomBanner from "../components/Campaign/EidCampaignBottomBanner";

export default function Category() {
  const [loading, setLoading] = useState(false);
  const [SubList, setSubList] = useState([]);
  const query = new URLSearchParams(useLocation().search);
  const catSlug = query.get("category");
  const subcatSlug = query.get("subcategory");
  const subsubcatSlug = query.get("subsubcategory");
  const { keyword } = useParams();
  const {
    Products = [],
    menu: {
      category: { categories, subcategories, subsubcategories },
    },
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    dispatch({
      type: GET_SEARCH_LISTING_PRODUCTS,
      payload: keyword,
      callback: () => setLoading(false),
    });
  }, [keyword]);

  useEffect(() => {
    let CategoryList = [];
    for (const { categoryID, categoryName, categorySlug } of Products) {
      let indexof = CategoryList.findIndex((cate) => cate.id === categoryID);
      if (CategoryList.length < 1 || indexof === -1) {
        CategoryList.push({
          id: categoryID,
          name: categoryName,
          slug: categorySlug,
          count: 1,
          url: `?category=${categorySlug}`,
          className: `${categorySlug === catSlug ? "selected" : ""}`,
          childrens: getAllChildresOfCategory(categoryID),
        });
      } else {
        CategoryList[indexof].count++;
      }
    }

    setSubList(CategoryList.sort((a, b) => b.count - a.count));
  }, [Products, catSlug, subcatSlug, subsubcatSlug]);

  const getAllChildresOfCategory = (catID) => {
    let childrens = [];
    for (let {
      categoryID,
      categorySlug,
      subCategoryID,
      subCategoryName,
      subCategorySlug,
    } of Products) {
      let indexof = childrens.findIndex((cate) => cate.id === subCategoryID);
      if (catID === categoryID) {
        if (childrens.length < 1 || indexof === -1) {
          childrens.push({
            id: subCategoryID,
            name: subCategoryName,
            slug: subCategorySlug,
            count: 1,
            url: `?category=${categorySlug}&subcategory=${subCategorySlug}`,
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
    for (let {
      categoryID,
      categorySlug,
      subCategorySlug,
      subCategoryID,
      subSubCategoryID,
      subSubCategoryName,
      subSubCategorySlug,
    } of Products) {
      let indexof = childrens.findIndex((cate) => cate.id === subSubCategoryID);
      if (catID === categoryID && subcatID === subCategoryID) {
        if (childrens.length < 1 || indexof === -1) {
          childrens.push({
            id: subSubCategoryID,
            name: subSubCategoryName,
            slug: subSubCategorySlug,
            count: 1,
            url: `?category=${categorySlug}&subcategory=${subCategorySlug}&subsubcategory=${subSubCategorySlug}`,
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
    let products = Products.map((saleProduct) => {
      return { ...saleProduct, variations: [saleProduct.variations] };
    });

    if (subsubcatSlug) {
      products = products.filter(
        (product) => product.subSubCategorySlug === subsubcatSlug
      );
    } else if (subcatSlug) {
      products = products.filter(
        (product) => product.subCategorySlug === subcatSlug
      );
    } else if (catSlug) {
      products = products.filter((product) => product.categorySlug === catSlug);
    }
    return products;
  };

  const getTitle = () => {
    // const selected = catSlug
    //   ? categories.find(({ slug }) => slug === catSlug)
    //   : null;
    let selected;
    if (subsubcatSlug) {
      selected = getSubSubCategory();
    } else if (subcatSlug) {
      selected = getSubCategory();
    } else if (catSlug) {
      selected = getCategory();
    }
    if (selected) return selected.name;
    return "Search";
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

  return (
    <>
      <Loader loading={loading} />

      <Helmet>
        <title>
          {"Search Result"}
        </title>
        <meta name="description" content="" />
        <meta name="keywords" content="" />
      </Helmet>
      <div className="inner-banner">
        <div className="container-fluid">
          <ul className="breadcrumbs">
            {getBreadCrumbs(
              getCategory(),
              getSubCategory(),
              getSubSubCategory(),
              "Search"
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
        productData={{ products: filter() }}
        RightSectionTitle={getTitle()}
        MobileListing={{
          title: (
            <div className="listbutton_mobile">
              <span>all products</span>
              {getCategory() && <span>{getCategory().name}</span>}
              {getSubCategory() && <span>{getSubCategory().name}</span>}
              {getSubSubCategory() && <span>{getSubSubCategory().name}</span>}
            </div>
          ),
          sublist: SubList,
          modalTitle: { text: "All Products", url: `` },
        }}
      >
        <LeftSubListing Title={"Category"} List={SubList} />
        <VariationGrid />
      </ProductList>

      {/* <EidCampaignBottomBanner /> */}
    </>
  );
}
