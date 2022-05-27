import React from "react";
import ProductCarousel from "../ProductCarouselTwo";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
export default function FlashSale({
  products: { today, tomorrow },
  responsive
}) {
  return (
    <>
      <section>
        <div className="container-fluid">
          <div className="heading align-center">
            <h3 className="clr1">Flash sale</h3>
            <p>
              brower the collection of our best selling and trending products
            </p>
          </div>
          <Tabs>
            <TabList>
              <Tab>Today</Tab>
              <Tab>Tomorrow</Tab>
            </TabList>
            <TabPanel>
              <ProductCarousel products={today} responsive={responsive} />
            </TabPanel>
            <TabPanel>
              <ProductCarousel products={tomorrow} responsive={responsive} />
            </TabPanel>
          </Tabs>

          {/* <ul className="tabs-center">
            <li className="active">
              <Link to='/' >today</Link>
            </li>
            <li>
              <Link to='/' >tomorrow</Link>
            </li>
          </ul>
          <div className="tab-content">
            <div className="tab-blog">
              <div className="row">
                <ProductCarousel
                  products={products}
                 
                  responsive={responsive}
                />
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
