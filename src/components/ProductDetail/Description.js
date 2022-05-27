import React from "react";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
export default function Description({ selectedProduct }) {
  const product = selectedProduct || {};

  const transform = (node, index) => {
    if (node.type === "tag" && node.name === "pre") {
      node.name = "div";
      // console.log(node);
      return convertNodeToElement(node, index, transform);
    }
  };
  return (
    <div className="tab-element">
      <div className="heading_style_2">
        <h5>Product details</h5>
      </div>
      <p> {ReactHtmlParser(product.description, { transform })}</p>
      <figure className="description_image">
        {product.description_image && (
          <img src={product.description_image} alt={product.name} />
        )}
      </figure>
      {/* <span>Skin Type</span>
      <p>All Skin Types</p>
      <span>Product Usage</span>
      <p>Use Directly</p> */}
    </div>
  );
}
