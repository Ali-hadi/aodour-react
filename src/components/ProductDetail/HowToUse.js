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
        <h5>How to Use</h5>
      </div>
      {ReactHtmlParser(product.how_to_use, { transform })}
    </div>
  );
}
