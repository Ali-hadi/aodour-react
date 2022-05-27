import React, { Suspense, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/head/Header";
import SubCategories from "../pages/MinisoSubcategory";
import Footer from "../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { GET_MENU, GET_USER_PROFILE } from "../constants/actionTypes";
import Loader from "../components/Loader/compnentLoader";
import { isUserLoggedIn, getUserToken } from "../util";

function Layout(props) {
  const dispatch = useDispatch();
  const { minisoMenu } = useSelector(({ minisoMenu }) => minisoMenu);

  const mainData =
    minisoMenu && minisoMenu.result && minisoMenu.result.category;

  const categories = mainData && mainData.categories;

  const subCategories = mainData && mainData.subcategories;

  const subsubCategories = mainData && mainData.subsubcategories;

  const {
    menu: { brands, category },
    error,
  } = useSelector((state) => state);
  useEffect(() => {
    dispatch({ type: GET_MENU });
    if (isUserLoggedIn()) {
      dispatch({ type: GET_USER_PROFILE, userId: getUserToken() });
    }
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const children = props.children || null;
  return (
    <>
      {/* <Loader /> */}
      <>
        {category.categories &&
          category.categories.length &&
          category.categories.length > 0 && (
            <Header
              minisoMenu={minisoMenu}
              categories={categories}
              subCategories={subCategories}
              subSubCategories={subsubCategories}
            />
          )}
        <div style={{ minHeight: "100vh" }}>
          <Suspense fallback={<Loader loading={true} />}>{children}</Suspense>
        </div>
        <Footer />
      </>
      <SubCategories minisoMenu={minisoMenu} />
    </>
  );
}

export default Layout;
