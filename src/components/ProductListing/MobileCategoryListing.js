import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";
export default function CategoryList({ List, onClick }) {
  const [loading, setLoading] = useState(false);
  return (
    <>

      <ul>
        {List?.map(({ id, url, name, count, className, childrens }, key) => (
          <Sublisting
            key={id}
            id={id}
            url={url}
            className={`level-${key}`}
            name={name}
            count={count}
            classNames={className}
            childrens={childrens}
            onClick={onClick}

          />
        ))}
      </ul>
    </>
  );
}

const Sublisting = ({
  id,
  url,
  name,
  count,
  classNames,
  childrens,
  onClick,
}) => {
  const [open, setOpen] = useState(
    classNames?.toLowerCase().includes("selected")
  );
  const history = useHistory();
  return (
    <li className={`${classNames} nthlisting`} key={id}>
      <span>
        <span
          onClick={() => {
            if (onClick) onClick();
            // if (setLoading) setLoading();
            setTimeout(() => { if (url) history.push(url) }, 500)
            // if (url) history.push(url);
          }}
        >
          {name}
        </span>
        {childrens && childrens?.length > 0 && (
          <span
            onClick={() => setOpen((open) => !open)}
            className={open ? "icon-minus" : "icon-plus"}
            aria-hidden="true"
          ></span>
        )}
      </span>
      {childrens && childrens?.length > 0 && (
        <Collapse isOpen={open}>
          <CategoryList
            List={childrens}
            onClick={onClick}

          />
        </Collapse>
      )}
    </li>
  );
};