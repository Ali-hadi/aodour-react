import React from "react";
import ImageTypeFilter from "./ImageTypeFilter";
import TextTypeFilter from "./TextTypeFilter";
export default function Filter({ filterList, ApplyFilter }) {
  return (
    <>
      {filterList.map(({ attribute_name, values, attribute_type }) => {
        if (values.length > 0) {
          if (attribute_type === "image") {
            return (
              <ImageTypeFilter
                title={attribute_name}
                values={values}
                ApplyFilter={ApplyFilter}
              />
            );
          }
          return (
            <TextTypeFilter
              title={attribute_name}
              values={values}
              ApplyFilter={ApplyFilter}
            />
          );
        }
      })}
    </>
  );
}
