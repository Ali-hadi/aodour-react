import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function NavBarCategoryMenu({
  categories,
  subCategories,
  subSubCategories,
}) {
  const [selectedCategory, SetSelectedCategory] = useState(categories.length > 0 ? categories[0]: {});

  const getCategorySlug = (subCategory) => {
    for (const category of categories) {
      if (category.id === subCategory.category_id) {
        return category.slug;
      }
    }
  };

  useEffect(() => {
    if(categories.length){
      SetSelectedCategory(categories[0])
    }
  }, [categories])

  const chunkify = (a, n, balanced) => {
    if (n < 2) return [a];

    var len = a.length,
      out = [],
      i = 0,
      size;

    if (len % n === 0) {
      size = Math.floor(len / n);
      while (i < len) {
        out.push(a.slice(i, (i += size)));
      }
    } else if (balanced) {
      while (i < len) {
        size = Math.ceil((len - i) / n--);
        out.push(a.slice(i, (i += size)));
      }
    } else {
      n--;
      size = Math.floor(len / n);
      if (len % size === 0) size--;
      while (i < size * n) {
        out.push(a.slice(i, (i += size)));
      }
      out.push(a.slice(size * n));
    }

    return out;
  };

  const SelectedCategorySubCates = () => {
    let temp1 = subCategories.filter(
      (cate) => cate.category_id === selectedCategory.id
    );
    let withcount = temp1.map((cat) => {
      cat = { ...cat, count: 0 };
      subSubCategories.map((subCat) => {
        if (subCat.category_id === cat.id) {
          cat.count++;
        }
      });
      return cat;
    });
    const chunks = chunkify(
      withcount.filter((cate) => cate.count > 0),
      3,
      true
    );
    const x = chunks.map((subCat, index) => {
      return (
        <div key={index} className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
          {index === 0 &&
            withcount
              .filter((cate) => cate.count < 1)
              .map((subCategory) => (
                <div key={subCategory.slug} className="list-column">
                  <Link to={`/subcategory/${subCategory.slug}`}>
                    <h6>{subCategory.name}</h6>
                  </Link>
                </div>
              ))}
          {subCat.map((subCategory) => {
            if (subCategory.category_id === selectedCategory.id) {
              return (
                <div key={subCategory.slug} className="list-column">
                  <Link to={`/subcategory/${subCategory.slug}`}>
                    <h6>{subCategory.name}</h6>
                  </Link>
                  <ul className="list">
                    {subSubCategories.map((subSubCategory) => {
                      if (subSubCategory.category_id === subCategory.id) {
                        return (
                          <li key={subSubCategory.slug}>
                            <Link
                              to={`/shop/${getCategorySlug(subCategory)}/${
                                subSubCategory.slug
                              }`}
                            >
                              {subSubCategory.name}
                            </Link>
                          </li>
                        );
                      }
                    })}
                  </ul>
                </div>
              );
            }
          })}
        </div>
      );
    });
    return x;
  };

  return (
    <>
      <Link to="/">Products</Link>
      {/*
        ==================
            MEGA-MENU
        ==================
        */}
      <div className="mega-menu">
        <div className="mega-content">
          {/*
        ================================
            MEGA-MENU LEFT SIDE LIST
        ================================
        */}
          <ul className="nav nav-list">
            {categories.map((item) => (
              <li
                key={item.id}
                className={selectedCategory.id === item.id ? "active" : ""}
                onMouseOver={() => SetSelectedCategory(item)}
              >
                {/* "active" for Active Class*/}
                <Link to={`/shop/${item.slug}`}> {item.name} </Link>
              </li>
            ))}
          </ul>
          {/*
            =====================================
                MEGA-MENU LEFT SIDE LIST ENDS
            =====================================
            */}
          <div className="tab-mega">
            <div className="row">
              {/*
            ==================================
                LISTING AREA
            ==================================
            */}
              <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                <div className="row">
                  {/*
                =============================
                    MEGA-MENU LIST COLUMN   TGUS US KSK
                =============================
                */}
                  {SelectedCategorySubCates()}
                </div>
                {/*
                ==================================
                ROW ENDS
                ==================================
                */}
              </div>
              {/*
                ==================================
                LISTING AREA ENDS
                ==================================
                */}

              {/*
                ==================================
                PICTURES ADDS AREA
                ==================================
                */}
              <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12 ">
                <div className="list-column mb20">
                  <figure>
                    <a
                      href="https://www.aodour.pk/brand/neutrogena/hydro-boost-eye-refreshing-cream-gel"
                      target="_blank"
                    >
                      <img
                        src="https://storage.googleapis.com/aodour_v1/website/1.jpg"
                        alt="neutrogena"
                      />
                    </a>
                  </figure>
                </div>
                <div className="list-column mb20">
                  <figure>
                    <a
                      href="https://www.aodour.pk/brand/focallure/capsule-kit"
                      target="_blank"
                    >
                      <img
                        src="https://storage.googleapis.com/aodour_v1/website/2.jpg"
                        alt="focallure"
                      />
                    </a>
                  </figure>
                </div>
                {/* <div className="align-center">
                  <Link to="/"  className="btn-transparent clr1">
                    value & gift sets
                  </Link>
                </div> */}
              </div>
              {/*
                ==================================
                PICTURES ADDS AREA ENDS
                ==================================
                */}
            </div>
          </div>
        </div>
      </div>
      {/*
            ==================
            MEGA-MENU ENDS
            ==================
            */}
    </>
  );
}
