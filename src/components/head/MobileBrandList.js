import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Collapse from "@kunukn/react-collapse";

export default function SubCategoryList({ Name, brands }) {
  const [open, setOpen] = useState(false);
  return (
    <ul className="sub-menu-plus" onClick={() => setOpen(open => !open)}>
      <span>
        {Name}
        <span
          className={open ? "icon-minus" : "icon-plus"}
          aria-hidden="true"
        ></span>
      </span>
      <Collapse isOpen={open}>
        {brands && brands.map(item => (
          <Link  key={item.id} to={`/brand/${item.slug}`}  >
            <li>{item.name}</li>
          </Link>
        ))}
      </Collapse>
    </ul>
  );
}
