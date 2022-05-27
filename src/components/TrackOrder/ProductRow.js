import React from 'react'
import { isMobile } from "react-device-detect";

const ProductRow = ({ product: { image, productVariationName, quantity, price, discountPrice }, orderStatus }) => {
  return (
    <>
      <div className="product_listing">
        <ul>
          <li><div className="product_columnlist"><img src={image} alt={productVariationName} /><div className="product_caption"><span>{productVariationName}</span><span> x {quantity}</span><span>Rs. {price - discountPrice} {discountPrice > 0 ? <del> {price}</del> : <></>}</span></div></div></li>
        </ul>
      </div>

      
    </>
  )
}

export default ProductRow
