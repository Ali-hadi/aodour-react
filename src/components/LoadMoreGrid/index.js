import React, { useState, useEffect } from "react";
import ProductGrid from "../ProductGrid";
const Loader = ({ products }) => {
  const pageSize = 8;
  const [showProducts, setShowProducts] = useState([]);
  useEffect(() => {
    setShowProducts(products.slice(0,pageSize));
  }, [products]);

  const LoadMoreHandler=()=>{
    setShowProducts(products.slice(0,showProducts.length+pageSize));
  }
  return (
    <>
      <ProductGrid Products={showProducts} />
      <div className="listing align-center">
        <button className="btn-normal at_bg3" onClick={LoadMoreHandler}>load more</button>
      </div>
    </>
  );
};
export default Loader;
