import React from "react";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";

export default function FilterModal({ isOpen, onClose, sort, setSort }) {
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
          className="model_sort_widget"
          onRequestClose={() => onClose(false)}
          shouldCloseOnOverlayClick={true}
        >
          <span
            className="cross-btn icon-close"
            onClick={() => onClose(false)}
          ></span>
          {/*CLOSE BUTTON*/}
          <h5>Sort</h5>
          <ul className="sort_menu">
            <li
              className={sort === "none" ? "active" : ""}
              onClick={() => {
                setSort("none");
                onClose(false);
              }}
            >
              {" "}
              Sort By:
            </li>
            <li
              className={sort === "rating" ? "active" : ""}
              onClick={() => {
                setSort("rating");
                onClose(false);
              }}
            >
              Sort by Rating
            </li>
            <li
              className={sort === "new_arrival" ? "active" : ""}
              onClick={() => {
                setSort("new_arrival");
                onClose(false);
              }}
            >
              Sort by New Arrival
            </li>
            <li
              className={sort === "low_to_high" ? "active" : ""}
              onClick={() => {
                setSort("low_to_high");
                onClose(false);
              }}
            >
              Sort by Price: low to high
            </li>
            <li
              className={sort === "high_to_low" ? "active" : ""}
              onClick={() => {
                setSort("high_to_low");
                onClose(false);
              }}
            >
              Sort by Price: high to low
            </li>
          </ul>
        </Modal>
      </CSSTransition>
    </>
  );
}
