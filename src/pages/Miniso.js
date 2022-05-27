import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useHistory } from "react-router-dom";

import "../styles/miniso.css";
import {
  GET_HOMEPAGE_PRODUCTS,
  GET_HOMEPAGE_BANNER,
  GET_MANISO_MENU,
  GET_MINISO_PRODUCTS,
  GET_MINISO_CATEGORYPRODUCT,
  GET_MINISO_SUBCATEGORY,
} from "../constants/actionTypes";
import ImageCarousel from "../components/ImageCarousel";
import { Link } from "react-router-dom";
import ProductCarousel from "../components/ProductCarouselOne";
import { MainSlider } from "../util/responsive";
import Loader from "../components/Loader/compnentLoader";

export default function Miniso() {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: GET_HOMEPAGE_PRODUCTS });
    // dispatch({ type: GET_HOMEPAGE_BANNER });
    // dispatch({ type: GET_MANISO_MENU });
    dispatch({ type: GET_MINISO_PRODUCTS, callback: () => setLoading(false) });
    // dispatch({ type: GET_MINISO_CATEGORYPRODUCT, payload: slug });
    // dispatch({ type: GET_MINISO_SUBCATEGORY, payload: slug });
  }, []);

  const { minisoProduct } = useSelector(({ minisoProduct }) => minisoProduct);

  const Productdata = minisoProduct && minisoProduct.result;

  // Banners//
  const miniso_bundle_offer = Productdata && Productdata.miniso_bundle_offer;
  const miniso_sub_full_banner_1 =
    Productdata && Productdata.miniso_sub_full_banner_1;
  const miniso_sub_full_banner_2 =
    Productdata && Productdata.miniso_sub_full_banner_2;
  const miniso_sub_full_banner_3 =
    Productdata && Productdata.miniso_sub_full_banner_3;
  const miniso_sub_full_banner_4 =
    Productdata && Productdata.miniso_sub_full_banner_4;

  // const Images = Productdata && Productdata.category_banner;
  const image = Productdata && Productdata.main_banner;

  // Productlist//
  const products_1 =
    Productdata && Productdata && Productdata.products_1.products;
  const products_2 =
    Productdata && Productdata && Productdata.products_2.products;
  const products_3 =
    Productdata && Productdata && Productdata.products_3.products;
  const products_4 =
    Productdata && Productdata && Productdata.products_4.products;
  const products_5 =
    Productdata && Productdata && Productdata.products_5.products;
  const products_6 =
    Productdata && Productdata && Productdata.products_6.products;

  return (
    <>
    <Loader loading={loading} />
      <div className="miniso">
        <div className="banner-floating mb50">
          <div className="container-fluid">
            <div className="main_banner dot_active">
              <ImageCarousel images={image || []} responsive={MainSlider} />
            </div>
          </div>
        </div>
        <div className="mb50">
          <div className="container-fluid">
            <ProductCarousel products={products_1} fromMiniso={true} />
          </div>
        </div>
        <section className="light-gry padding40x mb50">
          <div className="container-fluid">
            <div className="heading align-center mb24">
              <h3 className="">hot category</h3>
              {/* <p className="clr1">
                brower the collection of our best selling and trending products
              </p> */}
            </div>
            <div className="col-content">
              <ul className="seller_images">
                {Productdata &&
                  Productdata.category_banner.map((items, index) => {
                    return (
                      <li className="" key={index}>
                        <div className="top_seller_column">
                          <Link to={items.href}>
                            <img src={items.image} alt="banner here" />
                          </Link>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </section>
        <div className="mb50">
          <div className="container-fluid">
            <ProductCarousel products={products_2} fromMiniso={true} />
          </div>
        </div>

        {
          miniso_bundle_offer && miniso_bundle_offer.length > 0 &&

          <div className="mb50">
            <div className="container-fluid">
              <div className="ao-dual-banner">
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-xs-12">
                    <div className="bundel-heading align-center mb24">
                      <h3 className="">Bundels Offer</h3>
                      <h2 className="">flat 20% off</h2>
                    </div>
                  </div>
                  {miniso_bundle_offer &&
                    miniso_bundle_offer.map((items, index) => {
                      return (
                        <div className="col-md-6 col-sm-6 col-xs-6" key={index}>
                          <li className="">
                            <div className="top_seller_column">
                              <Link to={items.href}>
                                <img src={items.image} alt="img  here" />
                              </Link>
                            </div>
                          </li>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        }

        <div className="mb50">
          <div className="container-fluid">
            {miniso_sub_full_banner_1 &&
              miniso_sub_full_banner_1.map((item, index) => {
                return (
                  <div key={index}>
                    <a href={item.href}>
                    <img src={item.image} alt="img  here" />
                    </a>
                  </div>
                );
              })}
          </div>
        </div>

        <div className="mb50">
          <div className="container-fluid">
            <ProductCarousel products={products_3} fromMiniso={true} />
          </div>
        </div>

        <div className="mb50">
          <div className="container-fluid">
            {miniso_sub_full_banner_2 &&
              miniso_sub_full_banner_2.map((item, index) => {
                return (
                  <div key={index}>
                    <a href={item.href}>
                    <img src={item.image} alt="img  here" />
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mb50">
          <div className="container-fluid">
            <ProductCarousel products={products_4} fromMiniso={true} />
          </div>
        </div>
        <div className="mb50">
          <div className="container-fluid">
            {miniso_sub_full_banner_3 &&
              miniso_sub_full_banner_3.map((item, index) => {
                return (
                  <div key={index}>
                   <a href={item.href}>
                    <img src={item.image} alt="img  here" />
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mb50">
          <div className="container-fluid">
            <ProductCarousel products={products_5} fromMiniso={true} />
          </div>
        </div>
        <div className="mb50">
          <div className="container-fluid">
            {miniso_sub_full_banner_4 &&
              miniso_sub_full_banner_4.map((item, index) => {
                return (
                  <div key={index}>
                    <a href={item.href}>
                    <img src={item.image} alt="img  here" />
                    </a>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mb50">
          <div className="container-fluid">
            <ProductCarousel products={products_6} fromMiniso={true} />
          </div>
        </div>
      </div>
    </>
  );
}
