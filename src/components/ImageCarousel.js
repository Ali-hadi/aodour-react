import React from "react";
import { Link } from "react-router-dom";
import ReactOwlCarousel from "react-owl-carousel";

export default function Carousel({ images, responsive }) {
  return (
    <>
      <div className="slider_nav">
        {images.length > 0 && (
          <ReactOwlCarousel
            lazyLoad={true}
            loop
            nav
            autoplay={true}
            margin={10}
            responsive={responsive}
          >
            {images.map((item, index) => {
              // if (!item.href?.length > 0)
              //   return (
              //     <div key={index}>
              //       <img src={item.image} alt={item.name} />
              //     </div>
              //   );

              return (
                <div className="item" key={item.id}>
                  {item.href ? (
                    <a href={item.href} target="_blank">
                      {" "}
                      <img src={item.image} alt={item.title} />
                    </a>
                  ) : (
                    <Link to={`/brand/${item.slug}`} target="_blank">
                      {" "}
                      <img src={item.image} alt={item.name} />
                    </Link>
                  )}
                </div>
              );
            })}
          </ReactOwlCarousel>
        )}
      </div>
    </>
  );
}
