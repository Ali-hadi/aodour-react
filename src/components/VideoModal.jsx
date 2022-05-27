import React, { useState } from "react";
import Modal from "react-modal";
export default function VideoModal({ isOpen, video, onClose }) {
  
  let videoUrl=(video && video.url )?video.url:null;
  return (
    <>
      <Modal
        // overlayClassName={"imageModalOverlay"}
        onRequestClose={() => onClose(false)}
        shouldCloseOnOverlayClick={true}
        className={'image_popup'}
        isOpen={isOpen}
        onClose={onClose}
      >
        <div>
          <span className="cross-btn icon-close" data-dismiss="modal" onClick={onClose}></span>
          <iframe src={videoUrl}
            frameBorder='0'
            allow='encrypted-media'
            title='video'
          />
        </div>
      </Modal>
    </>
  );
}
