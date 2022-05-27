import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";
import "../../styles/SubCategory.css";
export default function CategoryList({ Title, List, onClick, style }) {
  const [open, setOpen] = useState(true);
  return (
    <>
      <div className="widget_links border-b">
        <h5 onClick={() => setOpen((state) => !state)} className="widget_title">
          {Title}{" "}
          <span
            className={open ? "icon-minus" : "icon-plus"}
            aria-hidden="true"
          ></span>
        </h5>
        <Collapse isOpen={open} style={style}>
          <div className="accordian-div">
            <ul className="">
              {List.map(({ url, name, count, className, childrens }) => (
                <li
                  className={className}
                  onClick={onClick ? onClick : () => {}}
                >
                  <Link to={url}>
                    {name} ({count}) <span></span>
                  </Link>
                  {childrens && subLisitng(childrens)}
                </li>
              ))}
            </ul>
          </div>
        </Collapse>
      </div>
    </>
  );
}

const subLisitng = (List) => {
  return (
    <ul className="listing_child">
      {List.map(({ url, name, count, className, childrens }) => (
        <li className={className}>
          <Link to={url}>
            {name} ({count}) <span></span>
          </Link>
          {childrens && subLisitng(childrens)}
        </li>
      ))}
    </ul>
  );
};
