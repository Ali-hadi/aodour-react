import React from "react";
import Modal from "react-modal";
import "../../styles/gift.css";
const BackImage = "https://storage.googleapis.com/aodour_v1/website/campain/Popup.jpg";
const FreeGiftModal = ({ isOpen, setIsOpen, product }) => {
  const variation =
    product.variations && product.variations.length > 0
      ? product.variations[0]
      : {};
  const image = product.transparentImage;
  return (
    <>
      <Modal
        closeTimeoutMS={500}
        isOpen={isOpen}
        className={"giftproductmodel"}
        onRequestClose={() => setIsOpen(false)}
        shouldCloseOnOverlayClick={true}
        
      >
        <div className="giftproductnotify">
          <figure>
            <img src={image} alt="image here" />
          </figure>
          <h5>{variation.productVariationName}</h5>
          {/* <h6>Vitex Agnus-Castus</h6> */}
          <button onClick={() => setIsOpen(false)}>
            <span className="cross-btn icon-close"></span>
          </button>
        </div>
      </Modal>
    </>
  );
};

export default FreeGiftModal;
