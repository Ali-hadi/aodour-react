import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import ProductContent from "./ProductContent";
import SideProducts from "./SideProducts";
import {
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_SIMILAR_PRODUCTS,
} from "../../constants/actionTypes";
import DetailSection from "./DetailSection";

const TopSection = ({
  selectedProduct,
  setSelectedProduct,
  productDetailPage,
  varSlug,
}) => {
  const { similarProducts } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_PRODUCT_DETAIL_SIMILAR_PRODUCTS, varSlug });
  }, [varSlug]);

  return (
    <section className="reponsive_padding">
      <div className="container-fluid custom-padding">
        <div className="row">
          <DetailSection
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
            varSlug={varSlug}
          />
          <div className="col-lg-1 col-md-1 col-sm-12 col-xs-12">
            <SideProducts products={similarProducts} />
          </div>
          {/* <>
                  <BundleOffer />
                </> */}
        </div>
        <div className="border-line"></div>
      </div>
    </section>
  );
};

export default TopSection;
