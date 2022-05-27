import React from "react";
import {  useDispatch } from "react-redux";
import PriceFilter from "../PriceFilter";
import Features from "../SubCategory&Brand/Features";
export default function LeftSection({
  priceFilter,
  range,
  setPriceFilter,
  setAppliedFeature,
  Selectedbrand,
  brandPageCategoryList,
  setSelectedCategory,
  selectedCategory,
  brandFeatures,
  id,
  setPage,
  ApplyFeature,
  getFeatures,
  appliedFeature,
  allBrands,
  selectedBrands,
  applyBrand,
}) {

  const dispatch = useDispatch();
  return (
    <>
      <div className="side_widgets widget_filter">
        <div className="widget_links">
          <h6 className="widget_title ">
            <span className="title-s">{Selectedbrand.name}</span> <i className="icon-plus"></i>
          </h6>
          <div className="accordian-div">
            <ul className="">
              <li>
                <span
                  onClick={() => {
                    setSelectedCategory(-1);
                    setAppliedFeature(() => []);
                    getFeatures(0);
                  }}
                >
                  See All <span></span>
                </span>
              </li>
              {brandPageCategoryList.map(Category => (
                <li className={selectedCategory===Category.category_id?'selected':''}>
                  <span
                    onClick={() => {
                      setSelectedCategory(Category.category_id);
                      setAppliedFeature(() => []);
                      getFeatures(Category.category_id);
                    }}
                  >
                    {Category.category_name} <span>({Category.total})</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <Features applyBrand={applyBrand} allBrands={allBrands} selectedBrands={selectedBrands} featureList={brandFeatures} ApplyFeature={ApplyFeature} appliedFeature={appliedFeature} />

        <PriceFilter
          range={range}
          setPriceFilter={setPriceFilter}
          priceFilter={priceFilter}
          setPage={setPage}
        />
        {/* <OneColumsVerticalProducts /> */}
      </div>
    </>
  );
}
