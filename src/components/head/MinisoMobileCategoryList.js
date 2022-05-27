import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";

export default function SubCategoryList({
  // Name,
  SubSubCategory,
  subCategory,
  // categories,

  Name,
  onSelectChange,
  categories,
  category,
  key,

}) {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const defaultRoute = history.location.pathname;
  const route = defaultRoute.trim().split("/").join(" ").split(" ");
  const submitRoute = route[1];
  // console.log(defaultRoute, "cjecosdkjfklsdnkjl");
  // console.log(submitRoute, "checking");
  const getCategorySlug = (subCategory) => {
    for (const category of categories) {
      if (category.id === subCategory.category_id) {
        return category.slug;
      }
    }
  };

  return (
    <ul className="sub-menu-plus" onClick={() => setOpen((open) => !open)}>
      <span>
        {Name}
        <span
          className={open ? "icon-minus" : "icon-plus"}
          aria-hidden="true"
        ></span>
      </span>
      <Collapse isOpen={open}>
        {categories &&
          categories.map((item) => (
            <div
              className="listing_light"
              key={item.id}
              onClick={()=>onSelectChange(item)}
              // to={`/${
              //   history.location.pathname === "/" ? "shop" : submitRoute
              // }/${getCategorySlug(subCategory)}/${item.slug}`}
            >
              <li>{item.name}</li>
            </div>
          ))}
      </Collapse>
    </ul>
  );
}
