import React from "react";
import { Link } from 'react-router-dom';
import ReactOwlCarousel from 'react-owl-carousel'
import {BlogResponsive} from '../../util/responsive'
export default function Blog() {
  return (
    <>
      <div className="vblog">
        <div className="container-fluid">
          <div className="playblack">
            <Link to='/'  className="playbtn  at_bg">
              <i className="fa fa-play"></i>
            </Link>
          </div>
        </div>
      </div>

      <section>
        <div className="container-fluid">
          <div className="heading align-center">
            <h3 className="clr1">Latest Blog</h3>
            <p>
              brower the collection of our best selling and trending products
            </p>
          </div>
          <div className="list-blog">
            <div className="row">
            <ReactOwlCarousel
                lazyLoad={true}
                loop
                nav
                margin={10}
                responsive={BlogResponsive}
              >
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="list-style">
                  <div className="bg-img">
                    <div
                      style={{
                        backgroundImage: "url(/assets/images/list-img1.jpg)"
                      }}
                    ></div>
                  </div>
                  <div className="list-content">
                    <small>
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      19 Jan , 2020
                    </small>
                    <h6>
                      <Link to='/' >Banana and honey face pack</Link>
                    </h6>
                    <p>
                      ingredients mashed ripe banana 2tsp Raw honey or manuka
                      honey 1tsp lemon juice 2 or 3 drops directions pe..
                    </p>
                    <span>0 comments</span>
                    <div className="click-btn">
                      <Link to='/'  className="clr1">
                        <i className="icon-right" aria-hidden="true"></i>
                        read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
          </ReactOwlCarousel>
           </div>
          </div>
        </div>
      </section>
    </>
  );
}
