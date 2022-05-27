import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/ProductDetail.css";
import { Link, useHistory } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import TopSection from "../components/ProductDetail/TopSection";
import BottomSection from "../components/ProductDetail/BottomSection";
// import { GASet } from "../util/GoogleAnalytics";
import ReactGA from "react-ga";
import { gtagEvent } from "../util/GoogleTagManager";
import { fbqTrack } from "../util/FacebookAnalytics";
import { Helmet } from "react-helmet";

// import EidCampaignBottomBanner from "../components/Campaign/EidCampaignBottomBanner";

export default function ProductDetail(props) {
  const [selectedProduct, setSelectedProduct] = useState({});

  const { varSlug } = useParams();

  const { productDetailPage } = useSelector((state) => state);

  const history = useHistory();

  useEffect(() => {
    
    // if (productDetailPage.product.length < 1) {
    //   history.push("/404");
    //   return;
    // }

 
    const variation = productDetailPage.product_variations.find(
      ({ product_variation_slug }) => product_variation_slug === varSlug
    );

    if (variation) {
      gtagEvent("page_view", {
        send_to: "AW-835343819",
        value: `${variation.price}`,
        items: [
          {
            id: `${variation.sku}`,
            google_business_vertical: "retail",
          },
        ],
      });

      gtagEvent("view_item", {
        send_to: "AW-835343819",
        value: `${variation.price}`,
        items: [
          {
            id: `${variation.sku}`,
            google_business_vertical: "retail",
          },
        ],
      });

      ReactGA.set({
        dimension1: variation.sku,
        dimension2: "cosmetic",
        dimension3: variation.price,
      });

      fbqTrack("ViewContent", {
        content_name: `${variation.name.slice(0, 150)}`,
        content_desc: `${
          variation.short_description !== null
            ? variation.short_description.slice(0, 150)
            : ""
        }`,
        content_type: "product",
        content_ids: `["${variation.sku}"]`,
        content_id: `${variation.sku}`,
        value: `${variation.price}`,
        currency: 'PKR'
      });
    }
  }, [productDetailPage]);
  // const query = props.location.search;
  // const { variationId, productId } = props.location.state;

  // const onProductcarouselChange = (index) => {
  //   const { product_variations } = productDetailPage;
  //   if (Number.isInteger(index)) {
  //     for (let product of product_variations) {
  //       if (product.id === images[index].productVariationId) {
  //         setSelectedProduct(product);
  //         setSelectedImage(index);
  //         break;
  //       }
  //     }
  //   }
  //   // console.log(images);
  // };

  return (
    <>
      <Helmet>
        <title>
          {productDetailPage.product.length > 0 &&
          productDetailPage.product[0].meta_title !== null &&
          productDetailPage.product[0].meta_title !== ""
            ? `${productDetailPage.product[0].meta_title}`
            : "Online Cosmetics Shopping in Pakistan"}
        </title>
        <meta
          name="description"
          content={
            productDetailPage.product.length > 0
              ? productDetailPage.product[0].meta_description
              : ""
          }
        />
        <meta
          name="keywords"
          content={
            productDetailPage.product.length > 0
              ? productDetailPage.product[0].meta_keywords
              : ""
          }
        />
      </Helmet>
      <div className="inner-banner">
        <div className="container-fluid">
          <ul className="breadcrumbs">
            <li>
              <Link to="/">home</Link>
            </li>
            <li>
              <Link to="/">Brands</Link>
            </li>
            {productDetailPage.product.length > 0 && (
              <>
                <li>
                  <Link
                    to={`/brand/${productDetailPage.product[0].brand_slug}`}
                    replace
                  >
                    {productDetailPage.product[0].brand_name}
                  </Link>
                </li>
                <li>
                  <span>{productDetailPage.product[0].name}</span>
                  {/* <span onClick={() => setSelectedImage(3)}>Results</span> */}
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="content">
        <TopSection
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          productDetailPage={productDetailPage}
          varSlug={varSlug}
        />
        <BottomSection
          selectedProduct={selectedProduct}
          varSlug={varSlug}
          product={productDetailPage.product[0] || {}}
        />
        {/* <div className="margin_42">
          <EidCampaignBottomBanner/>
        </div> */}
      </div>
    </>
  );
}
