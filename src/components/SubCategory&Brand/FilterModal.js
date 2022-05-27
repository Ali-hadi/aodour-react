import React from "react";
import { CSSTransition } from "react-transition-group";
import PriceFilter from "../PriceFilter";
import Features from "./Features";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
export default function FilterModal({
  isOpen,
  onClose,
  range,
  setPriceFilter,
  priceFilter,
  subcategoryFeatures,
  ApplyFeature,
  appliedFeature,
  allBrands,
  selectedBrands,
  applyBrand,
  CategoryListing
}) {
  return (
    <>
   
        <Drawer
         width="70vw"
         handler={false}
         open={isOpen}
         onClose={() => onClose(false)}
         className="filterDrawer"
         placement="right"
         level={null}
        >
          <div>
            <div className="filter_blog">
              <span onClick={()=>onClose(false)}className="b_btn">Done</span>
              <b className="border-b"></b>
              {CategoryListing}
              <Features
                allBrands={allBrands}
                selectedBrands={selectedBrands}
                applyBrand={applyBrand}
                featureList={subcategoryFeatures}
                ApplyFeature={ApplyFeature}
                appliedFeature={appliedFeature}
              />
              <PriceFilter
                range={range}
                setPriceFilter={setPriceFilter}
                priceFilter={priceFilter}
              />
            </div>
          </div>
        </Drawer>
    
    </>
  );
}
