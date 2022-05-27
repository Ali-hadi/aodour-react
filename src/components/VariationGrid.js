import React, { useState } from "react";
import ProductCardNormal from "./Product/ProductCardNormal";
import ProductCardCheckOut from "./Product/ProductCardCheckout";
import ProductDetailModal from "./Product/ProductDetailModal";
import AddToCartModal from "./AddToCartModel";
export default function ProductGrid(props) {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedVariationSlug, setSelectedVariationSlug] = useState("");
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const { products, checkoutType } = props;

  const openModal = (product, slug) => {
    setSelectedProduct(product);
    setSelectedVariationSlug(slug);
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

  return (
    <>
      <div className="row">
        {products.length > 0 &&
          products.map((product, index) => {
            // const images = JSON.parse(item.images);
            const item = product.variations ? product.variations[0] || {} : {};
            if (checkoutType)
              return (
                <div key={index} className="col-md-3 col-sm-6 col-xs-6">
                  <ProductCardCheckOut
                    addtowishlist={props.addtowishlist}
                    key={item.id}
                    id={item.id}
                    images={item.images}
                    title={item.productVariationName}
                    price={Math.round(item.price || 0)}
                    openModal={openModal}
                    product={item}
                    availableQuantity={item.availableStock}
                    sku={item.sku}
                    rating={product.rating}
                    discountPercentage={item.discountPercentage}
                    discountPrice={item.discountPrice}
                    brandSlug={product.brandSlug}
                    variationSlug={item.slug}
                    totalComments={product.totalComments}
                    productName={product.name}
                    attributes={item.attributes}
                    activeCampaignName={item.activeCampaignName}
                    openCartModal={openCartModal}
                    categoryName={product.subSubCategoryName}
                    discountEndTime={item.discountEndTime}
                    preOrder={item.pre_order}
                    discountStartTime={item.discountStartTime}
                  />
                </div>
              );

            return (
              <div key={index} className="col-md-3 col-sm-6 col-xs-6">
                <ProductCardNormal
                  addtowishlist={props.addtowishlist}
                  key={item.id}
                  id={item.id}
                  images={item.images}
                  title={item.productVariationName}
                  price={Math.round(item.price || 0)}
                  openModal={openModal}
                  product={item}
                  availableQuantity={item.availableStock}
                  sku={item.sku}
                  rating={product.rating}
                  discountPercentage={item.discountPercentage}
                  discountPrice={item.discountPrice}
                  brandSlug={product.brandSlug}
                  variationSlug={item.slug}
                  totalComments={product.totalComments}
                  productName={product.name}
                  attributes={item.attributes}
                  activeCampaignName={item.activeCampaignName}
                  openCartModal={openCartModal}
                  categoryName={product.subSubCategoryName}
                  discountEndTime={item.discountEndTime}
                  preOrder={item.pre_order}
                  discountStartTime={item.discountStartTime}
                />
              </div>
            );
          })}
      </div>
      <ProductDetailModal
        selectedProduct={selectedProduct}
        isOpen={isProductModalOpen}
        closeModal={closeModal}
        varSlug={selectedVariationSlug}
      />
      <AddToCartModal
        isOpen={isCartModalOpen}
        setIsOpen={setIsCartModalOpen}
        selectedProduct={{ ...selectedProduct, qty: 1 }}
      />
    </>
  );
}
