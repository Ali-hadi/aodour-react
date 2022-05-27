import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/loreal.css";
import { GET_GARNIER } from "../constants/actionTypes";
import { Helmet } from "react-helmet";
import ProductGrid from "../components/ProductGrid";
import LoadMoreGrid from "../components/LoadMoreGrid";
import Loader from "../components/Loader/compnentLoader";
import { Link } from "react-router-dom";
const banner1 = "https://storage.googleapis.com/aodour_v1/website/Garnier/banner.png";
const banner2 = "https://storage.googleapis.com/aodour_v1/website/Garnier/banner2.png";
const banner3 = "https://storage.googleapis.com/aodour_v1/website/Garnier/banner3.png";
const Image1 = "https://storage.googleapis.com/aodour_v1/website/Garnier/image1.jpg";
const Image2 = "https://storage.googleapis.com/aodour_v1/website/Garnier/image2.jpg";
const Image3 = "https://storage.googleapis.com/aodour_v1/website/Garnier/image3.jpg";
const Image4 = "https://storage.googleapis.com/aodour_v1/website/Garnier/image4.jpg";
const Image5 = "https://storage.googleapis.com/aodour_v1/website/Garnier/image5.jpg";
const Image6 = "https://storage.googleapis.com/aodour_v1/website/Garnier/image6.jpg";
const Image7 = "https://storage.googleapis.com/aodour_v1/website/Garnier/image7.jpg";
const Image8 = "https://storage.googleapis.com/aodour_v1/website/Garnier/image8.jpg";
const banner4 = "https://storage.googleapis.com/aodour_v1/website/Garnier/banner4.png";
const banner5 = "https://storage.googleapis.com/aodour_v1/website/Garnier/banner5.png";
const banner6 = "https://storage.googleapis.com/aodour_v1/website/Garnier/banner6.png";
const bundle_heading = "https://storage.googleapis.com/aodour_v1/website/Garnier/bundle-heading.png";

export default function Miniso() {
  const {
    products

  } = useSelector(({ garnier }) => garnier);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_GARNIER, callback: () => setLoading(false) });
  }, []);
  const [showProducts, setShowProducts] = useState([]);
  useEffect(() => {
    
    setShowProducts(products);
  }, [products]);

  return (
    <>
     
      <Helmet>
        <title>Garnier Sale 2021 | Aodour</title>
        <meta name="keywords" content="Garnier Sale 2021 | Aodour" />
        <meta name="description" content="Garnier Sale 2021 | Aodour" />
      </Helmet>
     
      {/* <Loader loading={loading} /> */}
      <div className="back-white">
        <div className="banner-floating mb0 light-gry">
          <div className="container-fluid">
            <div className="loreal_banner first-mb0">
              <figure>
              <Link to="/brand/garnier/">
                  <img src={banner1} alt="banner img here" />
                </Link>
              </figure>
            </div>
          </div>
        </div>

        <div className="light-gry mb0">
          <div className="container-fluid">
            <div className="loreal_banner first-mb0">
              <figure>
              <Link to="/brand/garnier/">
                  <img src={banner2} alt="banner img here" />
                </Link>
              </figure>
            </div>
          </div>
        </div>
        <div className="light-gry mb0">
          <div className="container-fluid">
            <div className="loreal_banner first-mb0 sparte_spaces">
              <div className="row">
                <div className="col-md-3 col-sm-4 col-xs-4">
                  <figure>
                    <a href="https://www.aodour.pk/brand/garnier">
                      <img src={Image1} alt="banner img here" />
                    </a>
                  </figure>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-4">
                  <figure>
                    <a href="https://www.aodour.pk/brand/garnier">
                      <img src={Image2} alt="banner img here"/>
                    </a>
                  </figure>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-4">
                  <figure>
                    <a href="https://www.aodour.pk/brand/garnier/hydra-bomb-light-complete-tissue-mask-serum">
                      <img src={Image3} alt="banner img here" />
                    </a>
                  </figure>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-4">
                  <figure>
                    <a href="https://www.aodour.pk/brand/garnier/garnier-skin-active-hydra-bomb-sakura-tissue-mask">
                      <img src={Image4} alt="banner img here" />
                    </a>
                  </figure>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-4">
                  <figure>
                    <a href="https://aodour.pk/brand/garnier/garnier-garnier-charcoal-and-algae-hydrating-face-sheet-mask">
                      <img src={Image5} alt="banner img here" />
                    </a>
                  </figure>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-4">
                  <figure>
                    <a href="https://www.aodour.pk/brand/garnier/garnier-pure-charcoal-tissue-face-mask-charcoal-with-black-tea">
                      <img src={Image6} alt="banner img here" />
                    </a>
                  </figure>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-4">
                  <figure>
                    <a href="https://www.aodour.pk/brand/garnier/garnier-hydra-bomb-tissue-mask-chamomile">
                      <img src={Image7} alt="banner img here" />
                    </a>
                  </figure>
                </div>
                <div className="col-md-3 col-sm-4 col-xs-4">
                  <figure>
                    <a href="https://www.aodour.pk/brand/garnier/garnier-hydra-bomb-eye-tissue-mask-orange">
                      <img src={Image8} alt="banner img here" />
                    </a>
                  </figure>
                </div>
              </div>
              
            </div>
          </div>
        </div>
        <div className="light-gry padding40x mb0">
          <div className="container-fluid">
            <div className="loreal_banner first-mb0">
              <figure>
              <Link to="/brand/garnier/">
                <img src={banner4} alt="banner img here" />
                </Link>
              </figure>
            </div>
          </div>
        </div>
        <div className="light-gry padding40x mb0">
          <div className="container-fluid">
            <div className="loreal_banner first-mb0">
                <Link to="/brand/garnier/">
                  <img src={banner5} alt="banner img here" />
                </Link>
            </div>
          </div>
        </div>
        <div className="light-gry padding40x mb0">
          <div className="container-fluid">
            <div className="loreal_banner first-mb0">
              <figure>
                <img src={bundle_heading} alt="banner img here" />
              </figure>
            </div>
            {products && products?.length > 0 && (
              <div className="light-gry padding40x mb0">
                <div className="container-fluid">
                  <ProductGrid Products={products}/>
                  
                </div>
              </div>
            )}
            
          </div>
        </div>

        <div className="light-gry padding40x mb0">
          <div className="container-fluid">
            <div className="loreal_banner first-mb0">
            <Link to="/brand/garnier/">
              <img src={banner6} alt="banner img here" />
            </Link>
              
            </div>
          </div>
        </div>








        
        {/* {products2 && products2.products?.length > 0 && (
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
        )} */}

      </div>
    </>
  );
}
