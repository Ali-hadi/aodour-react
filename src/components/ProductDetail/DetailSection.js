import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import SliderImage from 'react-zoom-slider';
import ProductContent from "./ProductContent";
import { GET_PRODUCT_DETAIL } from "../../constants/actionTypes";
import ImageModal from "../ImageModal";
import VideoModal from "../VideoModal";
import { isMobile } from "react-device-detect";
import Loader from "../Loader/compnentLoader";
const Tag3 = "https://storage.googleapis.com/aodour_v1/campaign_images/Buy1get1.png";
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => ++value); // update the state to force render
}

const DetailSection = (props) => {
  const [images, setImage] = useState([]);
  const [selectedVariationId, setSelectedVariationId] = useState(0);
  const [features, setFeatures] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [productVideos, setProductVideos] = useState([]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const {
    selectedProduct,
    setSelectedProduct,
    varSlug,
    selectedProductVariation,
  } = props;

  // console.log(props, 'props are the');


  const { productDetailPage } = useSelector((state) => state);

  const forceUpdate = useForceUpdate();
  const dispatch = useDispatch();
  // const query = new URLSearchParams(useLocation().search);

  const emptyStates = () => {
    dispatch({ type: GET_PRODUCT_DETAIL, varSlug: "" });
    setImage([]);
    setSelectedProduct({});
    setAttributes([]);
    setSelectedVariationId(0);
    setFeatures([]);
  };
  useEffect(() => {
    // if (!selectedProductVariation) {
    setLoading(true);
    dispatch({
      type: GET_PRODUCT_DETAIL,
      varSlug,
      callback: () => {
        setLoading(false);
      },
    });
    // }
    return emptyStates();
  }, [varSlug]);

  useEffect(() => {
    // if (selectedProductVariation) {
    //   setSelectedProduct({ ...selectedProductVariation, qty: 1 });
    //   setSelectedVariationId(selectedProductVariation.id);
    //   return;
    // }
    const { product_variations, product, features } = productDetailPage;
    setProductVideos(product[0] ? product[0].videos || [] : []);

    // const color = query.get("color");
    let selectedVar;
    // if (color !== null && color !== "") {
    //   selectedVar = product_variations.find((variation) => {
    //     for (const attr of variation.attributes) {
    //       if (attr.type === "image" && attr.alt.trim() === color) {
    //         return true;
    //       }
    //     }
    //   });
    // }
    if (!selectedVar) {
      selectedVar = product_variations.find(
        ({ product_variation_slug }) => product_variation_slug === varSlug
      );
    }
    if (!selectedVar) {
      selectedVar =
        product_variations.length > 0
          ? { ...product_variations[0], qty: 1 }
          : {};
    }
    setSelectedProduct({ ...selectedVar, qty: 1 });
    setSelectedVariationId(selectedVar ? selectedVar.id || 0 : 0);
    // console.log("productDetailPage", productDetailPage);
    setFeatures(features);
    // let images = [];
    let attributes = [];
    for (let product of product_variations) {
      for (let attr of product.attributes) {
        if (attr.value === null && attr.image === null && attr.attr === null) {
          continue;
        }
        if (attributes.length < 1) {
          if (attr.type === "image") {
            // if (attr.image.trim() !== "") {
            attributes.push({
              name: attr.name,
              type: attr.type,
              id: attr.attribute_id,
              values: [
                {
                  value: attr.image,
                  alt: attr.alt,
                  productVariationId: product.id,
                },
              ],
            });
            // }
          } else {
            attributes.push({
              name: attr.name,
              type: attr.type,
              id: attr.attribute_id,
              values: [
                {
                  value: attr.value,
                  productVariationId: product.id,
                  unitName: attr.unit_name,
                },
              ],
            });
          }
          continue;
        }
        if (attr.value === null && attr.image === null && attr.attr === null) {
          continue;
        }
        let attributeExist = false;
        for (let filter of attributes) {
          if (attr.attribute_id === filter.id) {
            attributeExist = true;
            let alreadyExists = false;
            for (let { value, alt } of filter.values) {
              if (
                (filter.type === "image" && alt === attr.alt) ||
                (filter.type !== "image" && value === attr.value)
              ) {
                alreadyExists = true;
              }
            }
            if (!alreadyExists) {
              if (attr.type === "image") {
                // if (attr.image.trim() !== "") {
                filter.values.push({
                  value: attr.image,
                  alt: attr.alt,
                  productVariationId: product.id,
                });
                // }
              } else {
                filter.values.push({
                  value: attr.value,
                  productVariationId: product.id,
                  unitName: attr.unit_name,
                });
              }
            }
          }
        }
        if (!attributeExist) {
          if (attr.type === "image") {
            // if (attr.image.trim() !== "") {
            attributes.push({
              name: attr.name,
              type: attr.type,
              id: attr.attribute_id,
              values: [
                {
                  value: attr.image,
                  alt: attr.alt,
                  productVariationId: product.id,
                },
              ],
            });
            // }
          } else {
            attributes.push({
              name: attr.name,
              type: attr.type,
              id: attr.attribute_id,
              values: [
                {
                  value: attr.value,
                  productVariationId: product.id,
                  unitName: attr.unit_name,
                },
              ],
            });
          }
        }
      }
      // if (selectedVar && selectedVar.id === product.id) {
      //   setSelectedProduct({ ...product, qty: 1 });
      // }
    }
    setAttributes(attributes);
  }, [productDetailPage]);

  useEffect(() => {
    const findCurrent = productDetailPage.product_variations.find(
      ({ currentlySelected }) => currentlySelected
    );
    if (findCurrent) {
      setSelectedProduct({ ...findCurrent, qty: 1 });
    }
  }, [productDetailPage]);

  useEffect(() => {
    forceUpdate();
  }, [images]);

  useEffect(() => {
    let images = [];
    if (selectedProduct.images) {
      images = selectedProduct.images.map((image) => ({
        image,
        productVariationId: selectedProduct.id,
      }));
    }
    setImage(images);
  }, [selectedProduct]);

  const ApplyFilter = (id) => {
    const { product_variations } = productDetailPage;
    for (let product of product_variations) {
      if (product.id === parseInt(id)) {
        // const indexOfSeletedImage = images.findIndex(element => {
        //   if (product.id == element.productVariationId) return true;
        // });
        setSelectedProduct(product);
        setSelectedVariationId(id);
        break;
      }
    }
  };

  const getImages = () => {
    const carouselTags = [];
    let ind = 0;

    if (images.length > 0) {
      images.map((item, index) => {
        const props = { width: 400, height: 250, zoomWidth: 500, img: `${item.image}` };
        carouselTags.push(
          <div
            className="item"
            onClick={() => {
              setShowImageModal(true);
              setSelectedImage(index);
              setSelectedIndex(index);
            }}
            key={index}
          >

            <img src={`${item.image}`} alt={selectedProduct.name} />
          </div>
        );
        ind += 1;
      });
    }

    productVideos.map((item, index) => {
      if (!isMobile) {
        carouselTags.push(
          <div
            className="item"
            onClick={() => {
              setIsVideoModalOpen(true);
              setSelectedVideo(index);
              setSelectedIndex(index + images.length);
            }}
            key={index}
          >
            <img src={item.image} alt={selectedProduct.name} />
            <button className="playbtn at_bg2">
              <i className="fa fa-play"></i>
            </button>
          </div>
        );
      } else {
        carouselTags.push(
          <div
            className="item"
            onClick={() => {
              setSelectedVideo(index);
              setSelectedIndex(index + images.length);
            }}
            key={index}
          >
            <iframe
              src={item.url}
              frameBorder="0"
              allow="encrypted-media"
              title="video"
            />
            <img
              className={"video-image"}
              src={item.image}
              alt={selectedProduct.name}
            />
          </div>
        );
      }
      ind += 1;
    });

    return carouselTags;
  };


   function getImages2(){
    let imagesArr = []
    if (images && images.length > 0) {
      for (const [i, item] of images.entries()) {
        imagesArr.push({ image: item.image, text: `${i+1}/${images.length}` })
      }
    }
    // console.log(imagesArr, 'imagesArr imagesArr');
    
    return imagesArr
  }

  return (
    <>
      <Loader loading={loading} />
      <div className="col-lg-5 col-md-5 col-sm-5 col-xs-12">
          <div className="product-slider">
            {/* {
              images && images.length > 0 ?
            <SliderImage
              data={getImages2()}
              showDescription={true}
              direction="right"
            />
             : null} */}
            <Carousel selectedItem={selectedIndex}>{getImages()}</Carousel>
          </div>
      </div>
      <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
        {(productDetailPage.product_variations.length > 0 ||
          selectedProductVariation) && (
            <ProductContent
              features={features}
              selectedVariationId={selectedVariationId}
              productDetailPage={productDetailPage.product.length > 0 ? productDetailPage : { ...productDetailPage, product: [{}] }}
              Product={selectedProduct}
              attributes={attributes}
              selectedProduct={selectedProduct}
              setSelectedProduct={ApplyFilter}
              selectedProductSet={setSelectedProduct}
            />
          )}
      </div>

      <ImageModal
        Open={showImageModal}
        onClose={() => setShowImageModal(false)}
        img={images[selectedImage]}
      />
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        video={productVideos[selectedVideo]}
      />
    </>
  );
};

export default DetailSection;
