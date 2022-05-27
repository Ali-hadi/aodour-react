import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CAMPAIGN_LISTING, GET_11CAMPAIGN_FLASH_SALE, GET_11CAMPAIGN_LISTING } from "../constants/actionTypes";
import "../styles/compaign11.css";
import CampaignProductsGrid from "../components/Campaign/CampaignProductsGrid";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import ReactOwlCarousel from "react-owl-carousel";
import Loader from "../components/Loader/compnentLoader";
import moment from "moment"
import Modal from "react-modal"
import CountDown from "../components/countDown"
const Qa1 = "https://storage.googleapis.com/aodour_v1/campaign_images/q.png";
const Qa2 = "https://storage.googleapis.com/aodour_v1/campaign_images/q2.png";
const Qa3 = "https://storage.googleapis.com/aodour_v1/campaign_images/q3.png";
const Qa4 = "https://storage.googleapis.com/aodour_v1/campaign_images/q4.png";
const Qa41 = "https://storage.googleapis.com/aodour_v1/campaign_images/q41.png";
const Qa42 = "https://storage.googleapis.com/aodour_v1/campaign_images/q42.png";
const Qa43 = "https://storage.googleapis.com/aodour_v1/campaign_images/qa13.png";
const banner = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/banner_campaign.png";
const mbanner = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/mbanner_campaign.png";
const flashbanner = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/livesale.png";
const mobileflashbanner = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/mlivesale.png";
const quz_banner = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/quiz_banner.png";
const quz_banner_mobile = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/mquiz_banner.png";
// const mystery_banner = "https://storage.googleapis.com/aodour_v1/campaign_images/mysterybox.png";
// const mystery_banner_mobile = "https://storage.googleapis.com/aodour_v1/campaign_images/mobile_mystery.png";
const card = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/2nd_banner.png";
const mcard = "https://storage.googleapis.com/aodour_v1/campaign/new-year-sale/m2nd_banner.png";
const Freedelivery = "https://storage.googleapis.com/aodour_v1/campaign_images/freedelivery.png";
export default function Campaign(props) {


  // const banner = "https://storage.googleapis.com/aodour_v1/banners/othergoodiesWeb-Banners-4.jpg";
  // const banner_mobile = "https://storage.googleapis.com/aodour_v1/banners/othergoodiesMobiile-Banners-4.jpg";

  const dispatch = useDispatch();

  const {
    campaign11FlashSale: { products },
    campaign11,
    user,
    cartList
  } = useSelector((state) => state);

  const [selectedType, setSelectedType] = useState();
  const [qAns, setqAns] = useState({
    abc1: null,
    abc2: null,
    abc3: null,
    abc4: null,
  });
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [brand_products, setBrand_products] = useState([]);
  const [other_goodies_products, setOther_goodies_products] = useState([]);

  const [showOthers, setShowOthers] = useState(true);
  const [buy_1_get_1_free_products, setbuy_1_get_1_free_products] = useState([]);
  const [loading, setLoading] = useState(false);
  const [correctAns, setcorrectAns] = useState(null);


  const handleChangeQAns = (event) => {
    // console.log(event, 'event is the');
    if (event) {
      setqAns({ ...qAns, [event.target.name]: event.target.value })
    }
  }


  const onSubmitQuiz = async (e) => {
    e.preventDefault();
    if (correctAns !== 'no-show') {
      // if (user.id) {
        showcontratsModal(qAns)
      // } else {
      //   localStorage.setItem('quiz', JSON.stringify(qAns))
      //   props.history.push({
      //     pathname: '/login',
      //     state: {
      //       from: props.location ? props.location.pathname : '/',
      //       fromQuiz: true,
      //       search: ''
      //     }
      //   })
      // }
    }
  }


  const showcontratsModal = (quiz) => {
    if (correctAns != 'no-show') {
      let correct = 0
      for (const [i, ans] of ['c', 'b', 'b', 'a'].entries()) {
        // console.log(`${quiz[`abc${i + 1}`]}`, 'ans is this', ans);
        if (ans == `${quiz[`abc${i + 1}`]}`) correct++
      }
      setcorrectAns(correct);
      localStorage.removeItem('quiz')
      localStorage.setItem('gameDisc', correct * 50)
    }
  }

  useEffect(() => {
    setLoading(true);
    dispatch({
      type: GET_11CAMPAIGN_FLASH_SALE,
      callback: () => setLoading(false),
    });

    dispatch({
      type: GET_11CAMPAIGN_LISTING,
      callback: () => setLoading(false),
    });

    getQuizAns()
  }, []);


  useEffect(() => {
    getQuizAns()
  }, [user]);


  const getQuizAns = async () => {
    let qz = await localStorage.getItem('quiz');
    if (qz != null && user.id) {
      let quiz = JSON.parse(qz)
      showcontratsModal(quiz)
    } else {
      let gameDisc = await localStorage.getItem('gameDisc');
      if (gameDisc != null) {
        setcorrectAns('no-show')
      }
    }
  }


  useEffect(() => {
    if (campaign11.products) {
      if (campaign11.products.length > 0) {
        let cmp = campaign11.products[0];

        setBrand_products(cmp.brand_products)
        setbuy_1_get_1_free_products(cmp.buy_1_get_1_free_products)

      }
    }
  }, [campaign11])


  const responsive = {
    0: {
      items: 2,
    },
    767: {
      items: 4,
    },
    1366: {
      items: 5,
    },
  };
  const responsive2 = {
    0: {
      items: 1,
    },
    767: {
      items: 1,
    },
    1366: {
      items: 1,
    },
  };


  const getCampaignDays = () => {
    var check = moment();

    var month = check.format('M');
    var day = check.format('D');
    var year = check.format('YYYY');

    var a = moment([2020, 11, 4]); // testing 
    var a = moment([year, month, day]);
    var b = moment([2020, 11, 11]);
    let days = 9 + a.diff(b, 'days')
    // console.log(days, 'days tin d', a.diff(b, 'days'));

    days = days + 2;

    let sp = []
    while (days > 0) {
      days--
      sp.push('item')
    }
    return sp
  }

  return (
    <>
      <Helmet>
        <title>
          {"New Year Bling Sale Offer UPTO 70% Off | Free Delivery"}
        </title>
        <meta name="description" content={"Find new year exclusive deals and upto 70% discounted prices only at aodour.pk. So, Buy Original Online Products from aodour with free home delivery offer in all over Pakistan"} />
        <meta name="keywords" content={"New Year Bling Sale Offer UPTO 70% Off | Free Delivery"} />
      </Helmet>
      <Loader loading={loading} />

      <div className="wrapper">
        <div className="banners">
          <img className="desktop" src={banner} alt="img here" />
          <img className="mobile" src={mbanner} alt="img here" />
        </div>

        <div className="background_gry">
          <div className="theme_banners mb0">
              <img className="desktop" src={card} alt="img here" />
              <img className="mobile" src={mcard} alt="img here" />
          </div>

          {/* <div className="theme_banners">
            <div className="container-fluid">
              <img className="desktop" src={Freedelivery} alt="img here" />
              <img className="mobile" src={Freedelivery} alt="img here" />
            </div>
          </div> */}
          {/* <div className="theme_banners">
            <div className="container-fluid">
              <Link to={{
                pathname: "/login",
                state: {
                  from: props.location ? props.location.pathname : '/',
                  search: ''
                }
              }}
                className="desktop"><img src={Freedelivery} alt="img here" /></Link>
              <Link to={{
                pathname: "/login",
                state: {
                  from: props.location ? props.location.pathname : '/',
                  search: ''
                }
              }}
                className="mobile"><img src={Freedelivery} alt="img here" /></Link>
            </div>
          </div> */}

          {
            products && products.length > 0 &&

            (<div className="main-banner theme_banners mb-flash" >
              <div className="container-fluid">
                <figure>
                  <img className="desktop" src={flashbanner} alt="image here" />
                  <img className="mobile" src={mobileflashbanner} alt="image here" />
                  <div className="counter_dev">
                    <h4>Sale Clock down</h4>
                    <ul className="countdown_timer right-bottom">
                      {/* <CountDown timeTillDate={moment(products[0].discountEndTime).format('DD-MM-YYYY HH:mm:ss')} /> */}
                      <CountDown 
                      // timeTillDate={products[0].discountEndTime} 
                      timeTillDate="2020-12-30 19:00:00" 
                      />
                    </ul>
                  </div>
                </figure>
              </div>
            </div>)
          }

          {
            products && products.length > 0 &&
            (<>
              {/* <div className="for-mbo">
                <ul className="countdown_timer ">

                  Replace actual Date discountStartTime
                  <CountDown timeTillDate={moment(products[0].discountEndTime).format('DD-MM-YYYY HH:mm:ss')} />
                  <CountDown timeTillDate="2-12-2021 23:30:00" />
                </ul>
              </div> */}
              <div className="theme_pro hide-heading">
                {showOthers && (
                  <>
                    <CampaignProductsGrid lazyLoad={true} responsive={responsive}
                      products={products}
                      title=""
                    />

                  </>
                )}
                {/* <div className="middle-buttons"><Link to="/" className="btn-normal">shop more</Link></div> */}
              </div></>)}


          {
            brand_products && brand_products.map(item => (
              <>
                <div className="theme_banners">
                    <Link to={`/thousandsofproducts`} > <img className="desktop" src={item.webBanner} alt="brand banner" /> </Link>
                    <Link to={`/thousandsofproducts`} > <img className="Mobile" src={item.mobileBanner} alt="brand banner" /></Link>
                </div>
                {item.products && (
                  <div className="theme_pro hide-heading">
                    <>
                      <CampaignProductsGrid lazyLoad={true} responsive={responsive}
                        products={item.products}
                        title=""
                      />
                    </>
                    <div className="middle-buttons"><Link to={`/thousandsofproducts`} className="btn-normal">shop more</Link></div>
                  </div>
                )}

              </>
            ))
          }

          {/* {
            buy_1_get_1_free_products && buy_1_get_1_free_products.map(item => (
              <>
                <div className="theme_banners hide-heading">
                    <Link to={`/buy1get1free`}><img className="desktop" src={item.webBanner} alt="brand banner" /> </Link>
                    <Link to={`/buy1get1free`}><img className="Mobile" src={item.mobileBanner} alt="brand banner" /></Link>
                </div>
                {item.products && (
                  <div className="theme_pro hide-heading">
                    <>
                      <CampaignProductsGrid lazyLoad={true} responsive={responsive}
                        products={item.products}
                        title=""
                      />
                    </>
                    <div className="middle-buttons"><Link to={`/buy1get1free`} className="btn-normal">shop more</Link></div>
                  </div>
                )}
              </>
            ))
          } */}

          <div className="theme_banners">
              <img className="desktop" src={quz_banner} alt="brand banner" />
              <img className="Mobile" src={quz_banner_mobile} alt="brand banner" />
          </div>
          <div className="quizrules">
            <div className="container-fluid">
              <h4>rules to follow:</h4>
              <ol>
                <li><b>Answer the following questions.</b> You’ll <b>get Rs. 50</b> for answering each question correctly.</li>
                <li>The amount you <b>win i.e. Rs. 200</b> will automatically be deducted from your total <b>check out amount</b>.</li>
              </ol>
            </div>
          </div>
          <section className="background_gry">
            <div className="container-fluid">
              <form onSubmit={onSubmitQuiz} className="mb30">
                <div className="question_column">
                  <img src={Qa1} alt="img here" />
                  <div className="question_content">
                    <h4>q: 01 What is best sun spots treatment?</h4>
                    <ul className="radio_buttons align-left">
                      <li><input type="radio" onChange={handleChangeQAns} name="abc1" value="a" id="r1" /><label htmlFor="r1"><span></span><h6>Moisturizer</h6></label></li>
                      <li><input type="radio" onChange={handleChangeQAns} name="abc1" value="b" id="r2" /><label htmlFor="r2"><span></span><h6>Serum</h6></label></li>
                      <li><input type="radio" onChange={handleChangeQAns} name="abc1" value="c" id="r3" /><label htmlFor="r3"><span></span><h6>Sunscreen</h6></label></li>
                    </ul>
                  </div>
                </div>
                <div className="question_column">
                  <img src={Qa2} alt="img here" />
                  <div className="question_content">
                    <h4>q: 02 What is best skin care brand among followings?</h4>
                    <ul className="radio_buttons align-left">
                      <li><input type="radio" onChange={handleChangeQAns} name="abc2" value="a" id="r4" /><label htmlFor="r4"><span></span><h6>Focallure</h6></label></li>
                      <li><input type="radio" onChange={handleChangeQAns} name="abc2" value="b" id="r5" /><label htmlFor="r5"><span></span><h6>The Ordinary</h6></label></li>
                      <li><input type="radio" onChange={handleChangeQAns} name="abc2" value="c" id="r6" /><label htmlFor="r6"><span></span><h6>Milani</h6></label></li>
                    </ul>
                  </div>
                </div>
                <div className="question_column">
                  <img src={Qa3} alt="img here" />
                  <div className="question_content">
                    <h4>q: 03 What is the active ingredient for tanning products?</h4>
                    <ul className="radio_buttons align-left">
                      <li><input type="radio" onChange={handleChangeQAns} name="abc3" value="a" id="r7" /><label htmlFor="r7"><span></span><h6>Melanin</h6></label></li>
                      <li><input type="radio" onChange={handleChangeQAns} name="abc3" value="b" id="r8" /><label htmlFor="r8"><span></span><h6>Dehydroxyacetone</h6></label></li>
                      <li><input type="radio" onChange={handleChangeQAns} name="abc3" value="c" id="r9" /><label htmlFor="r9"><span></span><h6>Hydroxyacetone</h6></label></li>
                    </ul>
                  </div>
                </div>
                <div className="question_column">
                  <img src={Qa4} alt="img here" />
                  <div className="question_content">
                    <h4>q: 04 What is the best chemical exfolient?</h4>
                    <ul className="radio_buttons ">
                      <li><input type="radio" onChange={handleChangeQAns} name="abc4" value="a" id="r10" /><label htmlFor="r10"><span></span><img src={Qa41} alt="img here"/><h6>The Ordinary AHA/BHA Peeling Solution</h6></label></li>
                      <li><input type="radio" onChange={handleChangeQAns} name="abc4" value="b" id="r11" /><label htmlFor="r11"><span></span><img src={Qa42} alt="img here"/><h6>The Ordinary Salicylic Acid 2% Masque</h6></label></li>
                      <li><input type="radio" onChange={handleChangeQAns} name="abc4" value="c" id="r12" /><label htmlFor="r12"><span></span><img src={Qa43} alt="img here"/><h6>The Ordinary Squalane Cleanser</h6></label></li>
                    </ul>
                  </div>
                </div>
                <div className="middle-buttons"><button type="submit" style={{ opacity: correctAns === 'no-show' ? .5 : 1 }} className="btn-normal">collect</button></div>
              </form>
            </div>

            {/* <div className="theme_banners">
              <div className="container-fluid">
                <Link to="/mysterybox">
                  <img className="desktop" src={mystery_banner} alt="brand banner" />
                  <img className="Mobile" src={mystery_banner_mobile} alt="brand banner" />
                </Link>
              </div>
            </div> */}
          </section>



          <Modal
            closeTimeoutMS={500}
            isOpen={correctAns !== null && correctAns !== 'no-show'}
            onRequestClose={() => {

            }}
            shouldCloseOnOverlayClick={true}
            className="voucher_model_main"
          >
            <div className="voucher_model">
              <span
                className="cross-btn icon-close"
                onClick={() => {
                  localStorage.setItem('gameDisc', correctAns * 50)
                  localStorage.removeItem('quiz')
                  setcorrectAns('no-show')
                }}
              ></span>
              <h3>{`${correctAns}`} / 04</h3>
              <h5>Congrats!</h5>
              <p>You Won Free Voucher Worth <b>Rs. {`${correctAns * 50}`}</b><br />Shop Above <b>Rs. 3,000</b> to Avail This Offer <br /><br />and also You have Qualified for <b>Free Shipping</b></p>
            </div>

          </Modal>
        </div>
      </div>
    </>
  );
}
