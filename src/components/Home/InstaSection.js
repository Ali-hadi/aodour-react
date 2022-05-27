import React from "react";
import ReactOwlCarousel from 'react-owl-carousel'
const image1 = "https://storage.googleapis.com/aodour_v1/website/insta1.jpg";
export default function InstaSection({ images, responsive }) {
  return (
    <>
      <div className="social-images">
        <div className="container-fluid">
          <div className="heading align-center">
            <h3 className="clr1">#Aodourcosmetics</h3>
            <p>
              Tag a photo on instagram for a chance to be featured in our
              gallery
            </p>
          </div>
          <div className="crop-images  slider_nav">
            {/* <ImageCarousel
              images={images}
             
              responsive={responsive}
            /> */}
            {images.length && (
              <ReactOwlCarousel
                lazyLoad={true}
                loop
                nav
                margin={10}
                responsive={responsive}
              >
                {images.map((item, index) => {
                  return (
                    <div className="item" key={index}>
                      <img src={image1} alt="here" />
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
