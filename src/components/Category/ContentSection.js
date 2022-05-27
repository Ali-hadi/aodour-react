import React from "react";
import ProductCarousel from "../ProductCarouselOne";
export default function Section({ Title, Description, Products }) {
  // console.log("product", Products);
  return (
    <>
      <div className="heading align-center">
        <h3 className="clr1">{Title}</h3>
        {/* <p>{Description}</p> */}
      </div>
      <div className="owl-theme no-arrows mb50">
        <ProductCarousel
          products={Products}
          responsive={{
            0: {
              items: 2,
            },
            480: {
              items: 2,
            },
            767: {
              items: 3,
            },
            1000: {
              items: 3,
            },
          }}
        />
      </div>
    </>
  );
}
