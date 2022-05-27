import React, { useState } from "react";
import ProductCardNormal from "./Product/ProductCard";
import ReactOwlCarousel from 'react-owl-carousel';
import ProductDetailModal from "./Product/ProductDetailModal";
import moment from "moment";


const defaultResponsive = {
  0: {
    items: 2
  },
  600: {
    items: 2
  },
  1000: {
    items: 4
  }
};
export default function ProductGrid({ Products }) {
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

  // console.log(Products, 'Products Products Products');
  
  return (
    <>
      <div className=" responsive_class">
        {Products.length > 0 && (
          <ReactOwlCarousel
            lazyLoad={true}
            loop
            nav
            margin={10}
            responsive={defaultResponsive}
          >
            {Products.map((item, index) => {
              // console.log(item, 'item 0987');
              
              // const images = JSON.parse(item.images);
              return (
                <div key={index}>
                  <ProductCardNormal
                    key={item.id}
                    title={item.name}
                    price={item.variations&&item.variations.length>0&&item.variations[0].price}
                    openModal={openModal}
                    product={item}
                    
                  />
                </div>
              );
            })}
          </ReactOwlCarousel>
        )}
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
