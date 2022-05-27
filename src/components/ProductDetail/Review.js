import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import moment from 'moment';

const Review = ({ productReview }) => {
  
  const { userName, ageGroup, skinType, rating, title, review, date } = productReview;
  
  // const [stars, setStars] = useState([]);

  // useEffect(() => {
  //   for (let i = 0; i < rating; i++) {
  //     stars.push()
  //   }
  // })

  return (
    <div className="review_column">
      <div className="row">
        <div className="col-md-3">
          <div className="post_review">
            <ol className="meta_bold">
              <li>
                <small>
                  { userName }
                </small>
              </li>
            </ol>
            <ul className="rating">
              
              {
                Array.apply(0, Array(rating)).map((x,i) => {
                  return(
                    <li>
                      <i
                        className="fa fa-star"
                        aria-hidden="true"
                      ></i>
                    </li>
                  );
                })
              }
            </ul>
            <ol className="meta_bold">
              <li>
                <span>
                  <small>Age:</small>{ ageGroup }
                </span>
              </li>
              <li>
                <span>
                <small>Skin Type:</small>{ skinType }
                </span>
              </li>
              <li>
                <span>
                  { moment(date).format('YYYY-MM-DD') }
                </span>
              </li>
            </ol>
          </div>
        </div>
        <div className="col-md-9">
          <div className="review-content">
            <h6>{ title }</h6>
            <p>
              { review }
            </p>
          </div>
          <div className="like_unlike">
            <small>Was this Review Helpful?</small>
            <Link to='/' >
              <i
                className="fa fa-thumbs-up"
                aria-hidden="true"
              ></i>
              0
            </Link>
            <Link to='/' >
              <i
                className="fa fa-thumbs-down"
                aria-hidden="true"
              ></i>
              0
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review;