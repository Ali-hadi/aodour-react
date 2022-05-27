import React from "react";
import { Link } from "react-router-dom";
export default function CategoryList({ Title, List, onClick }) {
  return (
    <>
      <div className="widget_links border-b">
        <h5 className="widget_title">{Title}</h5>
        <div className="accordian-div">
          <ul className="">
            {List && List.map(({ url, name, count, className }) => (
              <li className={className} onClick={onClick ? onClick : () => {}}>
                <Link to={url} >
                  {name} ({count}) <span></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
