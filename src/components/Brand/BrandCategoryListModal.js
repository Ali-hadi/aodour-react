import React from "react";
import { CSSTransition } from "react-transition-group";
import Modal from "react-modal";

export default function BrandCategoryListModal({isOpen,onClose,brandPageCategoryList, selectedCategory, getFeatures,setSelectedCategory, setAppliedFeature}) {
  return (
    <>
      <CSSTransition
        in={isOpen}
        timeout={300}
        classNames="dialog"
        zIndex={1000}
        
      >
        <Modal
          onRequestClose={() => onClose(false)}
          closeTimeoutMS={500}
          isOpen={isOpen}
          className="Left_Bar_Modal_Mobile_Nav"
          onRequestClose={() => onClose(false)}
          shouldCloseOnOverlayClick={true}
        >
          <span className="cross-btn icon-close" onClick={()=>onClose(!true)}></span>{/*CLOSE BUTTON*/}
          <span className="icon-left-chevron backbtn"></span>
          <div className="side_widgets">
            {brandPageCategoryList.map(Category => (
                <li className={selectedCategory===Category.category_id?'selected':''}>
                    <span
                    onClick={() => {
                        setSelectedCategory(Category.category_id);
                        setAppliedFeature(() => []);
                        getFeatures(Category.category_id);
                    }}
                    >
                    {Category.category_name} <span>({Category.total})</span>
                    </span>
                </li>
                ))}

            <div className="divider-30"></div>
          </div>
        </Modal>
      </CSSTransition>
    </>
  );
}
