import React from "react";
import { Link } from "react-router-dom";
export default function ClinicSection({
  content: { hotCategories, bottomBanners },
}) {
  return (
    <>
      <div className="light-gry padding40x">
        <div className="container-fluid">
          {hotCategories && hotCategories.length > 1 && (
            <div className="heading align-center">
              <h3 className="">Hot Categories</h3>
              {/* <p className="clr1">
                  brower the collection of our best selling and trending products
                </p> */}
            </div>
          )}
          <div className="flaoting">
            <div className="row">
              {hotCategories &&
                hotCategories.map(({ href, id, image, title }) => (
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                    <div className="grid-column">
                      <a href={href} target="_blank">
                        <img src={image} alt={title} />
                      </a>
                      <div className="grid-footer">
                        <h5>{title}</h5>
                        <div className="click-btn">
                          <Link to="/" replace className="clr1">
                            <i className="icon-right" aria-hidden="true"></i>
                            Shop now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

              {bottomBanners &&
                bottomBanners.map(({ href, id, image, title }) => (
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="grid-column">
                      <a href={href}>
                        <img src={image} alt={title} />
                      </a>
                      <div className="grid-footer">
                        <h5>{title}</h5>
                        <div className="click-btn">
                          <Link to="/" className="clr1">
                            <i className="icon-right" aria-hidden="true"></i>
                            book now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
