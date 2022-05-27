import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import HowToUse from "./HowToUse";
import Description from "./Description";
import Reviews from "./Reviews";
import Questions from "./Questions";
import AskQuestionModel from "./AskQuestionModel";
import WriteReviewModel from "./WriteReviewModel";
import {
  GET_PRODUCT_QUESTIONS,
  GET_PRODUCT_REVIEWS,
} from "../../constants/actionTypes";

const BottomSection = ({ selectedProduct, product, varSlug }) => {
  const [isAskQuestionOpen, setAskQuestionOpen] = useState(false);
  const [isWriteReviewOpen, setWriteReviewOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [questions, setQuestions] = useState([]);

  const { productReviews, productQuestions } = useSelector((state) => state);

  const dispatch = useDispatch();

  const emptyStates = () => {
    setAskQuestionOpen(false);
    setWriteReviewOpen(false);
    setReviews([]);
    setQuestions([]);
  };

  useEffect(() => {
    dispatch({ type: GET_PRODUCT_QUESTIONS, slug: varSlug });
    dispatch({ type: GET_PRODUCT_REVIEWS, slug: varSlug });
    return emptyStates();
  }, [varSlug]);

  useEffect(() => {
    setReviews(productReviews);
  }, [productReviews]);

  useEffect(() => {
    setQuestions(productQuestions);
  }, [productQuestions]);

  const getStars = () => {
  let avgRating = getAvgRating()
    let stars = [];
    for (let i = 0; i < avgRating; i++) {
      if(i + 1 > avgRating){
        stars.push(
          <li>
            <i className="fa fa-star-half-o" aria-hidden="true"></i>
          </li>
        );
      }else{
      stars.push(
        <li>
          <i className="fa fa-star" aria-hidden="true"></i>
        </li>
      );
      }
    }
    return stars;
  };

  const getReviewsCountByNumber = (number = 1) =>{
    if(reviews && reviews.length > 0){
     return reviews.filter(item => item.rating == number).length
    }
    return 0
  }

  const getReviewsbarValue = (number = 1)=>{
    if(reviews && reviews.length > 0){
      return getReviewsCountByNumber(number) / reviews.length * 100 
    }
    return 0
  }

  const getAvgRating = () =>{
    if(reviews && reviews.length > 0){
      let totalStars = reviews.reduce((a, b) => +a + +b.rating, 0)
     return (totalStars / reviews.length).toFixed(1)
    }
    return 5
  }

  return (
    <>
      <div className="reponsive_padding">
        <div className="container-fluid custom-padding">
          {/* <div className="rating-blog float-left mb20-r">
            <ul className="rating">{getStars().map((star) => star)}</ul>
            <span className="rate_result underline">{`${reviews.length} ${
              reviews.length === 1 ? "Review" : "Reviews"
            }`}</span>
          </div> */}
          
          {/* <div className="float-right"> */}
            {/* <button
              className="border-btn"
              onClick={() => {
                setWriteReviewOpen(true);
              }}
            >
              Write A Review<span></span>
            </button> */}
            {/* <button
              className="border-btn"
              onClick={() => {
                setAskQuestionOpen(true);
              }}
            >
              Ask A Question<span></span>
            </button> */}
          {/* </div> */}

          <div className="customer-review">
            <h4 className="box-reviw"><span>{getAvgRating()}</span><span>Out of 5</span></h4>
            <div className="for-mobile">
              <h6>{`${reviews.length} ${ reviews.length === 1 ? "Review" : "customer Reviews"}`}</h6>
              
                <ul className="rating">{getStars().map((star) => star)}</ul>
                <button
                  className="btn-normal at_bg3"
                  onClick={() => {
                    setWriteReviewOpen(true);
                  }}
                >
                  Write A Review<span></span>
                </button>
            </div>
            <div className="rating_content">
              <div className="pull-left for-desktop">
                <h6>{`${reviews.length} ${ reviews.length === 1 ? "Review" : "customer Reviews"}`}</h6>
                
                  <ul className="rating min-w-70">{getStars().map((star) => star)}</ul>
                  <button
                    className="btn-normal at_bg3"
                    onClick={() => {
                      setWriteReviewOpen(true);
                    }}
                  >
                    Write A Review<span></span>
                  </button>
              </div>
              <div className="pull-left width-custom">
                <ul className="rating_statics">
                  <li><span>5<i className="fa fa-star" aria-hidden="true"></i></span><div className="progressbar" ><div style={{width: `${getReviewsbarValue(5)}%`}} className="progress" ></div></div><span>({getReviewsCountByNumber(5)})</span></li>
                  <li><span>4<i className="fa fa-star" aria-hidden="true"></i></span><div className="progressbar" ><div style={{width: `${getReviewsbarValue(4)}%`}} className="progress" ></div></div><span>({getReviewsCountByNumber(4)})</span></li>
                  <li><span>3<i className="fa fa-star" aria-hidden="true"></i></span><div className="progressbar" ><div style={{width: `${getReviewsbarValue(3)}%`}} className="progress" ></div></div><span>({getReviewsCountByNumber(3)})</span></li>
                  <li><span>2<i className="fa fa-star" aria-hidden="true"></i></span><div className="progressbar" ><div style={{width: `${getReviewsbarValue(2)}%`}} className="progress" ></div></div><span>({getReviewsCountByNumber(2)})</span></li>
                  <li><span>1<i className="fa fa-star" aria-hidden="true"></i></span><div className="progressbar" ><div style={{width: `${getReviewsbarValue(1)}%`}} className="progress" ></div></div><span>({getReviewsCountByNumber(1)})</span></li>
                </ul>
              </div>
            </div>
          </div>

          <Tabs>
            <TabList className="tab_btn">
              <Tab>
                <span>Description</span>
              </Tab>
              <Tab>
                <span>How To Use</span>
              </Tab>
              <Tab>
                <span>Reviews</span>
              </Tab>
              {/* <Tab>
                <span>Questions</span>
              </Tab> */}
            </TabList>
            <TabPanel>
              <Description selectedProduct={product} />
            </TabPanel>
            <TabPanel>
              <HowToUse selectedProduct={product} />
            </TabPanel>
            <TabPanel>
              <Reviews reviews={reviews} />
            </TabPanel>
            {/* <TabPanel>
              <Questions questions={questions} />
            </TabPanel> */}
          </Tabs>
        </div>
      </div>

      {/* <AskQuestionModel
        slug={varSlug}
        isOpen={isAskQuestionOpen}
        setIsOpen={setAskQuestionOpen}
      /> */}
      <WriteReviewModel
        slug={varSlug}
        isOpen={isWriteReviewOpen}
        setIsOpen={setWriteReviewOpen}
      />
    </>
  );
};

export default BottomSection;
