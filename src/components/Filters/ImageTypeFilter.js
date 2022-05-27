import React, { useState } from "react";
import Collapse from "@kunukn/react-collapse";
import "./TextTypeFilter.css";
export default function TextTypeFilter({ title, values, ApplyFilter }) {
  const [isOpen, setisOpen] = useState(false);

  return (
    <>
      <div className="widget_links border-b">
        <h6
          className="widget_title"
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
            {values.map((value, index) => (
              <div className="check_colors ">
                <input
                  onClick={() => ApplyFilter(value)}
                  id={index + value.alt}
                  type="checkbox"
                  placeholder=""
                  name=""
                  value=""
                />
                <label htmlFor={index + value.alt}>
                  <span style={{backgroundImage:`url(${value.image})`}}></span>
                  {value.alt}
                </label>
              </div>
            ))}
            </div>
        </Collapse>
      </div>
    </>
  );
}
