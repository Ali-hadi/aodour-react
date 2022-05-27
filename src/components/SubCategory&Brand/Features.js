import React from "react";
import TextTypeFilter from "../Filters/TextTypeFilter";

const Features = ({
  featureList,
  ApplyFeature,
  appliedFeature,
  allBrands,
  selectedBrands,
  applyBrand,
}) => {
  return (
    <>
      {allBrands && allBrands.length > 1 ? (
        <TextTypeFilter
          title={"Brands"}
          values={allBrands}
          ApplyFilter={applyBrand}
          appliedFeature={selectedBrands}
        />
      ) : (
        <></>
      )}
      {featureList &&
        featureList.map(({ id, values, name }) => {
          if (values.length > 0) {
            return (
              <TextTypeFilter
                title={name}
                values={values}
                ApplyFilter={ApplyFeature}
                appliedFeature={appliedFeature}
              />
            );
          }
        })}
    </>
  );
};

export default Features;
