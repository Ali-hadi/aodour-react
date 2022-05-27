import React, { useState } from "react";
import { Link } from "react-router-dom";
const img = "https://storage.googleapis.com/aodour_v1/website/adds-img1.jpg";
export default function NavBarCategoryMenu({
  new_brands,
  popular_brands,
  all_brands,
}) {
  const [showallBrands, setshowallBrands] = useState(true);

  const getListing = () => {
    if (showallBrands) {
      return (
        <div className="tab-mega">
          <div className="search-filter">
            <div className="row">
              <div className="col-md-12">
                <div className="search_items">
                  <ul className="list">
                    {all_brands &&
                      all_brands.map((brand) => (
                        <li key={brand.id}>
                          <Link to={`/brand/${brand.slug}`}>
                            {brand.name}
                            {/* <small>10</small> */}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="tab-mega">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div className="list-column mb20">
              <figure>
                <Link to="/">
                  <img src={img} alt="img here" />
                </Link>
              </figure>
            </div>
            <div className="list-column mb20">
              <figure>
                <Link to="/">
                  <img src={img} alt="img here" />
                </Link>
              </figure>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div className="list-column mb20">
              <figure>
                <Link to="/">
                  <img src={img} alt="img here" />
                </Link>
              </figure>
            </div>
            <div className="list-column mb20">
              <figure>
                <Link to="/">
                  <img src={img} alt="img here" />
                </Link>
              </figure>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
            <div className="list-column mb20">
              <figure>
                <Link to="/">
                  <img src={img} alt="img here" />
                </Link>
              </figure>
            </div>
            <div className="list-column mb20">
              <figure>
                <Link to="/">
                  <img src={img} alt="img here" />
                </Link>
              </figure>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <Link to="/">Brands</Link>
      <div className="mega-menu">
        <div className="mega-content">
          <div className="list-column side-list">
            <h6
              className="mb14"
              // onMouseEnter={() => setshowallBrands(true)}
              //   onMouseLeave={() => setshowallBrands(false)}
            >
               <Link
                    to={{
                      pathname: `/brand`,
                    }}
                  >
              Brand A-Z
              </Link>
            </h6>
            <h6>New Brands</h6>
            <ul className="list">
              {new_brands.map((brand) => (
                <li key={brand.id}>
                  <Link
                    to={{
                      pathname: `/brand/${brand.slug}`,
                    }}
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h6>Featured Brands</h6>
            <ul className="list">
              {popular_brands.map((brand) => (
                <li key={brand.id}>
                  <Link
                    to={{
                      pathname: `/brand/${brand.slug}`,
                    }}
                  >
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {getListing()}
        </div>
      </div>
    </>
  );
}
