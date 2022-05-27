import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ProductCarousel from "../ProductCarouselOne";
export default function MainTab({
  products: { newArrival, bestSellerProducts },
  responsive
}) {
  return (
    <>
      <section className="padding40x">
        <div className="container-fluid">
          <Tabs>
            <TabList>
              <Tab>New Arrivals</Tab>
              {bestSellerProducts.length > 0 && <Tab>Trending Goodies</Tab>}
            </TabList>

            <TabPanel>
              {/*Tab content*/}
              <div className="tab-content">
                <div className="tab-blog">
                  <div className="slider_4x owl-theme">
                    <ProductCarousel
                      products={newArrival}
                      responsive={responsive}
                    />
                  </div>
                </div>
              </div>
              {/*Tab content ends*/}
            </TabPanel>

            {bestSellerProducts.length > 0 && (
              <TabPanel>
                {/*Tab content*/}
                <div className="tab-content">
                  <div className="tab-blog">
                    <div className="slider_4x owl-theme">
                      <ProductCarousel
                        products={bestSellerProducts}
                        responsive={responsive}
                      />
                    </div>
                  </div>
                </div>
                {/*Tab content ends*/}
              </TabPanel>
            )}
          </Tabs>
        </div>
      </section>
    </>
  );
}
