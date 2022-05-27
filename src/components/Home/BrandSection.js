import React from "react";

import ReactOwlCarousel from "react-owl-carousel";

import image from "../../assets/images/brand-img-3.png";

export default function BrandSection({images,responsive}) {
  return (
    <>
      <div className="brand-section ">
        <div className="container-fluid">
          <div className="brand-slider slider_nav">
            {images.length && (
              <ReactOwlCarousel
                lazyLoad={true}
                loop
                nav
                margin={10}
                responsive={responsive}
              >
                {images.map((item,index) => {
                  return (
                    <div key={index}  className="item" key={item.id}>
                      <img src={image} alt="here" />
                    </div>
                  );
                })}
              </ReactOwlCarousel>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
