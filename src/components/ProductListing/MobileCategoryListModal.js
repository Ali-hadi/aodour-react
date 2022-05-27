import React from "react";
import Modal from "react-modal";
import MobileCategoryListing from "./MobileCategoryListing";
import { Link } from "react-router-dom";
export default function MobileCategoryListModal({
  isOpen,
  onClose,
  MobileListing,
}) {
  const {
    sublist,
    modalTitle,
  } = MobileListing;
  return (
    <>
      <Modal
        onRequestClose={onClose}
        closeTimeoutMS={500}
        isOpen={isOpen}
        className="Left_Bar_Modal_Mobile_Nav"
        shouldCloseOnOverlayClick={true}
      >
        
        {modalTitle && (
            <div className="responsive_widget">
              {/* <span className="icon-left-chevron backbtn"  onClick={onClose}></span> */}
              <span className="cross-btn icon-close" onClick={onClose}></span>
              <h5 className="res_title">
                <Link to={modalTitle.url}>{modalTitle.text}</Link>
              </h5>
          </div>   
          
        )}
        
        
        {/*CLOSE BUTTON*/}
        <div className="side_widgets">
          <MobileCategoryListing List={sublist} onClick={onClose} />
        </div>
      </Modal>
    </>
  );
}
