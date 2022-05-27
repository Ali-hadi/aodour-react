import React, { useState } from "react";
import InputRange from "react-input-range";
import Collapse from "@kunukn/react-collapse";
import "react-input-range/lib/css/index.css";
export default function PriceFilter({ range, setPriceFilter, priceFilter, setPage }) {
  const [isOpen, setisOpen] = useState(false);
  return (
    <>
      <div className="widget_links border-b">
        <h6
          className="widget_title"
          onClick={() => setisOpen(isOpen => !isOpen)}
        >
          Price
          <span
            className={isOpen ? "icon-minus-1" : "icon-plus"}
            aria-hidden="true"
          ></span>
        </h6>
        <Collapse isOpen={isOpen}>
          <div className="accordian-div range_slider">
            <InputRange
              allowSameValues={false}
              maxValue={range.upper}
              minValue={range.lower}
              max={range.upper}
              min={range.lower}
              onChange={setPriceFilter}
              // onChangeComplete={value => console.log(value)}
              onChangeStart={value => { if(setPage) setPage(0) }}
              value={priceFilter}
            />
          </div>
        </Collapse>
      </div>
    </>
  );
}
