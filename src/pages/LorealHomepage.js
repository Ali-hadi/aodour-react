import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/loreal.css";
import { GET_LOREAL } from "../constants/actionTypes";
import { Helmet } from "react-helmet";
import LoadMoreGrid from "../components/LoadMoreGrid";
import Loader from "../components/Loader/compnentLoader";
const ImageHere = "https://storage.googleapis.com/aodour_v1/images/610x360.png";
export default function Miniso() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_LOREAL, callback: () => setLoading(false) });
  }, []);
  const { banner, products1, products2,products3, smallBanner, meta } = useSelector(
    ({ loreal }) => loreal
  );

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
      <div className="ao_loreal homepg">
        <div className="banner-floating mb0 light-gry">
          <div className="container-fluid">
            <div className="loreal_banner first-mb0">
              {banner && (
                <>
                  {banner[0] && (
                    <figure>
                      <a href={banner[0].href}>
                        <img src={banner[0].image} alt={banner[0].type} />
                      </a>
                    </figure>
                  )}

                  {banner[1] && (
                    <figure>
                      <a href={banner[1].href}>
                        <img src={banner[1].image} alt={banner[1].type} />
                      </a>
                    </figure>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {products1 && products1.products?.length > 0 && (
          <div className="light-gry padding40x mb0">
            <div className="container-fluid">
              <div className="heading align-center mb24">
                <h3 className="clr1">{products1.title}</h3>
              </div>
              <LoadMoreGrid products={products1.products} />
            </div>
          </div>
        )}
        {!loading && (
          <section className="light-gry padding40x mb0">
            <div className="container-fluid">
              <div className="col-content ">
                <ul className="seller_images mb0">
                  <li className="">
                    <div className="grid-column mb0">
                    <img src={ImageHere} classname="placeholderbg" alt="image here"/>
                      <iframe
                        src="https://www.youtube.com/embed/jwPCb1Cwklw"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </div>
                  </li>
                  <li className="">
                    <div className="top_seller_column">
                      <a href="">
                        <img
                          src={smallBanner ? smallBanner[0]?.image : ""}
                          alt={smallBanner ? smallBanner[0]?.title : ""}
                        />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        )}
        {banner && banner[2] && (
          <div className="light-gry padding40x mb0">
            <div className="container-fluid">
              <div className="loreal_banner first-mb0">
                <figure>
                  <img src={banner[2].image} alt={banner[2].title} />
                </figure>
              </div>
            </div>
          </div>
        )}
        {products2 && products2.products?.length > 0 && (
          <div className="light-gry padding40x mb0">
            <div className="container-fluid">
              <div className="heading align-center mb24">
                <h1 className="clr1">{products2.title}</h1>
              </div>
              <div className="mb50 responsive_class">
                <LoadMoreGrid products={products2.products} />
              </div>
            </div>
          </div>
        )}

{banner && banner[3] && (
          <div className="light-gry mb20">
            <div className="container-fluid">
              <div className="loreal_banner">
                <figure>
                  <img src={banner[3].image} alt={banner[3].title} />
                </figure>
              </div>
            </div>
          </div>
        )}
        {products3 && products3.products?.length > 0 && (
          <div className="light-gry padding40x mb0">
            <div className="container-fluid">
              <div className="heading align-center mb24">
                <h3 className="clr1">{products3.title}</h3>
              </div>
              <div className="mb50 responsive_class">
                <LoadMoreGrid products={products3.products} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
