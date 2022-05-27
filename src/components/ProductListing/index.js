import React, { useState, useEffect } from "react";
import { isMobile } from "react-device-detect";
import LeftSection from "../SubCategory&Brand/LeftSection";
import RightSection from "../SubCategory&Brand/RightSection";
import FilterDrawer from "../SubCategory&Brand/FilterModal";
import { filterProducts } from "../../util";
import MobileCategoryListModal from "./MobileCategoryListModal";
export default function ProductListing({
  productData,
  RightSectionTitle,
  children,
  topTitle,
  MobileListing,
  fromMiniso
}) {
  const { products: AllProducts, banner, description, cover } = productData;
  const [products, setProducts] = useState([]);
  const [range, setRange] = useState({ lower: 0, upper: 10000 });
  const [priceFilter, setPriceFilter] = useState({
    min: range.lower,
    max: range.upper,
  });
  const [viewLimit, setViewLimit] = useState(10);
  const [sort, setSort] = useState("none");
  const [discount, SetDiscount] = useState(false);
  const [page, SetPage] = useState(0);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [appliedFeature, setAppliedFeature] = useState([]);
  const [features, setFeatures] = useState([]);

  //Mobile States//

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [openCategoryList, setOpenCategoryList] = useState(false);
  //Mobile States//

  useEffect(() => {
    // SetPage(0);
    setSelectedBrands([]);
    setAppliedFeature([]);
  }, [productData]);

  useEffect(() => {
    let brands = [];
    for (const product of AllProducts) {
      const found = brands.find(({ value }) => value === product.brandName);
      if (!found) {
        brands.push({ value: product.brandName });
      }
    }
    brands = brands.sort((a, b) => {
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
      return 0;
    });
    setAllBrands(brands);
    setProducts(AllProducts);
  }, [AllProducts]);

  useEffect(() => {
    let heigestPrice = 0;
    for (const { variations } of AllProducts) {
      for (const { price } of variations) {
        if (price > heigestPrice) heigestPrice = price;
      }
    }
    setRange((range) => ({ ...range, upper: heigestPrice }));
    setPriceFilter((price) => ({ min: 0, max: heigestPrice }));
  }, [AllProducts]);

  useEffect(() => {
    let allFeatures = [];
    for (const { features } of AllProducts) {
      for (const feature of features) {
        let index = allFeatures.findIndex((f) => f.id === feature.featureId);
        if (index > -1) {
          if (
            !allFeatures[index].values.find((v) => v.value === feature.value)
          ) {
            allFeatures[index].values.push({
              id: feature.featureValueId,
              value: feature.value,
            });
          }
        } else {
          allFeatures.push({
            id: feature.featureId,
            name: feature.name,
            values: [{ id: feature.featureValueId, value: feature.value }],
          });
        }
      }
    }

    setFeatures(allFeatures);
  }, [AllProducts]);

  const applyBrand = (value) => {
    setSelectedBrands((state) => {
      let index = -1;
      if (state.length < 1) {
        return [value, ...state];
      }

      state.map((item, i) => {
        if (item.value === value.value) {
          index = i;
        }
      });

      return index === -1
        ? [value, ...state]
        : state.filter((item, i) => {
            return index !== i;
          });
    });
    SetPage(0);
  };

  const ApplyFeature = (value) => {
    setAppliedFeature((state) => {
      let index = -1;
      if (state.length < 1) {
        return [value, ...state];
      }

      state.map((item, i) => {
        if (item.value === value.value) {
          index = i;
        }
      });

      return index === -1
        ? [value, ...state]
        : state.filter((item, i) => {
            if (index !== i) {
              return true;
            }
          });
    });
    SetPage(0);
  };

  useEffect(() => {
    SetPage(0);
  }, [viewLimit]);

  const filter = () => {
    return filterProducts(
      products,
      priceFilter,
      page,
      isMobile ? 10000 : viewLimit,
      sort,
      appliedFeature,
      selectedBrands,
      discount
    );
  };
 
  return (
    <>
      {/*Mobile  Category Button Modal*/}
      <div
        className="menu_button"
        onClick={() => setOpenCategoryList((state) => !state)}
      >
        <span className="filter_btn">
          {MobileListing.title } <i className="fa fa-angle-down"></i>
        </span>
      </div>
      {/*Mobile  Category Button Modal*/}
      <div className="content">
        <div className="rtl-content">
          <div className="container-fluid">
            <div className="row">
              {!isMobile && (
                <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                  <LeftSection
                    range={range}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                    setAppliedFeature={setAppliedFeature}
                    appliedFeature={appliedFeature}
                    setPage={SetPage}
                    subcategoryFeatures={features}
                    ApplyFeature={ApplyFeature}
                    allBrands={allBrands}
                    selectedBrands={selectedBrands}
                    applyBrand={applyBrand}
                    CategoryListing={children.length ? children[0] : children}
                  />
                </div>
              )}
              <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12">
                <RightSection
                  sort={sort}
                  Data={filter()}
                  fromMiniso={fromMiniso}
                  viewLimit={viewLimit}
                  setViewLimit={setViewLimit}
                  setSort={setSort}
                  SetDiscount={SetDiscount}
                  SetPage={SetPage}
                  page={page}
                  setOpenFilterModal={setOpenFilterModal}
                  // setOpenSortModal={setOpenSortModal}
                  banner={banner}
                  title={RightSectionTitle}
                  description={description}
                  cover={cover ? cover.cover : ""}
                  coverTextColor={cover ? cover.color : ""}
                  grid={children[1]}
                  saleBanners={children[2]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileCategoryListModal
        MobileListing={MobileListing}
        isOpen={openCategoryList}
        onClose={() => setOpenCategoryList(false)}
      />
      <FilterDrawer
        onClose={setOpenFilterModal}
        isOpen={openFilterModal}
        range={range}
        setPriceFilter={setPriceFilter}
        priceFilter={priceFilter}
        subcategoryFeatures={features}
        ApplyFeature={ApplyFeature}
        appliedFeature={appliedFeature}
        allBrands={allBrands}
        selectedBrands={selectedBrands}
        applyBrand={applyBrand}
        // CategoryListing={children.length ? children[0] : children}
      />
    </>
  );
}
