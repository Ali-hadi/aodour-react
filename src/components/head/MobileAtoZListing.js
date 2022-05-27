import React, { useState } from "react";
import { Link } from "react-router-dom";
import Collapse from "@kunukn/react-collapse";

export default function SubCategoryList({ brands }) {
  const [open, setOpen] = useState(false);
  //   const [previous, setprevious] = useState("");

  const listbrand = () => {
    let elemnt = [];
    let i = 65,
      j = 91;
    for (let k = i; k < j; k++) {
      let Alphabet = String.fromCharCode(k);
      if (brands.find((brand) => brand.name.toUpperCase().startsWith(Alphabet)))
        elemnt.push(
          <>
            <a href={`#first_letter_${Alphabet}`}>{Alphabet}</a>
          </>
        );
    }
    return elemnt;
  };

  const brand =
    brands && brands.sort((a, b) => ("" + a.name).localeCompare(b.name));

  let previous = "/";
  return (
    <>
      <div className="A_to_z_Collapse">
        <ul className="sub-menu-plus" onClick={() => setOpen((open) => !open)}>
          <span>
            A-Z Brand
            <span
              className={open ? "icon-minus" : "icon-plus"}
              aria-hidden="true"
            ></span>
          </span>
          <Collapse isOpen={open}>
            {brand &&
              brand.map((item) => {
                if (!item.name.toUpperCase().startsWith(previous)) {
                  previous = item.name[0].toUpperCase();
                  return (
                    <Link
                      id={`first_letter_${item.name[0].toUpperCase()}`}
                      key={item.id}
                      to={`/brand/${item.slug}`}
                    >
                      <span className="letter_group">
                        {item.name[0].toUpperCase()}
                      </span>
                      <li>{item.name}</li>
                    </Link>
                  );
                }
                return (
                  <Link key={item.id} to={`/brand/${item.slug}`}>
                    <li>{item.name}</li>
                  </Link>
                );
              })}
          </Collapse>
        </ul>
        {open && <div className="alphabet">{brand && listbrand()}</div>}
      </div>
    </>
  );
}
