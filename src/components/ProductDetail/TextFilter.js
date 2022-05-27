import React from "react";

export default function TextFilter({
  id,
  title,
  values,
  selectedProduct,
  setSelectedProduct,
  setSelectedOptions,
  getFilterValue,
  onFilterChange,
}) {
  // const findInValue=()=>{
  //   const indexofvalue=values.findIndex((value)=>(value.productVariationId==selectedProduct.id))
  //   if(indexofvalue>=0){
  //     return selectedProduct.id
  //   }
  //   return '';
  // }
  return (
    <>
      <div className="filter_float">
        <div className="select-dropdown">
          <div>{title}</div>
          <SelectBox values={values} onFilterChange={onFilterChange} getFilterValue={getFilterValue} id={id}/>
        </div>
      </div>
    </>
  );
}

const SelectBox = ({values,getFilterValue,id,onFilterChange}) => {
  return (
    // <select
    //   value={}
    //   onChange={({ target: { value } }) => {
    //     // setSelectedProduct(value)
    //     // setSelectedOptions(id, value);
    //     onFilterChange(id, value, "text", "");
    //   }}
    // >
    //   <option value="" disabled>
    //     Select....
    //   </option>
    //   {values.length > 0 &&
    //     values.map((item) => (
    //       <option value={item.value}>
    //         {item.value} {item.unitName}
    //       </option>
    //     ))}
    // </select>

    <div className="floating">
    
      {values.length > 0 &&
        values.map((item) => (
          <div className="select_buttons">
            <label>
            <input
              type="radio"
              name={`hello${id}`}
              
              checked={item.value === getFilterValue(id)}
              className={item.value === getFilterValue(id) ? "selected" : ""}
              value={` ${item.value} ${item.unitName}`}
              onChange={({ target: {checked } }) => {
                    // setSelectedProduct(value)
                    // setSelectedOptions(id, value);
                    if(checked)
                    onFilterChange(id, item.value, "text", "");
                  }}
            />
            
              <span>{item.value} {item.unitName}</span>
            </label>
          </div>
        ))}
    </div>
  );
};
