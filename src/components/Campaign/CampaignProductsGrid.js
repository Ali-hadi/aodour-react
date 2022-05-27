import React, { useState, useEffect } from 'react';
import CampaignProductCard from './CampaignProductCard';
import AddToCartModal from '../AddToCartModel';
import InfiniteScroll from 'react-infinite-scroll-component';

import ReactOwlCarousel from "react-owl-carousel";

const defaultResponsive = {
  0: {
    items: 2,
  },
  480: {
    items: 3,
  },
  767: {
    items: 4,
  },
  1000: {
    items: 5,
  },
};

const CampaignProductsGrid = ({ title, products, infiniteScroll, responsive,live_session }) => {
  const resp = responsive || defaultResponsive;


  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [items, setItems] = useState([])


  useEffect(() => {
    fetchMoreData();
  }, [products])

  const openCartModal = product => {
    setSelectedProduct(product);
    setIsCartModalOpen(true);
  }

  const fetchMoreData = () => {
    const temp = products.slice(0, items.length + 70);
    setItems(temp);
  }


  return (
    <>

      <div className="container-fluid">
        <div className="heading eid-title align-center">
            <h3>{ title }</h3>
          </div>
        <div className="columns_groups">
          {infiniteScroll ?
            <InfiniteScroll
              dataLength={items.length}
              next={fetchMoreData}
              hasMore={true}
            >
              {
                items.length > 0 ?
                items.map(product => <div className="col-md-3 col-sm-6 col-xs-6"><CampaignProductCard product={product} openCartModal={openCartModal} /></div>)
                : live_session ? <div className="empty-div"><h4>We will be live on 6pm for amazing discount offers
                Stay Tuned</h4></div> : null
              }
            </InfiniteScroll>
            :
            <div className="slider_nav">
              {products && products.length > 0 && (
                <ReactOwlCarousel
                  lazyLoad={true}
                  loop
                  nav
                  margin={10}
                  responsive={resp}
                >
                  {
                    products.map(product => <CampaignProductCard product={product} openCartModal={openCartModal} />)
                  }
                </ReactOwlCarousel>)}
            </div>


          }

        </div>
      </div>

      <AddToCartModal
        isOpen={isCartModalOpen}
        setIsOpen={setIsCartModalOpen}
        selectedProduct={{ ...selectedProduct, qty: 1 }}
      />

    </>
  )
}

export default CampaignProductsGrid
