import React from "react";
import ReactOwlCarousel from "react-owl-carousel";
import { Link, useHistory } from "react-router-dom";
import { isMobile } from "react-device-detect";
const image3 = "https://storage.googleapis.com/aodour_v1/website/loreal/brand-img-1.png";
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

export default function ProductCarousel({ products, responsive }) {
  const resp = responsive || defaultResponsive;
  const history = useHistory();
  return (
    <>
      <div className="slider_nav">
        {products.length && (
          <ReactOwlCarousel
            lazyLoad={true}
            loop
            nav
            margin={10}
            responsive={resp}
          >
            {products.map(item => {
              const images = item.images;
              return (
                <div key={item.id} className="item">
                  <div className="product-col brand-col">
                    <div className="countdown-timer">
                      <h6>
                        Time Remaining
                        <span className="countdown">
                          <span className="hour"></span>
                          <span className="min"></span>
                          <span className="sec"></span>
                        </span>
                      </h6>
                    </div>
                    <div className="brand-log">
                      <img src={image3} alt="company logo" />
                    </div>
                    <figure
                      onClick={() => {
                        if (isMobile) {
                          history.push(
                            `/brand/${item.brand_slug}/${item.product_variation_slug}`
                          );
                        }
                      }}
                    >
                      <img className="image1" src={images[0]} alt="img here" />
                      <img className="image2" src={images[0]} alt="img here" />
                    </figure>
                    <div className="product-content">
                      <span>face primers</span>
                      <h6>
                        <Link
                          to={{
                            pathname: `/brand/${item.brand_slug}/${item.product_variation_slug}`
                          }}
                          
                        >
                          {item.name}
                        </Link>
                      </h6>
                      <h6 className="clr1">
                        Rs {item.discount_price}
                        <del>Rs {item.price}</del>
                      </h6>
                    </div>
                  </div>
                </div>
              );
            })}
          </ReactOwlCarousel>
        )}
      </div>
    </>
  );
}
