import React from "react";
import { useDispatch } from "react-redux";
import PriceFilter from "../PriceFilter";
import CategoryList from "./CategoryListing";
import Filter from "../Filters/Filter";
import Features from "./Features";

export default function LeftSection({
  subcategories,
  subsubcategories,
  subSlug,
  priceFilter,
  range,
  setPriceFilter,
  setSelectedCategory,
  setPage,
  subcategoryFeatures,
  ApplyFeature,
  setAppliedFeature,
  appliedFeature,
  subSubSlug,
  allBrands,
  selectedBrands,
  applyBrand,
  CategoryListing,
}) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="side_widgets widget_filter">
        {React.cloneElement(CategoryListing, {
          onClick: () => {
            setPage(0);
          },
        })}
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
          setPage={setPage}
        />

        <div className="divider-30"></div>
        {/* <OneColumsVerticalProducts /> */}
      </div>
    </>
  );
}
