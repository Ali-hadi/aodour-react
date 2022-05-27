import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  GET_MINISO_SUBCATEGORY,
  MINISO_SUBCATEGORY_PAGE_EMPTY,
  GET_MANISO_MENU,
} from "../constants/actionTypes";
import { Helmet } from "react-helmet";
import Loader from "../components/Loader/compnentLoader";
import { Link } from "react-router-dom";
import MinisoNav from "../components/head/MinisoNav";
import EidCampaignBottomBanner from "../components/Campaign/EidCampaignBottomBanner";
import { getBreadCrumbs } from "../util";

import "../styles/miniso.css";
import ProductList from "../components/ProductListing";
import LeftSubListing from "../components/SubCategory&Brand/CategoryListing";

const SelectedCategories = (
  mainCategories,
  categories,
  subsubcategories,
  subSlug,
  subSubSlug
) => {

  const subcategory = categories&& categories.find(({ slug }) => slug === subSlug);
  const subsubcategory = subsubcategories && subsubcategories.find(
    ({ slug }) => slug === subSubSlug
  );
  
  let category = {}
  if (subcategory)
    category = mainCategories.find(({ id }) => id === subcategory.category_id);
  return { subcategory, subsubcategory,category };
};

export default function Minisosubcategory() {
  // const { slug } = useParams();
  const { catSlug, subSubSlug, subSlug, slug } = useParams();

  const [subCatSlug, setSubCatSlug] = useState();
  const [mobileSublist, setMobileSubList] = useState([]);
  const [SubList, setSubList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCat, setSelectedCat] = useState({});
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  const {
    MinisoSubCategoryPageProducts,
    // menu: {
    //   category: { categories, subcategories, subsubcategories },
    // }
  } = useSelector((state) => state);

  
  const { minisoMenu } = useSelector(({ minisoMenu }) => minisoMenu);
  const mainData =
    minisoMenu && minisoMenu.result && minisoMenu.result.category;

  const categories = mainData && mainData.categories ? mainData.categories : [];
  const subcategories = mainData && mainData.subcategories ? mainData.subcategories : [];
  const subsubcategories = mainData && mainData.subsubcategories ? mainData.subsubcategories : [];

  const history = useHistory();

  useEffect(() => {
    // dispatch({ type: GET_MANISO_MENU });
    if (subSlug && subSlug !== "") {
      setLoading(true);
      // dispatch({
      //   type: GET_MINISO_SUBCATEGORY,
      //   payload: subSlug,
      //   callback: () => {
      //     setLoading(false);
      //   },
      // });
    }
    return () => {
      dispatch({ type: MINISO_SUBCATEGORY_PAGE_EMPTY });
    };
  }, [subCatSlug]);

  useEffect(() => {
    if (subSlug) {
      setSubCatSlug(subSlug);
    }
  }, []);

  // useEffect(() => {
  //   if (
  //     categories.length > 0 &&
  //     subcategories.length > 0 &&
  //     subsubcategories.length > 0
  //   ) {
  //     if (slug) {
  //       for (const subSubCat of subsubcategories) {
  //         if (subSlug.slug === subSubSlug) {
  //           setSelectedCat(subSlug);
  //           for (const subCat of subcategories) {
  //             if (subCat.id === subSubCat.category_id) {
  //               setSubCatSlug(subCat.slug);
  //               return;
  //             }
  //           }
  //         }
  //       }
  //       // dispatch({ type: MINISO_SUBCATEGORY_PAGE_EMPTY });
  //       // history.push("/404");
  //       return;
  //     } else {
  //       for (const subCategory of subcategories) {
  //         if (subCategory.slug === subSlug) {
  //           setSelectedCat(subCategory);
  //         }
  //       }
  //     }
  //   }
  // }, [categories, subcategories, subsubcategories]);

  useEffect(() => {
    let CategoryList = [];
    const { products, subcategory } = MinisoSubCategoryPageProducts;
    // console.log(MinisoSubCategoryPageProducts,"products", products);

    if (subcategory.length < 1) {
      dispatch({ type: MINISO_SUBCATEGORY_PAGE_EMPTY });
      history.push("/404");
      return;
    }

    for (const {
      subSubCategoryID,
      subSubCategoryName,
      subSubCategorySlug,
    } of products) {
      let indexof = CategoryList.findIndex(
        (cate) => cate.id === subSubCategoryID
      );
      if (CategoryList.length < 1 || indexof === -1) {
        CategoryList.push({
          id: subSubCategoryID,
          name: subSubCategoryName,
          slug: subSubCategorySlug,
          count: 1,
          url: `/miniso/${slug}/${subSubCategorySlug}`,
          className: `${subSubCategorySlug === subSubSlug ? "selected" : ""}`,
        });
      } else {
        CategoryList[indexof].count++;
      }
    }

    const subcategoriesList = subcategories.filter((subcate) => {
      return subcate.category_id === subcategory[0].categoryID;
    });


    const mobilelist = subcategoriesList.map((item) => {
      return {
        top: item.slug === subcategory[0].slug,
        id: item.id,
        name: item.name,
        slug: item.slug,
        url: `/subcategory/${item.slug}`,
        className: `sub_categories ${
          item.slug === subcategory[0].slug ? "selected" : ""
        }`,
        childrens:
          item.slug === subcategory[0].slug
            ? CategoryList
            : otherCategories(item),
      };
    });
    // setSubList(CategoryList.sort((a, b) => b.count - a.count));
    setMobileSubList(mobilelist.sort((a, b) => b.top - a.top));
  }, [MinisoSubCategoryPageProducts, minisoMenu, slug, subSlug, subSubSlug]);

  const otherCategories = (cat) => {
    const list = [];

    subsubcategories.map((item) => {
      if (item.category_id === cat.id)
        list.push({
          id: item.id,
          name: item.name,
          slug: item.slug,
          count: 1,
          url: `/miniso/${cat.slug}/${item.slug}`,
          className: `${item.slug === subSubSlug ? "selected" : ""}`,
        });
    });
    return list;
  };

  useEffect(() => {
    if (
      MinisoSubCategoryPageProducts &&
      MinisoSubCategoryPageProducts.products
    ) {
      setProducts(MinisoSubCategoryPageProducts.products);
      // setSubList(MinisoSubCategoryPageProducts.subcategory ? MinisoSubCategoryPageProducts.subcategory : [])
    }
  }, [MinisoSubCategoryPageProducts]);

  const filter = () => {
    let pr = products;
    if (subSlug) {
      pr = products.filter(
        (product) => product.subSubCategorySlug === subSlug
      );
    }

    return {
      products: pr,
      banner: { title: selectedCat.name, image: selectedCat.image },
      description: selectedCat.story_text,
      cover: {
        cover: selectedCat.story_cover,
        color: selectedCat.story_text_color,
      },
    };
  };

  const getTitle = () => {
    const selected = subcategories.find(({ slug }) => slug === subSlug);
    if (selected) return selected.name;
    return "";
  };

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: GET_MINISO_SUBCATEGORY,
      payload: slug,
      callback: () => {
          setLoading(false);
        },
    });
  }, [slug, subSlug]);

  const { subsubcategory, subcategory, category } = SelectedCategories(
    categories,
    subcategories,
    subsubcategories,
    slug,
    subSlug
    );

  if (MinisoSubCategoryPageProducts.subcategory.length > 0) {
    return (
      <>
        <Loader loading={loading} />
        {/* <MinisoNav
          minisoMenu={minisoMenu}
          categories={categories}
          subcategories={subcategories}
          subSubcategories={subsubcategories}
        /> */}
        <Helmet>
          <title>
            {SubList && SubList.length > 0 ? SubList[0].metaTitle
              : "Online Cosmetics Shopping in Pakistan"}
          </title>
          <meta name="description" content={selectedCat.meta_description} />
          <meta name="keywords" content={selectedCat.meta_keywords} />
        </Helmet>

        <div className="inner-banner">
          <div className="container-fluid">
            {categories && subcategories && (
              <ul className="breadcrumbs">
                {getBreadCrumbs(category,subcategory, subsubcategory, "miniso").map(
                  ({ name, url }) => {
                    if (url && url !== "") {
                      return (
                        <li>
                          <Link to={url}>{name}</Link>
                        </li>
                      );
                    } else {
                      return <li>{name}</li>;
                    }
                  }
                )}
              </ul>
            )}
          </div>
        </div>
        <ProductList
          productData={filter()}
          fromMiniso={true}
          MobileListing={{
            title: subsubcategory
              ? subsubcategory.name
              : subcategory
              ? subcategory.name
              : category
              ? category.name
              : "",
            sublist: mobileSublist,
            modalTitle: {
              text: category?.name,
              url: `/miniso/${category?.slug}`,
            },
          }}
          RightSectionTitle={getTitle()}
        >
          <LeftSubListing
            Title={subcategories ? subcategories.name : ""}
            List={SubList}
          />
        </ProductList>
        {/* <EidCampaignBottomBanner /> */}
      </>
    );
  } else {
    return <></>;
  }
}
