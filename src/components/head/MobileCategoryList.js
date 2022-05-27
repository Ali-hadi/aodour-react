import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";

export default function SubCategoryList({
  Name,
  SubSubCategory,
  subCategory,
  categories,
  fromMiniso,
  onClose,
  setShow,
}) {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const defaultRoute = history.location.pathname;
  const route = defaultRoute.trim().split("/").join(" ").split(" ");
  const submitRoute = route[1];
  // console.log(defaultRoute, "cjecosdkjfklsdnkjl");
  // console.log(submitRoute, "checking");
  const getCategorySlug = (subCategory) => {
    if(categories && categories.length){
      for (const category of categories) {
        if (category.id === subCategory.category_id) {
          return category.slug;
        }
      }
    }else{
    return subCategory.slug
    }
  };

  const hideModal = () => {
    if(onClose && setShow){
    onClose(false)
    setShow(false)
    }
  }

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
        {SubSubCategory &&
          SubSubCategory.map((item) => (
            <Link
            onClick={hideModal}
              key={item.id}
              to={`/${
                fromMiniso ? 'miniso' : 'shop'
                // history.location.pathname === "/" ? "shop" : submitRoute
              }/${getCategorySlug(fromMiniso ? item : subCategory)}/${item.slug}`}
            >
              <li>{item.name}</li>
            </Link>
          ))}
      </Collapse>
    </ul>
  );
}
