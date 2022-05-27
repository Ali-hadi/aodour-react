import React, { useState } from "react";
import ProductCardNormal from "./Product/ProductCard";
import { Link } from "react-router-dom";
import ProductDetailModal from "./Product/ProductDetailModal";
import moment from "moment";
const Tag3 = "https://storage.googleapis.com/aodour_v1/campaign_images/Buy1get1.png";
export default function ProductGrid({ Products ,fromMiniso}) {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedVariationSlug, setSelectedVariationSlug] = useState("");

  const openModal = (product, slug) => {
    setSelectedProduct(product);
    setSelectedVariationSlug(slug);
    setIsProductModalOpen(true);
  };

  const closeModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct({});
  };

  const getPriceElement = (v1, v2) => {
    let actualmin = Math.round(v1.price);
    let actualmax = Math.round(v2.price);

    let discountmin =
      v1.discountPercentage > 0 &&
      moment().isSameOrAfter(v1.discountStartTime) &&
      moment().isSameOrBefore(v1.discountEndTime)
        ? Math.floor(v1.discountPrice)
        : 0;
    let discountmax =
      v2.discountPercentage > 0 &&
      moment().isSameOrAfter(v2.discountStartTime) &&
      moment().isSameOrBefore(v2.discountEndTime)
        ? Math.round(v2.discountPrice)
        : 0;

    return actualmin === actualmax ? (
      <span>
        {actualmin - discountmin}&nbsp;
        {discountmin > 0 && <del> {actualmin}</del>}
      </span>
    ) : (
      <span>
        <span>
          {actualmin - discountmin}&nbsp;
          {discountmin > 0 && <del> {actualmin}</del>}
        </span>
        <span>
          &nbsp;<strong>--</strong>&nbsp;
        </span>
        <span>
          {discountmax > 0 && <del> {actualmax}</del>}&nbsp;
          {actualmax - discountmax}
        </span>
      </span>
    );
  };
  const getPriceRange = (product) => {
    if (product.variations.length > 0) {
      let minvariation = product.variations[0];
      let maxvariation = product.variations[0];
      for (const variation of product.variations) {
        if (variation.price < minvariation.price) {
          minvariation = variation;
        }
        if (variation.price > maxvariation.price) {
          maxvariation = variation;
        }
      }

      return getPriceElement(minvariation, maxvariation);
    }
    return "";
  };

  return (
    <>
      <div className="row">
        {Products.length > 0 &&
          Products.map((item, index) => {
            // const images = JSON.parse(item.images);
            return (
              <div key={index} className="col-md-3 col-sm-6 col-xs-6">
                <ProductCardNormal
                fromMiniso={fromMiniso}
                  key={item.id}
                  title={item.name}
                  price={getPriceRange(item)}
                  openModal={openModal}
                  product={item}
                />
              </div>
            );
          })}
      </div>
      <ProductDetailModal
        selectedProduct={selectedProduct}
        varSlug={selectedVariationSlug}
        isOpen={isProductModalOpen}
        closeModal={closeModal}
      />
    </>
  );
}
