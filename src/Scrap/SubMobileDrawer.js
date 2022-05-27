import React from "react";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import MobileCategoryList from "../components/head/MobileCategoryList";
export default function SubMobileDrawer({
  isOpen,
  onClose,
  categories,
  selectCategory
}) {
  const relativeSubSubCategory = (SubSubCategory, SubCategory) => {
    return SubSubCategory.filter(item => {
      if (item.category_id === SubCategory) {
        return true;
      }
      return false;
    });
  };
  return (
    <>
      <Drawer
        width="70vw"
        handler={false}
        open={isOpen}
        onClose={() => onClose(false)}
        className="drawer1"
        placement="left"
        level={null}
      >
        <div className="cross-btn">
          <span
            className="icon-cancel"
            onClick={() => {
              onClose(false);
              //   setOpen(false);
            }}
          ></span>
        </div>
        <div className="side-heading">
          <div className="back-to-menu">
            <span
              className="icon-left-chevron"
              onClick={() => onClose(false)}
            ></span>
          </div>
          <h6>{selectCategory.name}</h6>
        </div>
        {categories.subcategories &&
          categories.subcategories.map(item => {
            if (item.category_id === selectCategory.id) {
              return (
                <MobileCategoryList
                  Name={item.name}
                  SubSubCategory={relativeSubSubCategory(
                    categories.subsubcategories,
                    item.id
                  )}
                  subCategory={item}
                  categories={categories.categories}
                />
              );
            }
            return null;
          })}
      </Drawer>
    </>
  );
}
