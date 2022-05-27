import React from "react";

export default function TopSellerBanner({ banners }) {
  return (
    <>
      {banners && banners.length > 0 && (
        <section className="light-gry padding40x">
          <div className="container-fluid">
            <div className="heading align-center">
              <h3 className="">Must Check</h3>
              {/* <p className="clr1">
                brower the collection of our best selling and trending products
              </p> */}
            </div>
            <div className="col-content">
              <ul className="seller_images">
                {banners.map(banner => (
                  <li className="">
                    <div className="top_seller_column">
                      <a href={banner.href} target='_blank'>
                        <img src={banner.image} alt={banner.title} />
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
