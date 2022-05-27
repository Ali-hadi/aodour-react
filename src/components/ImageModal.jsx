import React, { useState } from "react";
import Modal from "react-modal";
export default function PriceFilter({ Open, img, onClose }) {
    let image=(img && img.image )?img.image:null;
  return (
    <>
      <Modal
        // overlayClassName={"imageModalOverlay"}
        onRequestClose={() => onClose(false)}
        shouldCloseOnOverlayClick={true}
        className={'image_popup'}
        isOpen={Open}
        onClose={onClose}
      >
        <div>
          <span className="cross-btn icon-close" data-dismiss="modal" onClick={onClose}></span>
          <img src={image} />
        </div>
      </Modal>
    </>
  );
}
