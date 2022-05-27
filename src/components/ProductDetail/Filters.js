import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageFilter from "./ImageFilter";
import TextFilter from "./TextFilter";

let selectedOptions = [];

export default function Filters({
  filterList,
  selectedProduct,
  setSelectedProduct,
  product,
}) {
  const { varSlug } = useParams();

  const [customRerender, setCustomRerender] = useState({});

  const setSelectedOptions = (id, value, type, alt) => {
    const temp = selectedOptions.filter((option) => {
      return option.id !== id;
    });
    selectedOptions = [...temp, { id, value, type, alt }];
  };

  const getFilterValue = (optionId) => {
    let tempValue = "";
    let tempType = "";
    let tempAlt = "";
    selectedOptions.map(({ id, value, type, alt }) => {
      if (id === optionId) {
        tempValue = value;
        tempType = type;
        tempAlt = alt;
      }
    });
    setSelectedOptions(optionId, tempValue, tempType, tempAlt);
    return tempValue;
  };

  const onFilterChange = (id, value, type, alt) => {
    setSelectedOptions(id, value, type, alt);
    let filteredVariations = product.product_variations.filter((variation) => {
      let found = false;
      for (const attribute of variation.attributes) {
        if (
          attribute.attribute_id === id &&
          ((attribute.type === "image" && alt === attribute.alt) ||
            (attribute.type !== "image" && value === attribute.value))
        ) {
          found = true;
          break;
        }
      }
      return found;
    });

    for (const option of selectedOptions) {
      if (option.id === id) {
        continue;
      }

      let tempVariations = filteredVariations.filter((variation) => {
        for (const attr of variation.attributes) {
          if (
            attr.attribute_id === option.id &&
            (attr.value === option.value ||
              (attr.image === option.value && attr.alt === option.alt))
          ) {
            return true;
          }
        }
        return false;
      });

      if (tempVariations.length > 0) {
        filteredVariations = tempVariations;
      } else {
        setSelectedOptions(option.id, "", "", "");
      }
    }
    if (filteredVariations[0].id === selectedProduct.id) {
      setCustomRerender({});
    } else {
      setSelectedProduct(filteredVariations[0].id);
    }
  };

  useEffect(() => {
    const selectedVariationSlug = varSlug;
    let selectedVariation = "";

    if (selectedVariationSlug) {
      const selectedVariations = product.product_variations.filter(
        (variation) =>
          variation.product_variation_slug === selectedVariationSlug
      );
      selectedVariation = selectedVariations[0];
    } else {
      selectedVariation = product.product_variations[0];
    }

    if (!selectedVariation) {
      return;
    }

    selectedVariation.attributes.map(
      ({ type, value, image, alt, attribute_id, name }) => {
        // if (filter.id === attribute_id && filter.name === name && filter.type === type) {
        if (type === "image") {
          setSelectedOptions(attribute_id, image, type, alt);
        } else {
          setSelectedOptions(attribute_id, value, type, "");
        }
        // }
      }
    );
  }, [product]);

  return (
    <>
      {filterList.length > 0 &&
        filterList.map(({ id, name, values, type }, index) => {
          if (values.length > 0) {
            if (type === "image") {
              return (
                <ImageFilter
                  id={id}
                  key={index}
                  title={name}
                  values={values}
                  selectedProduct={selectedProduct}
                  setSelectedProduct={setSelectedProduct}
                  setSelectedOptions={setSelectedOptions}
                  getFilterValue={getFilterValue}
                  onFilterChange={onFilterChange}
                />
              );
            }
            return (
              <TextFilter
                id={id}
                title={name}
                values={values}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                setSelectedOptions={setSelectedOptions}
                getFilterValue={getFilterValue}
                onFilterChange={onFilterChange}
              />
            );
          }
        })}
    </>
  );
}
