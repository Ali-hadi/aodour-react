import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "../../styles/gift.css";
// const LandingPopupImage = "https://storage.googleapis.com/aodour_v1/campaign/Popup2.jpg"
import LandingPopupImage from "../../assets/images/compaign/Popup2.jpg"
const LandingPageModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const found = routes.find((element) => {
      return element.toLocaleLowerCase() === url.toLocaleLowerCase();
    });
    if (!visited && !found) {
      window.localStorage.setItem("isVisited", true);
      setTimeout(() => {
        setOpen(true);
      }, 5000);
    }
  }, []);

  return (
    <>
      <Modal
        closeTimeoutMS={500}
        isOpen={open}
        className={"campaign_model"}
        onRequestClose={() => setOpen(false)}
        shouldCloseOnOverlayClick={true}
      >
        <div className="landing_popup">
          <button onClick={() => setOpen(false)}>
            <span className="cross-btn icon-close" data-dismiss="modal"></span>
          </button>
          <a href="/grand-loreal-sale" target="_blank">
            <img src={LandingPopupImage} alt="landingImage" />
          </a>
        </div>
      </Modal>
    </>
  );
};

export default LandingPageModal;
