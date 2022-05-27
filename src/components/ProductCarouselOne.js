import React, { useState } from "react";
import ReactOwlCarousel from "react-owl-carousel";
import PropTypes from "prop-types";
import ProductCardNormal from "./Product/ProductCardNormal";
import ProductDetailModal from "./Product/ProductDetailModal";
import AddToCartModal from "./AddToCartModel";
import moment from "moment"
const defaultResponsive = {
  0: {
    items: 2,
  },
  480: {
    items: 3,
  },
  767: {
    items: 4,
  },
  1000: {
    items: 5,
  },
};
export default function ProductCarousel({ products, responsive,fromMiniso }) {
  const resp = responsive || defaultResponsive;

  const [selectedProduct, setSelectedProduct] = useState({});
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openModal = (product) => {
    // console.log('openModal funtion call',product);
    
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  const closeModal = () => {
    setIsProductModalOpen(false);
    setSelectedProduct({});
  };

  const openCartModal = (product) => {
    setSelectedProduct(product);
    setIsCartModalOpen(true);
  };

  const variationImages = (item) => {
    const images =
      item && item.variations && item.variations.map((img) => img.image);
    return images;
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

        // console.log(actualmin,'actualmax', actualmax);
        

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
      <div className="slider_nav">
        {products && products.length > 0 && (
          <ReactOwlCarousel
            lazyLoad={true}
            loop
            nav
            margin={10}
            responsive={resp}
          >
            {products.map((item, index) => {
              // console.log(item,'item item item ');
              
              return (
                <ProductCardNormal
                  // key={index}
                  fromMiniso={fromMiniso}
                  key={item.id}
                  sacwsedvff
                  id={item.id}
                  images={fromMiniso ? variationImages(item) : item.images}
                  title={item.name}
                  price={fromMiniso ? getPriceRange(item) : Math.round(item.price || 0)}
                  openModal={openModal}
                  product={item}
                  availableQuantity={item.available_quantity}
                  sku={item.sku}
                  rating={item.rating}
                  discountPercentage={item.discount_percentage}
                  discountPrice={item.discount_price}
                  brandSlug={item.brand_slug || item.brandSlug}
                  variationSlug={item.product_variation_slug || (item.variations && item.variations.length > 0 ? item.variations[0].slug: null)}
                  totalComments={item.total_comments}
                  productName={item.product_name}
                  attributes={item.attributes}
                  openCartModal={openCartModal}
                  preOrder={item.pre_order}
                  activeCampaignName={item.activeCampaignName}
                  categoryName={item.category_name}
                  discountEndTime={item.discount_end_time}
                  discountStartTime={item.discount_start_time}
                />
              );
            })}
          </ReactOwlCarousel>
        )}
      </div>

      <ProductDetailModal
        selectedProductVariation={selectedProduct}
        isOpen={isProductModalOpen}
        closeModal={closeModal}
        // varSlug={selectedProduct.product_variation_slug}
        varSlug={ selectedProduct.product_variation_slug || (selectedProduct.variations && selectedProduct.variations.length > 0 ? selectedProduct.variations[0].slug: null)}
      />
      <AddToCartModal
        isOpen={isCartModalOpen}
        setIsOpen={setIsCartModalOpen}
        selectedProduct={{ ...selectedProduct, qty: 1 }}
      />
    </>
  );
}

ProductCarousel.propTypes = {
  products: PropTypes.array,
};
