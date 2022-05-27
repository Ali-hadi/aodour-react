import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GET_CAMPAIGN_CATEGORY_PRODUCTS, GET_11CAMPAIGN_FLASH_SALE, GET_11CAMPAIGN_LISTING, ADD_TO_CART } from "../constants/actionTypes";
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
import groupBy from "lodash/groupBy";
import notification from "../components/Notification";
export default function Campaign(props) {

  const banner = "https://storage.googleapis.com/aodour_v1/campaign/Feb/landing_banner1.png";
  const mbanner = "https://storage.googleapis.com/aodour_v1/campaign/Feb/landing_mobile1.png";

  const banner2 = "https://storage.googleapis.com/aodour_v1/campaign/Feb/landing_banner2-2.png";
  const mbanner2 = "https://storage.googleapis.com/aodour_v1/campaign/Feb/landing_mobile2.png";

  const banner3 = "https://storage.googleapis.com/aodour_v1/campaign/Feb/landing_banner3-3.png";
  const mbanner3 = "https://storage.googleapis.com/aodour_v1/campaign/Feb/landing_mobile3-3.png";

  const banner4 = "https://storage.googleapis.com/aodour_v1/campaign/Feb/landing_banner4.png";
  const mbanner4 = "https://storage.googleapis.com/aodour_v1/campaign/Feb/landing_mobile4.png";

  const flashbanner = "https://storage.googleapis.com/aodour_v1/campaign/Feb/landing_banner6.png";
  const mobileflashbanner = "https://storage.googleapis.com/aodour_v1/campaign/Feb/landing_mobile6.png";

  const banner6 = "https://storage.googleapis.com/aodour_v1/campaign/Feb/Valentines-Bundel.jpg";
  const mbanner6 = "https://storage.googleapis.com/aodour_v1/campaign/Feb/Valentines-Bundel-mobile.png";

  const prImg = 'https://storage.googleapis.com/aodour_v1/bbox.png'

  const dispatch = useDispatch();

  const {
    campaign11FlashSale: { products },
    campaign11,
    user,
    cartList,
    campaignCategoryProducts
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
  const [categoryProducts, setcategoryProducts] = useState({});
  const [slctdProducts, setslctdProducts] = useState([]);
  const [totals, settotals] = useState({ subTotal: 0, discount: 0, total: 0, totalPrice: 0 })


  const handleChangeQAns = (event) => {
    // console.log(event, 'event is the');
    if (event) {
      setqAns({ ...qAns, [event.target.name]: event.target.value })
    }
  }


  // const onSubmitQuiz = async (e) => {
  //   e.preventDefault();
  //   if (correctAns !== 'no-show') {
  //     // if (user.id) {
  //       showcontratsModal(qAns)
  //     // } else {
  //     //   localStorage.setItem('quiz', JSON.stringify(qAns))
  //     //   props.history.push({
  //     //     pathname: '/login',
  //     //     state: {
  //     //       from: props.location ? props.location.pathname : '/',
  //     //       fromQuiz: true,
  //     //       search: ''
  //     //     }
  //     //   })
  //     // }
  //   }
  // }


  // const showcontratsModal = (quiz) => {
  //   if (correctAns != 'no-show') {
  //     let correct = 0
  //     for (const [i, ans] of ['c', 'b', 'b', 'a'].entries()) {
  //       // console.log(`${quiz[`abc${i + 1}`]}`, 'ans is this', ans);
  //       if (ans == `${quiz[`abc${i + 1}`]}`) correct++
  //     }
  //     setcorrectAns(correct);
  //     localStorage.removeItem('quiz')
  //     localStorage.setItem('gameDisc', correct * 50)
  //   }
  // }

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


    dispatch({
      type: GET_CAMPAIGN_CATEGORY_PRODUCTS,
      callback: () => setLoading(false),
    });

    // getQuizAns()
  }, []);


  // useEffect(() => {
  //   getQuizAns()
  // }, [user]);


  // const getQuizAns = async () => {
  //   let qz = await localStorage.getItem('quiz');
  //   if (qz != null && user.id) {
  //     let quiz = JSON.parse(qz)
  //     showcontratsModal(quiz)
  //   } else {
  //     let gameDisc = await localStorage.getItem('gameDisc');
  //     if (gameDisc != null) {
  //       setcorrectAns('no-show')
  //     }
  //   }
  // }


  useEffect(() => {
    if (campaign11.products) {
      if (campaign11.products.length > 0) {
        let cmp = campaign11.products[0];

        setBrand_products(cmp.brand_products)
        setbuy_1_get_1_free_products(cmp.buy_1_get_1_free_products)

      }
    }
  }, [campaign11])

  useEffect(() => {
    let list = groupBy(campaignCategoryProducts || [], 'category_name');
    setcategoryProducts(list)
  }, [campaignCategoryProducts])

  useEffect(() => {
    getTotals()
  }, [slctdProducts])

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

  const getPriceElement = (product) => {
    if (
      product.discountPercentage > 0 &&
      moment().isSameOrAfter(product.discountStartTime, 'day') &&
      moment().isSameOrBefore(product.discountEndTime)
    ) {
      return (
        <h6 className="p-title p20 for_mobo">
          Rs.{Math.round(product.price - product.discountPrice)}{" "}
          <del className="del_price">{product.price}</del>
        </h6>
      );
    } else {
      return <h6 className="">Rs.{Math.round(product.price)} </h6>;
    }
  };

  const getProductPrice = (product) => {
    if (
      product.discountPercentage > 0 &&
      moment().isSameOrAfter(product.discountStartTime, 'day') &&
      moment().isSameOrBefore(product.discountEndTime)
    ) {
      return Math.round(product.price - product.discountPrice);
    } else {
      return Math.round(product.price);
    }
  };


  const getTotals = () => {
    let totals = {
      totalPrice: 0,
      subTotal: 0,
      discount: 0,
      total: 0,
    }
    for (let pr of slctdProducts) {
      totals.subTotal += getProductPrice(pr);
      totals.totalPrice += parseInt(pr.price)
    }
    if (slctdProducts.length === 5) {
      totals.discount = Math.round((totals.subTotal / 100) * 10)
      totals.total = totals.subTotal - totals.discount
    }
    settotals({ ...totals })
  }

  function dynamicString() {
    return Math.floor((Math.random() * 1000000) + 786496)
  }

  const addToCart = () => {

    let unique = dynamicString();
    
    let pr = {
      id: unique,
      title: 'Valentines bundle',
      images: [prImg],
      price: totals.subTotal,
      activeCampaignName: 'Beloved Sale',
      availableQuantity: 5,
      sku: unique,
      rating: 5,
      discountPercentage: 0,
      discountPrice: 0,
      brandSlug: unique,
      variationSlug: unique,
      totalComments: 5,
      productName: 'Valentines bundle',
      qty: 1,
      attributes: [],
      categoryName: 'Beloved Sale',
      discountEndTime: "2021-2-20T19:00:00.000Z",
      discountStartTime: "2020-12-31T19:00:00.000Z",
      extraDiscount: slctdProducts,
    }
    dispatch({
      type: ADD_TO_CART,
      payload: pr,
    });
    notification({ message: 'Bundle added Successfully' });
    setslctdProducts([]);
    settotals({})

    props.history.push('/checkout')

  };


  const onChangeRadio = (product, category) => {
    let list = [...slctdProducts];
    let index = list.findIndex(item => item.category_name === category);
    console.log(index, category);

    if (index > -1) {
      list[index] = product;
    } else {
      list.push(product)
    }
    setslctdProducts([...list]);
  }

  console.log(totals, 'totals.subTotal totals.subTotal');

  return (
    <>
      <Helmet>
        <title>
          {"Aodour Beloved Feb sale | 2021"}
        </title>
        <meta name="description" content={"aodour valentine sale 2021"} />
        <meta name="keywords" content={"aodour valentine sale 2021"} />
      </Helmet>
      <Loader loading={loading} />

      <div className="wrapper">
        <div className="banners">
          <img className="desktop" src={banner} alt="img here" />
          <img className="mobile" src={mbanner} alt="img here" />
          <div className="bg_heart"></div>
        </div>

        <div className="background_gry">
          <div className="theme_banners mb0">
            <img className="desktop" src={banner2} alt="img here" />
            <img className="mobile" src={mbanner2} alt="img here" />
          </div>
          {
            products && products.length > 0 &&

            (<div className="main-banner theme_banners mb-flash" >
              <figure>
                <img className="desktop" src={flashbanner} alt="image here" />
                <img className="mobile" src={mobileflashbanner} alt="image here" />
                <div className="counter_dev">
                  <h4>Sale Clock down</h4>
                  <ul className="countdown_timer right-bottom">
                    {/* <CountDown timeTillDate={moment(products[0].discountEndTime).format('DD-MM-YYYY HH:mm:ss')} /> */}
                    <CountDown
                      // timeTillDate={products[0].discountEndTime} 
                      timeTillDate="16-02-2021 20:00:00"
                    />
                  </ul>
                </div>
              </figure>
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

          <div className="theme_banners mb0">
            <img className="desktop" src={banner3} alt="img here" />
            <img className="mobile" src={mbanner3} alt="img here" />
          </div>

          {
            brand_products && brand_products.map(item => (
              <>
                <div className="theme_banners">
                  <Link to={`/thousandsofproducts`} > <img className="desktop" src={banner4} alt="brand banner" /> </Link>
                  <Link to={`/thousandsofproducts`} > <img className="Mobile" src={mbanner4} alt="brand banner" /></Link>
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
          <div className="theme_banners mb0">
            <img className="desktop" src={banner6} alt="img here" />
            <img className="mobile" src={mbanner6} alt="img here" />
          </div>
          <div className="checked_bundle">
            <div className="container-fluid">
              {
                Object.keys(categoryProducts).map((key, index) => {
                  return (
                    <>
                      <div class="heading align-center"><h3 class="">{key}</h3></div>
                      <ul className="columns_gridss">
                        {
                          categoryProducts[key].map(product => {
                            return (
                              <li className={`${slctdProducts.some(item => item.productVariationID == product.productVariationID) || slctdProducts.length ===0 ? '' : 'overlay5' }`}
                              onClick={() => onChangeRadio(product, key)}
                              >
                                <input type="radio" id={product.productVariationID} name={key} value={product.productVariationID} onClick={() => onChangeRadio(product, key)}
                                checked={slctdProducts.some(item => item.productVariationID == product.productVariationID)}
                                // className=""
                                // className={`${slctdProducts.some(item => item.productVariationID !== product.productVariationID) || slctdProducts.length ===0 ? 'overlay5' : '' }`}
                                  />
                                <label htmlFor={product.productVariationID}>
                                  <div className="col-product overflow-view">
                                    <figure>
                                      <img src={`${product.images[0]}`} alt="image here" />
                                      <div className="tag">{Math.round(product.discountPercentage)}% Off</div>
                                      <small className="checkb"></small>
                                    </figure>
                                    <div className="col-content">
                                      <h6><span>{product.name}</span></h6>
                                      {
                                        getPriceElement(product)
                                      }
                                    </div>
                                  </div>
                                </label>
                              </li>
                            )
                          })
                        }

                      </ul>
                    </>
                  )
                })
              }

              <div className="bundle_clc">
                <ul>
                  <li><span>Total value</span><span>Rs. {totals.subTotal || 0}</span></li>
                  <li><span>Bundle discount</span><span>Rs. {totals.discount || 0}</span></li>
                  <li><span>final price</span><span>Rs. {totals.total || 0}</span></li>
                </ul>
              </div>
              <div className="middle-buttons"><button onClick={addToCart} disabled={slctdProducts.length < 5} className="btn-normal">add to cart</button></div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}


