import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Review from './Review';

export default function Reviews({ reviews }) {
  const productReviews = reviews || [];
  const [rating, setRating] = useState('');
  const [skinType, setSkinType] = useState('');
  const [age, setAge] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sort, setSort] = useState('');

  const filterReviews = () => {
    let filteredReviews = reviews.map(review => review);
    if (rating !== '') {
      filteredReviews = filteredReviews.filter(review => review.rating.toString() === rating);
    }

    if (skinType !== '') {
      filteredReviews = filteredReviews.filter(review => review.skinType === skinType);
    }

    if (age !== '') {
      filteredReviews = filteredReviews.filter(review => review.ageGroup === age);
    }

    if (searchKeyword !== '') {
      filteredReviews = filteredReviews.filter(review => review.title.indexOf(searchKeyword) > -1 || review.review.indexOf(searchKeyword) > -1);
    }

    if (sort !== '') {
      switch (sort) {
        case 'rating':
          filteredReviews = filteredReviews.sort((a, b) => {
            if (a.rating > b.rating) return 1;
            if (a.rating < b.rating) return -1;
            return 0;
          })
          break;
          case 'newest':
            filteredReviews = filteredReviews.sort((a, b) => {
              if (moment(a.date) > moment(b.rating)) return 1;
              if (moment(a.date) < moment(b.rating)) return -1;
              return 0;
            })
            break;
          case 'oldest':
            filteredReviews = filteredReviews.sort((a, b) => {
              if (moment(a.date) < moment(b.rating)) return 1;
              if (moment(a.date) > moment(b.rating)) return -1;
              return 0;
            })
            break;
        default:
          break;
      }
    }

    return filteredReviews;
  }

  return (
    <div className="tab-element">
      <div className="filter_column">
        <h6>Filter Reviews</h6>
        <div className="sparator mb20"></div>
        <form>
          <div className="row">
            <div className="col-md-6 col-sm-6 col-xs-12">
              <div className="search-filter">
                <input type="text" value={searchKeyword} placeholder="Search Reviews" onChange={({ target: { value } }) => setSearchKeyword(value) } />
                <button type="submit">
                  <i className="icon-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-xs-12"></div>
            <div className="col-md-3 col-sm-3 col-xs-6">
              <div className="text-select">
                <select value={ rating } onChange={({ target: { value } }) => setRating(value) }>
                  <option value=''>Rating</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-6">
              <div className="text-select">
                <select value={age} onChange={({ target: { value } }) => setAge(value) }>
                  <option value=''>Age</option>
                  <option value='18-25'>18-25</option>
                  <option value='25-35'>25-35</option>
                  <option value='35-44'>35-44</option>
                  <option value='45-55'>45-55</option>
                  <option value='55+'>55+</option>
                </select>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-xs-6">
              <div className="text-select">
                <select value={skinType} onChange={({ target: { value } }) => setSkinType(value) }>
                  <option value=''>Skin Type</option>
                  <option value='Oily' >Oily</option>
                  <option value='Dry'>Dry</option>
                  <option value='Normal'>Normal</option>
                  <option value='Sensitive'>Sensitive</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="reviews_blog">
        <div className="row">
          <div className="col-md-12">
            <div className="review_padding">
              <div className="review_status">
                <h6 className="rate_result">{ productReviews.length } Reviews</h6>
              </div>
              <div className="selection_bar">
                <span>Sort:</span>
                <select value={sort} onChange={({ target: { value } }) => setSort(value)}>
                  <option value=''>None</option>
                  <option value='rating'>Rating</option>
                  <option value='newest'>Newest</option>
                  <option value='oldest'>Oldest</option>
                </select>
              </div>
            </div>
            {
              filterReviews().map((review) => (<Review productReview={ review } />))
            }
          </div>
        </div>
      </div>
    </div>
  )
}
