import React, { useEffect, useState } from "react";
import "../styles/SubCategory.css";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GET_ALL_BEST_SELLER_PRODUCTS } from "../constants/actionTypes";
import ProductList from "../components/ProductListing";
import LeftSubListing from "../components/SubCategory&Brand/CategoryListing";
import { Link } from "react-router-dom";
import { getBreadCrumbs } from "../util";
import { Helmet } from "react-helmet";
// import EidCampaignBottomBanner from "../components/Campaign/EidCampaignBottomBanner";
import Loader from "../components/Loader/compnentLoader";

export default function BestSellers() {
  const DiscountBanner =
    "https://storage.googleapis.com/aodour_v1/campaign/website/discount_banner.jpg";

  const dispatch = useDispatch();
  const [SubList, setSubList] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = new URLSearchParams(useLocation().search);
  const catSlug = query.get("category");
  const subcatSlug = query.get("subcategory");
  const subsubcatSlug = query.get("subsubcategory");

  const {
    allBestSellerProducts,
    menu: {
      category: { categories, subcategories, subsubcategories },
    },
  } = useSelector((state) => state);

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: GET_ALL_BEST_SELLER_PRODUCTS,
      callback: () => setLoading(false),
    });
  }, []);

  useEffect(() => {
    let CategoryList = [];
    const { products } = allBestSellerProducts;
    for (const { categoryID, categoryName, categorySlug } of products) {
      let indexof = CategoryList.findIndex((cate) => cate.id === categoryID);
      if (CategoryList.length < 1 || indexof === -1) {
        CategoryList.push({
          id: categoryID,
          name: categoryName,
          slug: categorySlug,
          count: 1,
          url: `/allbestsellers?category=${categorySlug}`,
          className: `${categorySlug === catSlug ? "selected" : ""}`,
          childrens: getAllChildresOfCategory(categoryID),
        });
      } else {
        CategoryList[indexof].count++;
      }
    }
    setSubList(CategoryList.sort((a, b) => b.count - a.count));
  }, [allBestSellerProducts, catSlug, subcatSlug, subsubcatSlug]);

  const getAllChildresOfCategory = (catID) => {
    let childrens = [];
    const { products } = allBestSellerProducts;
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
            url: `/allbestsellers?category=${categorySlug}&subcategory=${subCategorySlug}`,
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
    const { products } = allBestSellerProducts;
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
            url: `/allbestsellers?category=${categorySlug}&subcategory=${subCategorySlug}&subsubcategory=${subSubCategorySlug}`,
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
    if (subsubcatSlug) {
      return {
        ...allBestSellerProducts,
        products: allBestSellerProducts.products.filter(
          (product) => product.subSubCategorySlug === subsubcatSlug
        ),
      };
    } else if (subcatSlug) {
      return {
        ...allBestSellerProducts,
        products: allBestSellerProducts.products.filter(
          (product) => product.subCategorySlug === subcatSlug
        ),
      };
    } else if (catSlug) {
      return {
        ...allBestSellerProducts,
        products: allBestSellerProducts.products.filter(
          (product) => product.categorySlug === catSlug
        ),
      };
    }
    return allBestSellerProducts;
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
    return "BEST SELLER";
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
      <Helmet>
        <title>BestSellers</title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta
          name="description"
          content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery."
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
              "Best Sellers"
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
        MobileListing={{
          title: (
            <div className="listbutton_mobile">
              <span>all bestsellers</span>
              {getCategory() && <span>{getCategory().name}</span>}
              {getSubCategory() && <span>{getSubCategory().name}</span>}
              {getSubSubCategory() && <span>{getSubSubCategory().name}</span>}
            </div>
          ),
          sublist: SubList,
          modalTitle: { text: "Bestseller", url: `` },
        }}
      >
        <LeftSubListing Title={"Category"} List={SubList} />
      </ProductList>
       {/* <EidCampaignBottomBanner /> */}
    </>
  );
}
