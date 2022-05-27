import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/loreal.css";
import { GET_LOREAL_Extend } from "../constants/actionTypes";
import ImageCarousel from "../components/ImageCarousel";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import ProductCarousel from "../components/ProductCarousel";
import Loader from "../components/Loader/compnentLoader";
import { GET_KERASTASE } from "./../constants/actionTypes";
const ImageHere = "https://storage.googleapis.com/aodour_v1/images/610x360.png";
export default function Miniso() {
  const {
    bestsellers,
    banner,
    category_banner,
    our_new_range,
    our_new_range_product,
    hair_concern_banner,
    bottom_fix_image_banner,
    saloon_locator_banner,
    for_all_hairs,
    videos,
    meta,
  } = useSelector(({ kerastase }) => kerastase);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch({ type: GET_KERASTASE, callback: () => setLoading(false) });
  }, []);

  // console.log(our_new_range_product, 'our_new_range_product.products');
  return (
    <>
      {meta && (
        <Helmet>
          <title>{meta?.meta_title}</title>
          <meta name="keywords" content={meta?.meta_keyword} />
          <meta name="description" content={meta?.meta_description} />
        </Helmet>
      )}
      <Loader loading={loading} />
      <div className="ao_loreal kerastase_home">
        {banner && banner.length > 0 && (
          <div className="banner-floating  mb0 light-gry">
            <div className="container-fluid">
              <div className="loreal_banner ">
                {banner.map((item) => (item?.href?.length > 0 ?
                  <a href={item.href}>
                    <figure>
                      <img src={item.image} alt={item.title} />
                    </figure>
                  </a> : <figure>
                    <img src={item.image} alt={item.title} />
                  </figure>
                ))}
              </div>
            </div>
          </div>
        )}
        {bestsellers?.products && bestsellers?.products?.length > 0 && (
          <div className="light-gry padding40x mb0">
            <div className="container-fluid">
              {/* <div className="heading align-center mb24">
                <h3 className="clr1">{bestsellers.title}</h3>
                <p>{bestsellers.description}</p>
              </div> */}
              <ProductCarousel Products={bestsellers.products} />
            </div>
          </div>
        )}
        {category_banner?.banners?.length > 0 && (
          <section className="light-gry padding40x mb0">
            <div className="container-fluid">
              <div className="heading align-center mb24">
                <h3 className="clr1">{category_banner.title}</h3>
                <p>{category_banner.description}</p>
              </div>
              <div className="col-content ">
                <ul className="seller_images mb0">
                  {category_banner?.banners?.map((item) => (
                    <li className="">
                      <div className="top_seller_column">
                        <a href={item.href}>
                          <img src={item.image} alt={item.title} />
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
        {our_new_range?.length > 0 &&
          our_new_range_product?.products?.length > 0 && (
            <section className="light-gry padding40x mb0">
              <div className="container-fluid">
                <div className="heading align-center mb24">
                  <h3 className="clr1">OUR NEW RANGE</h3>
                </div>
                <div className="loreal_banner mb20">
                  {our_new_range.map((item) => (
                    <a href={item.href}>
                      <figure>
                        <img src={item.image} alt="banner here" />
                      </figure>
                    </a>
                  ))}
                </div>
                <ProductCarousel Products={our_new_range_product.products} />
              </div>
            </section>
          )}
        {hair_concern_banner?.banners?.length > 0 && (
          <section className="light-gry padding40x mb0">
            <div className="container-fluid">
              <div className="heading align-center mb24">
                <h3 className="clr1">{hair_concern_banner.title}</h3>
                <p>{hair_concern_banner.description}</p>
              </div>
              <div className="col-content ">

                <ul className="seller_images mb0">
                  {hair_concern_banner?.banners?.map((item) => {
                    if (item.type !== "video") {
                      return (
                        <li className="">
                          <div className="grid-column">
                            <a href={item.href}>
                              <img src={item.image} alt="banner here" />
                            </a>
                          </div>
                        </li>
                      );
                    }
                    return (
                      <li className="">
                        <div className="grid-column">
                          <img src={ImageHere} classname="placeholderbg" alt="image here"/>
                          <iframe
                            src={item.url}
                            frameborder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen
                          ></iframe>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </section>
        )}

        {for_all_hairs && for_all_hairs.length > 0 && (
          <div className="banner-floating  padding40x mb0 light-gry">
            <div className="container-fluid">
              <div className="loreal_banner ">
                {for_all_hairs.map((item) => (
                  <a href={item.href}>
                    <figure>
                      <img src={item.image} alt={item.title} />
                    </figure>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {videos && videos.length > 0 && (
          <div className="banner-floating  padding40x mb0 light-gry">
            <div className="container-fluid">
              <div className="row">
                {videos.map((item) => (
                  <div className="col-md-6 col-sm-6 col-xs-12">
                    <div className="grid-column m0">
                      <img src={ImageHere} classname="placeholderbg" alt="image here"/>
                      <iframe
                        src={item}
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {saloon_locator_banner && saloon_locator_banner.length > 0 && (
          <div className="banner-floating  padding40x mb0 light-gry">
            <div className="container-fluid">
              <div className="loreal_banner ">
                {saloon_locator_banner.map((item) => (
                  <a href={item.href}>
                    <figure>
                      <img src={item.image} alt={item.title} />
                    </figure>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
        {bottom_fix_image_banner?.length > 0 && (
          <section className="light-gry padding40x mb0">
            <div className="container-fluid">
              <div className="heading align-center mb24">
                <h3 className="clr1">before and after</h3>
              </div>
              <div className="picture-slider mb50">
                <ImageCarousel
                  images={bottom_fix_image_banner}
                  responsive={{
                    0: {
                      items: 2,
                    },
                    600: {
                      items: 4,
                    },
                    1000: {
                      items: 6,
                    },
                  }}
                />
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
