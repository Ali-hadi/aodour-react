import React from "react";
import { Link } from "react-router-dom";
export default function SideProducts({ products }) {
  return (
    <>
      {products && products.length > 0 && (
        <>
          <div className="widget-title align-center">
            <h6>Similar Products</h6>
          </div>
          {products.length > 0 &&
            products.map((product) => (
              <div key={product.product_variation_slug} className="widget-product">
                <figure>
                  <img src={product.images[0]} alt={product.name} />
                </figure>
                <div className="widget-content">
                  <h6>
                    <Link
                      to={`/brand/${product.brand_slug}/${product.product_variation_slug}`}
                      
                    >
                      {product.name}
                    </Link>
                  </h6>
                  <span>RS {product.price}</span>
                </div>
              </div>
            ))}
        </>
      )}
    </>
  );
}
