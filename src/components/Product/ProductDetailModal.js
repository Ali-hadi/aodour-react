import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";
import { GET_PRODUCT_DETAIL } from "../../constants/actionTypes";
import ProductModalContent from "./ProductModalContent";
import ProductContent from "../ProductDetail/ProductContent";
import DetailSection from "../ProductDetail/DetailSection";
import { Carousel } from "react-responsive-carousel";
import "../../styles/ProductDetail.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../../styles/Modal.css";
import "./ProductDetailModal.css";

export default function ProductDetailModal({
  isOpen,
  closeModal,
  selectedProductVariation,
  selectedProduct,
  varSlug,
}) {
  // const images = selectedProductVariation.images || [];
  const [variation, setVariation] = useState({});

  // console.log(varSlug, 'var slug in p d m',selectedProductVariation);
  
  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="dialog"
        zIndex={1000}
      >
        <Modal
          closeTimeoutMS={500}
          isOpen={isOpen}
          onRequestClose={() => closeModal()}
          shouldCloseOnOverlayClick={true}
          overlayClassName={'ReactModal__Overlay custom_product'}
        >
          <div className="model-product">
            <div className="content">
              <section className="reponsive_padding">
                <div className="container-fluid custom-padding">
                  <div className="row">
                    <DetailSection
                      selectedProduct={variation}
                      setSelectedProduct={setVariation}
                      selectedProductVariation={selectedProductVariation}
                      varSlug={varSlug}
                    />
                  </div>
                  <div className="border-line"></div>
                </div>
              </section>
            </div>
          </div>
          <span
            className="cross-btn icon-close"
            data-dismiss="modal"
            onClick={() => {
              closeModal();
            }}
          ></span>
          {/*CLOSE BUTTON*/}
        </Modal>
      </CSSTransition>
    </>
  );
}
