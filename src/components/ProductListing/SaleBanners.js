import React from "react";
const SaleBanners = ({ banners }) => {
  return (
    <>
      <div className="flashsale_banner">
        <div className="row">
          {banners &&
            banners.map((banner) => (
              <div className="col-md-6 col-sm-6 col-xs-10">
                <div className="bannersale">
                  <a href={banner.href} target="_black">
                    <img src={banner.image} alt="img here" />
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SaleBanners;
