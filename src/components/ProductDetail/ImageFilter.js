import React from "react";

export default function ImageFilter({
  id,
  title,
  values,
  selectedProduct,
  setSelectedProduct,
  setSelectedOptions,
  getFilterValue,
  onFilterChange,
}) {
  const selectedValue = () => {
    const value = values.find(
      ({ value, alt, productVariationId }) =>
        selectedProduct.id === productVariationId
    );
    if (value) return value.alt;
    return "";
  };
  return (
    <>
      <div className="colors_codes" key={Math.random() * Math.floor(1000)}>
        <h6 className="p-title">
          {title}:{values.length > 0 && selectedValue()}
        </h6>
        <ul className="colors_col">
          {values.length > 0 &&
            values.map(({ value, alt, productVariationId }, index) => (
              <li
                key={index}
                onClick={({ target: { src } }) => {
                  onFilterChange(id, value, "image", alt);
                }}
                className={
                  selectedProduct.id === productVariationId
                    ? "selected_image_attribute"
                    : ""
                }
              >
                <img
                  src={`${value}`}
                  alt={alt}
                  title={alt}
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}
