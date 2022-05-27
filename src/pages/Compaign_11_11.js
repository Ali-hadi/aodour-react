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
const Bg1_Title = "https://storage.googleapis.com/aodour_v1/images/11compaign/com-title.png";
const Bg1_Title2 = "https://storage.googleapis.com/aodour_v1/images/11compaign/com-title2.png";
const Bg2_Title = "https://storage.googleapis.com/aodour_v1/images/11compaign/com-title3.png";
const gradient = "https://storage.googleapis.com/aodour_v1/images/11compaign/bground.png";
const voucher_image = "https://storage.googleapis.com/aodour_v1/images/11compaign/voucher-img.png";
const mvoucher_image = "https://storage.googleapis.com/aodour_v1/images/11compaign/mvoucher-img.png";

const voucher_image2 = "https://storage.googleapis.com/aodour_v1/images/11compaign/voucher-img2.png";
const mvoucher_image2 = "https://storage.googleapis.com/aodour_v1/images/11compaign/mvoucher-img2.png";

const voucher_banner = "https://storage.googleapis.com/aodour_v1/images/11compaign/voucher_banner.jpg";
const voucher_banner_mobile = "https://storage.googleapis.com/aodour_v1/images/11compaign/mvoucher_banner.jpg";
const Qa1 = "https://storage.googleapis.com/aodour_v1/images/11compaign/qa1.jpg";
const Qa2 = "https://storage.googleapis.com/aodour_v1/images/11compaign/qa2.jpg";
const Qa3 = "https://storage.googleapis.com/aodour_v1/images/11compaign/qa3.jpg";
const Qa4 = "https://storage.googleapis.com/aodour_v1/images/11compaign/qa4.jpg";
const Qa11 = "https://storage.googleapis.com/aodour_v1/images/11compaign/qa11.png";
const Qa12 = "https://storage.googleapis.com/aodour_v1/images/11compaign/qa12.png";
const Qa13 = "https://storage.googleapis.com/aodour_v1/images/11compaign/qa13.png";
const Qa21 = "https://storage.googleapis.com/aodour_v1/images/11compaign/qa21.png";
const Qa22 = "https://storage.googleapis.com/aodour_v1/images/11compaign/qa22.png";
const Qa23 = "https://storage.googleapis.com/aodour_v1/images/11compaign/qa23.png";

export default function Campaign(props) {

  const banner = "https://storage.googleapis.com/aodour_v1/banners/othergoodiesWeb-Banners-4.jpg";
  const banner_mobile = "https://storage.googleapis.com/aodour_v1/banners/othergoodiesMobiile-Banners-4.jpg";

  const dispatch = useDispatch();

  const {
    campaign11FlashSale: { products },
    campaign11,
    user
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
      if (user.id) {
        showcontratsModal(qAns)
      } else {
        localStorage.setItem('quiz', JSON.stringify(qAns))
        props.history.push({
          pathname: '/login',
          state: {
            from: props.location ? props.location.pathname : '/',
            fromQuiz: true,
            search: ''
          }
        })
      }
    }
  }


  const showcontratsModal = (quiz) => {
    if (correctAns != 'no-show') {
      let correct = 0
      for (const [i, ans] of ['b', 'a', 'c', 'a'].entries()) {
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

  // console.log(brand_products, 'campaign11 campaign11 90', correctAns);


  return (
    <>
      <Helmet>
        <title>
          {"11.11 Biggest Sale Campaign of the 2020 Year | Aodour.pk"}
        </title>
        <meta name="description" content={""} />
        <meta name="keywords" content={"11.11 Biggest Sale Campaign of the 2020 Year | Aodour.pk"} />
      </Helmet>
      <Loader loading={loading} />
      <div className="main-banner">
        <figure>
          <div className="banner-content">
            <h2><img src={Bg1_Title} alt="image here" /></h2>
            <h4><img src={Bg1_Title2} alt="image here" /></h4>
            <h6><b>Biggest Sale</b> Of The <b>Year</b></h6>
            <h5>upto 70% off</h5>
          </div>
        </figure>
      </div>

      <div className="voucher_section">
        <div className="container-fluid">
          <Link to={{
            pathname: "/login",
            state: {
              from: props.location ? props.location.pathname : '/',
              search: ''
            }
          }}
            className="desktop"><img src={voucher_image} alt="img here" /></Link>
          <Link to={{
            pathname: "/login",
            state: {
              from: props.location ? props.location.pathname : '/',
              search: ''
            }
          }}
            className="Mobile"><img src={mvoucher_image} alt="img here" /></Link>
        </div>
      </div>

      {/* <div className="voucher_section mb-20">
        <div className="container-fluid">
          <figure className="desktop"><img src={voucher_image2} alt="img here" /></figure>
          <figure className="Mobile"><img src={mvoucher_image2} alt="img here" /></figure>
        </div>
      </div> */}



      {
        products && products.length > 0 &&

        (<div className="main-banner flashsale_banner" >
          <figure>
            <div className="banner-content">
              <h2><img src={Bg2_Title} alt="image here" /></h2>
              <ul className="countdown_timer right-bottom for-desktop">
                <CountDown timeTillDate={moment(products[0].discountEndTime).format('DD-MM-YYYY HH:mm:ss')} />
              </ul>
            </div>
          </figure>
        </div>)
      }


      <div className="background-bg">
        {
          products && products.length > 0 &&
          (<><div className="for-mbo">
            <ul className="countdown_timer ">

              {/* Replace actual Date discountStartTime */}
              <CountDown timeTillDate={moment(products[0].discountEndTime).format('DD-MM-YYYY HH:mm:ss')} />
              {/* <CountDown timeTillDate="2-11-2020 23:30:00" /> */}
            </ul>
          </div>
            <section className="bg_gradient hide-heading">
              {showOthers && (
                <>
                  <CampaignProductsGrid lazyLoad={true} responsive={responsive}
                    products={products}
                    title=""
                  />

                </>
              )}
              {/* <div className="middle-buttons"><Link to="/" className="btn-normal">shop more</Link></div> */}
            </section></>)}

        {
          brand_products && brand_products.map(item => (
            <>
              <div className="bg_gradient ">
                <div className="container-fluid">
                  <div className="banner_screen">
                    <Link to={`/thousandsofproducts`} > <img className="desktop" src={item.webBanner} alt="brand banner" /> </Link>
                    <Link to={`/thousandsofproducts`} > <img className="Mobile" src={item.mobileBanner} alt="brand banner" /></Link>
                  </div>
                </div>
              </div>
              {item.products && (
                <section className="bg_gradient hide-heading">
                  <>
                    <CampaignProductsGrid lazyLoad={true} responsive={responsive}
                      products={item.products}
                      title=""
                    />
                  </>
                  <div className="middle-buttons"><Link to={`/thousandsofproducts`} className="btn-normal">shop more</Link></div>
                </section>
              )}

            </>
          ))
        }

        {
          buy_1_get_1_free_products && buy_1_get_1_free_products.map(item => (
            <>
              <div className="bg_gradien hide-headingt">
                <div className="container-fluid">
                  <div className="banner_screen">
                    <Link to={`/buy1get1free`}><img className="desktop" src={item.webBanner} alt="brand banner" /> </Link>
                    <Link to={`/buy1get1free`}><img className="Mobile" src={item.mobileBanner} alt="brand banner" /></Link>
                  </div>
                </div>
              </div>
              {item.products && (
                <section className="bg_gradient hide-heading">
                  <>
                    <CampaignProductsGrid lazyLoad={true} responsive={responsive}
                      products={item.products}
                      title=""
                    />
                  </>
                  <div className="middle-buttons"><Link to={`/buy1get1free`} className="btn-normal">shop more</Link></div>
                </section>
              )}
            </>
          ))
        }

        <div className="bg_gradient">
          <div className="container-fluid">
            <div className="banner_screen">
              <img className="desktop" src={voucher_banner} alt="brand banner" />
              <img className="Mobile" src={voucher_banner_mobile} alt="brand banner" />
            </div>
          </div>
        </div>
        <div className="quizrules">
          <div className="container-fluid">
            <h4>rules to follow:</h4>
            <ol>
              <li><b>Sign Up</b> on <b>website</b>.</li>
              <li><b>Answer the following questions.</b> You’ll <b>get Rs. 50</b> for answering each question correctly.</li>
              <li>The amount you <b>win i.e. Rs. 200</b> will automatically be deducted from your total <b>check out amount</b>.</li>
            </ol>
          </div>
        </div>
        <section className="bg_gradient">
          <div className="container-fluid">
            <form onSubmit={onSubmitQuiz}>
              <div className="question_column">
                <img src={Qa1} alt="img here" />
                <div className="question_content">
                  <h4>q: 01 Find the right product for the Anti-aging issue</h4>
                  <ul className="radio_buttons">
                    <li><input type="radio" onChange={handleChangeQAns} name="abc1" value="a" id="r1" /><label htmlFor="r1"><span></span><img src={Qa11} alt="img here" /><h6>The Ordinary Salicylic Acid 2% Masque</h6></label></li>
                    <li><input type="radio" onChange={handleChangeQAns} name="abc1" value="b" id="r2" /><label htmlFor="r2"><span></span><img src={Qa12} alt="img here" /><h6>The Inkey List Bakuchiol Retinol Alternative Moisturizer</h6></label></li>
                    <li><input type="radio" onChange={handleChangeQAns} name="abc1" value="c" id="r3" /><label htmlFor="r3"><span></span><img src={Qa13} alt="img here" /><h6>Some By Mi Yuja Niacin Sleeping Mask</h6></label></li>
                  </ul>
                </div>
              </div>
              <div className="question_column">
                <img src={Qa2} alt="img here" />
                <div className="question_content">
                  <h4>q: 02 What is Innisfree No Sebum Loose Powder used for?</h4>
                  <ul className="radio_buttons align-left">
                    <li><input type="radio" onChange={handleChangeQAns} name="abc2" value="a" id="r4" /><label htmlFor="r4"><span></span><h6>Oil/Sebum control</h6></label></li>
                    <li><input type="radio" onChange={handleChangeQAns} name="abc2" value="b" id="r5" /><label htmlFor="r5"><span></span><h6>Dark spots</h6></label></li>
                    <li><input type="radio" onChange={handleChangeQAns} name="abc2" value="c" id="r6" /><label htmlFor="r6"><span></span><h6>Anti-aging</h6></label></li>
                  </ul>
                </div>
              </div>
              <div className="question_column">
                <img src={Qa3} alt="img here" />
                <div className="question_content">
                  <h4>q: 03 Guess the right Yuja Niacin Sleeping Mask?</h4>
                  <ul className="radio_buttons">
                    <li><input type="radio" onChange={handleChangeQAns} name="abc3" value="a" id="r7" /><label htmlFor="r7"><span></span><img src={Qa21} alt="img here" /></label></li>
                    <li><input type="radio" onChange={handleChangeQAns} name="abc3" value="b" id="r8" /><label htmlFor="r8"><span></span><img src={Qa22} alt="img here" /></label></li>
                    <li><input type="radio" onChange={handleChangeQAns} name="abc3" value="c" id="r9" /><label htmlFor="r9"><span></span><img src={Qa23} alt="img here" /></label></li>
                  </ul>
                </div>
              </div>
              <div className="question_column">
                <img src={Qa4} alt="img here" />
                <div className="question_content">
                  <h4>q: 04 What is hyaluronic acid used for?</h4>
                  <ul className="radio_buttons align-left">
                    <li><input type="radio" onChange={handleChangeQAns} name="abc4" value="a" id="r10" /><label htmlFor="r10"><span></span><h6>Hydration</h6></label></li>
                    <li><input type="radio" onChange={handleChangeQAns} name="abc4" value="b" id="r11" /><label htmlFor="r11"><span></span><h6>Brightness</h6></label></li>
                    <li><input type="radio" onChange={handleChangeQAns} name="abc4" value="c" id="r12" /><label htmlFor="r12"><span></span><h6>Hyperpigmentation</h6></label></li>
                  </ul>
                </div>
              </div>
              <div className="middle-buttons"><button type="submit" style={{opacity: correctAns === 'no-show' ? .5: 1}} className="btn-normal">collect</button></div>
            </form>

          </div>
        </section>

      </div>

      {/* <Modal
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

      </Modal> */}

    </>
  );
}
