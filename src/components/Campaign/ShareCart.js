import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import notification from "../Notification";
import "../../styles/Modal.css";
import Loader from "../Loader/compnentLoader";
export default function ShowWishlist({
  isOpen,
  closeModal,
  setIsOpen
}) {

  const [link, setlink] = useState('')

  const {
    cartList,
  } = useSelector((state) => state);


  useEffect(() => {
    if (isOpen) {
      let ids = cartList.map(item => item.id);
      let slug = window.btoa(ids.toString())
      setlink(`https://www.aodour.pk/checkout/${slug}`)
    }
  }, [isOpen])



  async function copyText() {
    /* Get the text field */
    try {
      await window.navigator.clipboard.writeText(link);
      notification({ message: 'Copied' })
    } catch (err) {
      notification({ message: 'Failed to copy!' })
    }
  }


  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={300}
        className="dialog boxlayout"
        zIndex={1000}
      >
        <Modal
          closeTimeoutMS={500}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          shouldCloseOnOverlayClick={true}
        >
          {/* <h1>Write Review</h1> */}

          <div className="modal-dialog" role="document">
            {/* <Loader loading={loading} /> */}
            <div className="modal-content">
              <div className="sharing_box">
                <div className="heading_boxx">
                  <h5>share WishList</h5>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <span
                      className="cross-btn icon-close"
                      data-dismiss="modal"
                    ></span>
                    {/* CLOSE BUTTON */}
                  </button>
                </div>
                {/* <div className="post_urls">
                  <figure><img src="https://storage.googleapis.com/aodour_v1/campaign/Feb/post.png" alt="img here" /></figure>
                  <div className="discription_box">
                    <h6>Aodour's Beloved Feb!</h6>
                    <p>Hey there, here is a crazy idea. Love me this Valentines & buy me these gifts too!? </p>
                  </div>
                </div>
                <div className="get_urls">
                  <input id="text-to-copy" type="text" disabled value={link} placeholder="xxxxxxxxxxxxxx" />
                  <button onClick={copyText} >Copy</button>
                </div> */}

              </div>
            </div>
          </div>
        </Modal>
      </CSSTransition>


    </>
  );
}
