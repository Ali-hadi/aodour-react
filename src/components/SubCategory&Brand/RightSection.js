import React from "react";
import ReactPaginate from "react-paginate";
import { isMobile } from "react-device-detect";
import ProductGrid from "../ProductGrid";
import ShowMoreText from "react-show-more-text";
import ReactHtmlParser, { convertNodeToElement } from "react-html-parser";
const backgroundImage =
  "https://storage.googleapis.com/aodour_v1/website/slider-brand.jpg";
const transform = (node, index) => {
  if (node.type === "tag" && node.name === "pre") {
    node.name = "div";
    // console.log(node);
    return convertNodeToElement(node, index, transform);
  }
};

export default function RightSection({
  Data: { length, Products },
  viewLimit,
  setViewLimit,
  SetDiscount,
  setSort,
  setOpenSortModal,
  setOpenFilterModal,
  page,
  sort,
  SetPage,
  banner,
  title,
  description,
  cover,
  coverTextColor,
  grid,
  saleBanners,
  fromMiniso
}) {
  const pagination = length / viewLimit;
 
  return (
    <>
      <div className="content_area">
        {banner && banner.image && (
          <div
            className="picture_section"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <img className="opacity0" src={banner.image} alt={banner.title} />
            <div className="brand_content">
              {banner.title && (
                <h1 style={{ color: `#${coverTextColor}` }}>{banner.title}</h1>
              )}
              <p style={{ color: `#${coverTextColor}` }}>{cover}</p>
            </div>
          </div>
        )}
        {saleBanners && React.cloneElement(saleBanners, {})}
        {!isMobile && (
          <div className="content-topbar none">
            <div className="filter-title ">
              <h5>{title}</h5>
              <small>{length} items</small>
            </div>
            <div className="timeline_title">
              <div className="row">
                <div className="col-md-3">
                  <div className="pull-left">
                    <div className="selectric">
                      <select
                        onChange={({ target }) => setViewLimit(target.value)}
                      >
                        <option value={10}>View 10</option>
                        <option value={50}>View 50</option>
                        <option value={100}>View 100</option>
                        <option value={10000}>View All</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-2">
                  <div className="check_colors discount_check">
                    <input
                      type="checkbox"
                      name=""
                      value=""
                      id="check123"
                      onChange={() => SetDiscount((check) => !check)}
                    />
                    <label htmlFor="check123">
                      <span></span>Discount
                    </label>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="pull-right">
                    <form className="filter-list">
                      <div className="selectric">
                        <select
                          onChange={({ target }) => setSort(target.value)}
                        >
                          <option value="none">Sort By:</option>
                          <option value="rating">Sort by Rating</option>
                          <option value="new_arrival">
                            Sort by New Arrival
                          </option>
                          <option value="low_to_high">
                            Sort by Price: low to high
                          </option>
                          <option value="high_to_low">
                            Sort by Price: high to low
                          </option>
                        </select>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {isMobile && (
          <div className="filter-menu">
            <ul className="search_filters">
              <li>
                <div className="selection_bar">
                  <select onChange={({ target }) => setSort(target.value)}>
                    <option value="none">Sort By:</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="new_arrival">Sort by New Arrival</option>
                    <option value="low_to_high">Sort by Price: low to high</option>
                    <option value="high_to_low">Sort by Price: high to low</option>
                  </select>
                </div>
              </li>
              <li>
                <div className="check_colors mobile_check">
                  <input
                    type="checkbox"
                    name=""
                    value=""
                    id="check123"
                    onChange={() => SetDiscount((check) => !check)}
                  />
                  <label htmlFor="check123">
                    <span></span>Discount
                  </label>
                </div>
              </li>
              <li onClick={() => setOpenFilterModal(true)}>
                <span>
                  <i className="fa fa-filter" aria-hidden="true"></i>filter
                </span>
              </li>
            </ul>
          </div>
        )}
        <div className="thumbnail-blog">
          {grid ? (
            React.cloneElement(grid, { products: Products, fromMiniso: fromMiniso })
          ) : (
            <ProductGrid Products={Products} fromMiniso={fromMiniso} />
          )}
        </div>
      </div>

      {!isMobile && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pagination}
          initialPage={0}
          marginPagesDisplayed={3}
          pageRangeDisplayed={5}
          onPageChange={(value) => {
            SetPage(value.selected);
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
          forcePage={page}
          breakClassName={"pagination_item"}
          breakLinkClassName={"pagination_link"}
          containerClassName={"pagination_conainter"}
          pageClassName={"pagination_item"}
          pageLinkClassName={"pagination_link"}
          previousClassName={"previous_page"}
          previousLinkClassName={"pagination_link"}
          nextClassName={"next_page"}
          nextLinkClassName={"pagination_link"}
          activeClassName={"active"}
        />
      )}
      <div className="category_caption">
        <ShowMoreText
          /* Default options */
          lines={2}
          more="Show more"
          less="Show less"
          expanded={false}
          anchorclassName="text-primary-color"
        >
          {ReactHtmlParser(description, { transform })}
        </ShowMoreText>
      </div>
    </>
  );
}
