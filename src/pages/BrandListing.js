import React, { useEffect } from "react";
import "../styles/BrandListing.css";
import ImageCarousel from "../components/ImageCarousel";
import { useDispatch, useSelector } from "react-redux";
import { Brand_InstaResponsive } from "../util/responsive";
import { Link } from "react-router-dom";
import { GET_BRANDLISTING } from "../constants/actionTypes";
import {Helmet} from "react-helmet";
export default function BrandListing() {
  const {
    BrandListing: { brands_slider, all_brands }
  } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_BRANDLISTING });
  }, []);

  const listbrand = () => {
    let elemnt = [];
    let i = 65,
      j = 91;
    for (let k = i; k < j; k++) {
      let Alphabet = String.fromCharCode(k);
      if (all_brands.find(brand => brand.name.startsWith(Alphabet)))
        elemnt.push(
          <div className="row" key={k}>
            <div className="col-md-2">
              <div className="col-alpha">
                <span className="sizeing">{Alphabet}</span>
              </div>
            </div>
            <div className="col-md-10">
              <ul className="list">
                {all_brands.map(brand => {
                  return (
                    <>
                      {brand.name.startsWith(Alphabet) && (
                        <li key={brand.slug}>
                          <Link to={`/brand/${brand.slug}`} >
                            {brand.name}
                          </Link>
                        </li>
                      )}
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        );
    }
    return elemnt;
  };
  return (
    <>
      <Helmet>
        <title> BrandListing</title>
        <meta name="keywords" content="Beauty And Personal Care" />
        <meta name="description" content="Shop cosmetics online in Pakistan at aodour.pk. We provide huge range of imported beauty products like Makeup, Skincare, Hair Care with Payment on delivery." />
      </Helmet>
      <section>
        <div className="brand-section">
          <div className="container-fluid">
            <div className="heading align-center">
              <h3 className="clr1">Featured Brands</h3>
              <p>
                brower the collection of our best selling and trending products
              </p>
            </div>
            <div className="brand-slider nav-none">
              <ImageCarousel
                images={brands_slider}
                responsive={Brand_InstaResponsive}
              />
            </div>
          </div>
        </div>

        <section>
          <div className="container-fluid">
            <div className="heading align-center">
              <h3 className="clr1">All Brands</h3>
              <p>
                brower the collection of our best selling and trending products
              </p>
            </div>
            <div className="col-alpha">
              <ul className="apha-bets">
                <li>
                  <span>A</span>
                </li>
                <li>
                  <span>B</span>
                </li>
                <li>
                  <span>C</span>
                </li>
                <li>
                  <span>D</span>
                </li>
                <li>
                  <span>E</span>
                </li>
                <li>
                  <span>F</span>
                </li>
                <li>
                  <span>G</span>
                </li>
                <li>
                  <span>H</span>
                </li>
                <li>
                  <span>I</span>
                </li>
                <li>
                  <span>J</span>
                </li>
                <li>
                  <span>K</span>
                </li>
                <li>
                  <span>L</span>
                </li>
                <li>
                  <span>M</span>
                </li>
                <li>
                  <span>N</span>
                </li>
                <li>
                  <span>O</span>
                </li>
                <li>
                  <span>P</span>
                </li>
                <li>
                  <span>Q</span>
                </li>
                <li>
                  <span>R</span>
                </li>
                <li>
                  <span>S</span>
                </li>
                <li>
                  <span>T</span>
                </li>
                <li>
                  <span>U</span>
                </li>
                <li>
                  <span>V</span>
                </li>
                <li>
                  <span>W</span>
                </li>
                <li>
                  <span>X</span>
                </li>
                <li>
                  <span>Y</span>
                </li>
                <li>
                  <span>Z</span>
                </li>
              </ul>
            </div>
            <div className="search-filter">{listbrand()}</div>
          </div>
        </section>
      </section>
    </>
  );
}
