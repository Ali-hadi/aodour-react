import React from "react";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";
import LeftBar from "./LeftBar";

export default function MobileLeftBarModal({
  category,
  isOpen,
  setIsOpen,
  SelectCategory,
  id,
}) {
  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="dialog"
        zIndex={1000}
      >
        <Modal
          className="Left_Bar_Modal_Mobile_Nav"
          onRequestClose={() => setIsOpen(false)}
          closeTimeoutMS={500}
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          shouldCloseOnOverlayClick={true}
        >
          <span
            className="cross-btn icon-close"
            onClick={() => setIsOpen(!true)}
          ></span>
          <span className="icon-left-chevron backbtn"></span>
          {/*CLOSE BUTTON*/}
          <LeftBar
            category={category}
            selectedCategoryId={id}
            SelectCategory={SelectCategory}
          />
        </Modal>
      </CSSTransition>
    </>
  );
}
