import React, { useState } from "react";
import Collapse from "@kunukn/react-collapse";

import "./TextTypeFilter.css";
export default function TextTypeFilter({ title, values, ApplyFilter, appliedFeature }) {
  const [isOpen, setisOpen] = useState(false);

  const isChecked = (value) => {
    
    for (let feature of appliedFeature) {
      if (feature.value === value.value) {
        return true;
      }
    }
    return false;
  }


  return (
    <>
      <div className="widget_links border-b">
        <h6
          className="widget_title "
          onClick={() => setisOpen(isOpen => !isOpen)}
        >
          {title}
          <span
            className={isOpen ? "icon-minus-1" : "icon-plus"}
            aria-hidden="true"
          ></span>
        </h6>
        <Collapse isOpen={isOpen} className="color_scroll collapse-css-transition">
          <div className="scroll-bar">

            {values.map((value, index) => {
              
              return(
              <div className="check_colors " key={index+value.value}>
                <input
                  onClick={() => ApplyFilter(value)}
                  id={index + value.value}
                  type="checkbox"
                  placeholder=""
                  name=""
                  value=""
                  checked={isChecked(value)}
                />
                <label htmlFor={index + value.value}>
                  <span className="bg1"></span>
                  {value.value}
                </label>
              </div>
            )})}
            </div>
        </Collapse>
      </div>
    </>
  );
}
