import React from 'react'
import {Link} from 'react-router-dom';
export default function OneColumsVerticalProducts() {
    return (
        <>
        <div className="widget_listing">
          <div className="widget_heading">
            <h6>best saller</h6>
          </div>
          <div className="list-style widget-column col-xs-6">
            <div className="bg-img">
              <div
                style={{
                  backgroundImage: "url(extra-images/widget-list-img1.jpg)"
                }}
              ></div>
            </div>
            <div className="list-content">
              <h6>
                <Link to='/' >Art Deco Long Wear Concealer (18 Soft Peach)</Link>
              </h6>
              <p>Product Code:DHS4052136059144</p>
              <span>Rs.1650</span>
            </div>
          </div>
          <div className="list-style widget-column col-xs-6">
            <div className="bg-img">
              <div
                style={{
                  backgroundImage: "url(extra-images/widget-list-img1.jpg)"
                }}
              ></div>
            </div>
            <div className="list-content">
              <h6>
                <Link to='/' >Art Deco Long Wear Concealer (18 Soft Peach)</Link>
              </h6>
              <p>Product Code:DHS4052136059144</p>
              <span>Rs.1650</span>
            </div>
          </div>
          <div className="list-style widget-column col-xs-6">
            <div className="bg-img">
              <div
                style={{
                  backgroundImage: "url(extra-images/widget-list-img1.jpg)"
                }}
              ></div>
            </div>
            <div className="list-content">
              <h6>
                <Link to='/' >Art Deco Long Wear Concealer (18 Soft Peach)</Link>
              </h6>
              <p>Product Code:DHS4052136059144</p>
              <span>Rs.1650</span>
            </div>
          </div>
        </div>
        </>
    )
}
