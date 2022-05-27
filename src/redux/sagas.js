// @flow
import axios, { CancelToken } from "axios";
import {
  all,
  call,
  fork,
  put,
  takeEvery,
  takeLatest,
  cancelled,
} from "redux-saga/effects";
import {
  GET_MENU,
  GET_HOMEPAGE_BANNER,
  GET_HOMEPAGE_PRODUCTS,
  GET_CATEGORY_PRODUCTS,
  GET_SUBCATEGORY_PRODUCTS,
  GET_BRANDLISTING,
  GET_BRAND_PAGE_PRODUCTS,
  POST_COMPLAINT_DATA,
  GET_BRAND_PAGE_CATEGORY_LIST,
  GET_PRODUCT_DETAIL,
  POST_CHECKOUT_REQUEST,
  GET_CITIES_LISTINGS,
  POST_ASK_QUESTION,
  POST_REVIEW,
  GET_PRODUCT_REVIEWS,
  GET_PRODUCT_QUESTIONS,
  POST_VERIFY_STOCK,
  POST_VERIFY_PHONE,
  GET_SUBCATEGORY_FEATURES,
  GET_SEARCH_RESULT,
  GET_FLASH_SALE_PRODUCTS,
  GET_PRODUCT_DETAIL_SIMILAR_PRODUCTS,
  GET_BEST_SELLER_PRODUCTS,
  GET_NEW_ARRIVAL_PRODUCTS,
  GET_UNDER_THOUSAND_PRODUCTS,
  GET_ALL_BEST_SELLER_PRODUCTS,
  POST_SUBSCRIBE_NEWSLETTER,
  POST_CONTACT_US,
  POST_NOTIFY_ME,
  GET_SEARCH_LISTING_PRODUCTS,
  GET_SALE_LISTING,
  POST_TRACK_ORDER,
  POST_LOGIN,
  POST_SIGN_UP,
  POST_RECOVER_PASSWORD,
  GET_CAMPAIGN_LISTING,
  GET_FREE_GIFTS,
  POST_VERIFY_LOGIN,
  POST_VERIFY_PASSWORD,
  POST_THIRD_PARTY_LOGIN,
  POST_VERIFY_PHONE_REGISTER,
  POST_VERIFY_EMAIL,
  POST_VERIFY_PIN,
  POST_SEND_PIN,
  ADD_WISHLIST,
  GET_USER_PROFILE,
  POST_EDIT_USER_PROFILE,
  POST_ADD_ADDRESS,
  GET_MY_ORDERS,
  GET_WISHLIST,
  DELETE_WISHLIST,
  POST_RESET_PASSWORD,
  POST_VERIFY_PHONE_RESET_PASSWORD,
  POST_UPLOAD_PROFILE_IMAGE,
  POST_ADDRESS_MAKE_DEFAULT,
  POST_EDIT_ADDRESS,
  POST_DELETE_ADDRESS,
  GET_LOREAL,
  GET_GARNIER,
  POST_TRACK_COMPLAINT,
  GET_CHECKOUT_PRODUCTS,
  GET_MANISO_MENU,
  GET_MINISO_PRODUCTS,
  GET_MINISO_CATEGORYPRODUCT,
  GET_MINISO_SUBCATEGORY,
  GET_MINISO_SUBSUBCATEGORY,
  GET_11CAMPAIGN_FLASH_SALE,
  GET_CAMPAIGN_CATEGORY_PRODUCTS,
  GET_11CAMPAIGN_LISTING,
  GET_SET_CART,
  GET_11CAMPAIGN_BRAND,
  GET_LIVE_SESSION_SALE,
  RESET_11CAMPAIGN_BRAND  ,
  GET_CAMPAIGN_BUY2_GET_1,
  GET_CAMPAIGN_MYSTERYBOX,
} from "../constants/actionTypes";
import {
  GetMeunSuccess,
  GetMeunFailed,
  GetHomeBannerFailed,
  GetHomeBannerSuccess,
  GetHomeProductsSuccess,
  GetHomeProductsFailed,
  GetCategoryProductsSuccess,
  GetCategoryProductsFailed,
  GetSubCategoryProductsSuccess,
  GetSubCategoryProductsFailed,
  GetBrandPageProductsSuccess,
  GetBrandPageProductsFailed,
  GetBrandPageCategoryListSuccess,
  GetBrandPageCategoryListFailed,
  GetProductDetailtSuccess,
  GetProductDetailFailed,
  GetCitiesListingsFail,
  GetCitiesListingsSuccess,
  PostCheckoutRequestSuccess,
  PostCheckoutRequestFail,
  PostAskQuestionFail,
  PostAskQuestionSuccess,
  PostReviewSuccess,
  PostReviewFail,
  GetProductQuestionsFail,
  GetProductQuestionsSuccess,
  GetProductReviewsFail,
  GetProductReviewsSuccess,
  PostVerifyStockSuccess,
  PostVerifyStockFail,
  PostVerifyPhoneSuccess,
  PostVerifyPhoneFail,
  GetSubcategoryFeaturesFail,
  GetSubcategoryFeaturesSuccess,
  getSearchResultSuccess,
  GetFlashSaleProductsSuccess,
  GetFlashSaleProductsFail,
  GetBestSellerProductsSuccess,
  GetBestSellerProductsFail,
  getSearchResultFail,
  GetProductDetailSimilarProductsSuccess,
  GetProductDetailSimilarProductsFail,
  GetNewArrivalProductsSuccess,
  GetNewArrivalProductsFail,
  GetAllBestSellerProductsSuccess,
  GetAllBestSellerProductsFail,
  GetUnderThousandProductsSuccess,
  GetUnderThousandProductsFail,
  GetBrandListingSuccess,
  GetBrandListingFailed,
  PostNotifyMeSuccess,
  PostNotifyMeFail,
  getsearchListingProductsSuccess,
  getsearchListingProductsFail,
  getSaleListingSuccess,
  getSaleListingFail,
  postTrackOrderSuccess,
  postTrackOrderFail,
  postLoginSuccess,
  postLoginFail,
  postSignupSuccess,
  postSignupFail,
  postRecoverPasswordSuccess,
  postRecoverPasswordFail,
  getCampaignListingSuccess,
  getCampaignListingFail,
  getFreeGiftsSuccess,
  getFreeGiftsFail,
  getUserProfileSuccess,
  getUserProfileFail,
  postEditUserProfile,
  postEditUserProfileSuccess,
  postEditUserProfileFail,
  postAddAddressSuccess,
  postAddAddressFail,
  getMyOrdersSuccess,
  getMyOrdersFail,
  getWishlistFail,
  deleteFromWishlistFail,
  addToWishlistSuccess,
  getWishlistSuccess,
  deleteFromWishlistSuccess,
  addToWishlistFail,
  postAddressMakeDefaultSuccess,
  postAddressMakeDefaultFail,
  postDeleteAddressSuccess,
  postDeleteAddressFail,
  postEditAddressSuccess,
  postEditAddressFail,
  getLorealSuccess,
  getLorealExtendSuccess,
  getKerastaseSuccess,
  postTrackComplaintSuccess,
  getComplaintDataSuccess,
  getCheckoutProductsSuccess,
  setMinisoMenu,
  setMinisoProduct,
  setMinisoCategory,
  settMinisoSubcategory,

  get11CampaignFlashSaleListingSuccess,
  get11CampaignFlashSaleListingFail,

  Get11campaignListing,
  get11CampaignListingSuccess,
  get11CampaignListingFail,


  getCampaignCategoryProductsSuccess,
  getCampaignCategoryProductsFail,

  getGarnierSuccess,
  getGarnierFail,

  getSetCartSuccess,
  getSetCartFail,

  Get11campaignBrand,
  get11CampaignBrandSuccess,
  get11CampaignBrandFail,
  reset11CampaignBrandSuccess,
  getCampaignBuy2Get1Fail,
  getCampaignBuy2Get1Success,
  getLiveSessionSaleSuccess,
  getLiveSessionSaleFail,
  getCampaignMysteryBoxFail,
  getCampaignMysteryBoxSuccess,
} from "./actions";
import dotenv from "dotenv";
import { saveUserToken, getUserToken, setUserVerified } from "../util";
import { getLorealFail } from "./actions";
import { GET_LOREAL_Extend } from "./../constants/actionTypes";
import { getLorealExtendFail } from "./actions";
import { getKerastageFail } from "./actions";
import { GET_KERASTASE } from "./../constants/actionTypes";
import { postTrackComplaintFail } from "./actions";
import { getComplaintDataFail } from "./actions";
import { GET_COMPLAINT_DATA } from "./../constants/actionTypes";
import { POST_COMPLAINT_IMAGE } from "./../constants/actionTypes";
import { getCheckoutProductsFail } from "./actions";
import notification from "../components/Notification";
dotenv.config();

 const url = process.env.REACT_APP_API_URL || `https://nodeapi.aodour.pk/api/`; 
// const url = process.env.REACT_APP_API_URL || `https://devnodeapi.aodour.pk/api/`; 

// console.log(process.env.REACT_APP_API_URL, 'process.env.REACT_APP_API_URL');

const onSucessStatus = "success";
/**
 * Fetch data from given url
 * @param {*} url
 * @param {*} options
 */
export const fetchJSON = (url, options = {}) => {
  return axios(url, options)
    .then((json) => {
      return json.data;
    })
    .catch((error) => {
      throw error;
    });
};


function* Get_Menu() {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}menu`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetMeunSuccess(response.result));
    } else {
      yield put(
        GetMeunFailed({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetMeunFailed({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetMeunFailed({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetMeunFailed({ message: "", status: false }));
  }
}

export function* watchGetMenu() {
  yield takeEvery(GET_MENU, Get_Menu);
}

function* Get_Home_Banners() {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}landing/all-banners`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetHomeBannerSuccess(response.result));
    } else {
      yield put(
        GetHomeBannerFailed({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetHomeBannerFailed({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetHomeBannerFailed({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetHomeBannerFailed({ message: "", status: false }));
  }
}

export function* watchGetHomeBanner() {
  yield takeEvery(GET_HOMEPAGE_BANNER, Get_Home_Banners);
}

function* Get_Home_Prodcuts() {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}landing/new-arrivals`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetHomeProductsSuccess(response.result));
    } else {
      yield put(
        GetHomeProductsFailed({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetHomeProductsFailed({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetHomeProductsFailed({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetHomeProductsFailed({ message: "", status: false }));
  }
}

export function* watchGetHomeProducts() {
  yield takeEvery(GET_HOMEPAGE_PRODUCTS, Get_Home_Prodcuts);
}

function* Get_Category_Prodcuts({ slug, callback }) {
  const options = {
    method: "GET",
    params: {
      slug,
    },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}category/all-product-sections`,
      options
    );
    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetCategoryProductsSuccess(response.result));
    } else {
      yield put(
        GetHomeProductsFailed({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetCategoryProductsFailed({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetCategoryProductsFailed({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetCategoryProductsFailed({ message: "", status: false }));
  }
}

export function* watchGetCategoryProducts() {
  yield takeEvery(GET_CATEGORY_PRODUCTS, Get_Category_Prodcuts);
}

function* Get_SubCategory_Prodcuts({ payload, callback }) {
  const options = {
    method: "GET",
    params: {
      slug: payload,
    },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}subcategory/products`,
      options
    );
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetSubCategoryProductsSuccess(response.result));
    } else {
      yield put(
        GetHomeProductsFailed({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetSubCategoryProductsFailed({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetSubCategoryProductsFailed({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetSubCategoryProductsFailed({ message: "", status: false }));
  }
}

export function* watchGetSubCategoryProducts() {
  yield takeEvery(GET_SUBCATEGORY_PRODUCTS, Get_SubCategory_Prodcuts);
}

function* Get_Brand_listing({ id }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}brand/all`, options);
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetBrandListingSuccess(response.result));
    } else {
      yield put(
        GetBrandListingFailed({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetBrandListingFailed({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetBrandListingFailed({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetBrandListingFailed({ message: "", status: false }));
  }
}

export function* watchGetBrandListing() {
  yield takeEvery(GET_BRANDLISTING, Get_Brand_listing);
}

function* Get_Brand_Page_Products({ payload, callback }) {
  const options = {
    method: "GET",
    params: { slug: payload },
  };

  try {
    const response = yield call(fetchJSON, `${url}brand/products`, options);
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetBrandPageProductsSuccess(response.result));
    } else {
      yield put(
        GetBrandPageProductsFailed({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetBrandPageProductsFailed({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetBrandPageProductsFailed({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetBrandPageProductsFailed({ message: "", status: false }));
  }
}

export function* watchGetBrandPageProducts() {
  yield takeEvery(GET_BRAND_PAGE_PRODUCTS, Get_Brand_Page_Products);
}

function* Get_Brand_Page_Category_list({ payload }) {
  const options = {
    method: "GET",
    params: { slug: payload },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}brand/category-list`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetBrandPageCategoryListSuccess(response.result.data));
    } else {
      yield put(
        GetBrandPageProductsFailed({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetBrandPageCategoryListFailed({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetBrandPageCategoryListFailed({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetBrandPageCategoryListFailed({ message: "", status: false }));
  }
}

export function* watchGetBrandPageCategoryList() {
  yield takeEvery(GET_BRAND_PAGE_CATEGORY_LIST, Get_Brand_Page_Category_list);
}

function* get_Product_Detail({ varSlug, callback }) {
  if (varSlug === "") {
    yield put(
      GetProductDetailtSuccess({
        product_variations: [],
        product: [{}],
        features: [],
      })
    );
    return;
  }

  const options = {
    method: "GET",
    params: { variationSlug: varSlug, customerId: getUserToken() },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}productdetail/product-data`,
      options
    );
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetProductDetailtSuccess(response.result));
    } else {
      yield put(
        GetProductDetailFailed({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetProductDetailFailed({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetProductDetailFailed({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetProductDetailFailed({ message: "", status: false }));
  }
}

export function* watchGetProductDetail() {
  yield takeEvery(GET_PRODUCT_DETAIL, get_Product_Detail);
}

function* post_checkout_request({ payload, callback, errorCallback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}checkout/place-order`,
      options
    );
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(PostCheckoutRequestSuccess(response.result));
    } else {
      yield put(
        PostCheckoutRequestFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      if (errorCallback) errorCallback();
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      PostCheckoutRequestFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    if (errorCallback) errorCallback();
  }
}

export function* watchPostCheckoutRequest() {
  yield takeEvery(POST_CHECKOUT_REQUEST, post_checkout_request);
}

function* get_Cities_listings() {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}city/all`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetCitiesListingsSuccess(response.result.cities));
    } else {
      yield put(
        GetCitiesListingsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetCitiesListingsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchGetCitiesListings() {
  yield takeEvery(GET_CITIES_LISTINGS, get_Cities_listings);
}

function* post_ask_question({ payload: { question, slug }, callback }) {
  const options = {
    method: "POST",
    data: question,
  };

  try {
    const response = yield call(fetchJSON, `${url}question/${slug}`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(PostAskQuestionSuccess(response.result));
      if (callback) callback();
    } else {
      yield put(
        PostCheckoutRequestFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      PostAskQuestionFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchPostAskQuestion() {
  yield takeEvery(POST_ASK_QUESTION, post_ask_question);
}

function* post_review({ payload: { review, slug }, callback }) {
  const options = {
    method: "POST",
    data: review,
  };

  try {
    const response = yield call(fetchJSON, `${url}review/${slug}`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(PostReviewSuccess(response.result));
      if (callback) callback();
    } else {
      yield put(
        PostReviewFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      PostReviewFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchPostReview() {
  yield takeEvery(POST_REVIEW, post_review);
}

function* get_product_reviews({ slug }) {
  // console.log("Posting review");

  if (slug === "") {
    yield put(GetProductReviewsSuccess([]));
    return;
  }

  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}review/${slug}`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetProductReviewsSuccess(response.result));
    } else {
      yield put(
        GetProductReviewsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetProductReviewsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchGetProductReviews() {
  yield takeEvery(GET_PRODUCT_REVIEWS, get_product_reviews);
}

function* get_product_questions({ slug }) {
  // console.log("Posting review");

  if (slug === "") {
    yield put(GetProductQuestionsSuccess([]));
    return;
  }

  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}question/${slug}`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetProductQuestionsSuccess(response.result));
    } else {
      yield put(
        GetProductQuestionsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetProductQuestionsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchGetProductQuestions() {
  yield takeEvery(GET_PRODUCT_QUESTIONS, get_product_questions);
}

function* post_verify_stock({ cartList, callback }) {
  // console.log("Posting review");

  const options = {
    method: "POST",
    data: {
      cartList: cartList,
    },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}checkout/check-product-stock`,
      options
    );

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(PostVerifyStockSuccess(response.result));
    } else {
      if (callback) callback();
      yield put(
        PostVerifyStockFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    if (callback) callback();
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      PostVerifyStockFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchPostVerifyStock() {
  yield takeEvery(POST_VERIFY_STOCK, post_verify_stock);
}

function* post_verify_Phone({ payload, callback }) {
  // console.log("Posting review");

  const options = {
    method: "POST",
    data: {
      phone: payload,
    },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}checkout/check-customer-phone`,
      options
    );

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (callback) callback(response, "success");
      yield put(PostVerifyPhoneSuccess(response.result));
    } else {
      if (callback) callback(response, "fail");
      yield put(
        PostVerifyPhoneFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    if (callback) callback(error, "fail");
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      PostVerifyPhoneFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchPostVerifyPhone() {
  yield takeEvery(POST_VERIFY_PHONE, post_verify_Phone);
}

function* get_subcategory_features({ payload }) {
  const options = {
    method: "GET",
    params: {
      slug: payload,
    },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}subcategory/features`,
      options
    );

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetSubcategoryFeaturesSuccess(response.result));
    } else {
      yield put(
        GetSubcategoryFeaturesFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetSubcategoryFeaturesFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchGetSubcategoryFeatures() {
  yield takeEvery(GET_SUBCATEGORY_FEATURES, get_subcategory_features);
}

function* fetchSearchResult({ payload }) {
  const source = CancelToken.source();
  const options = {
    method: "GET",
    params: {
      keyword: payload,
    },
    cancelToken: source.token,
  };

  try {
    const response = yield call(fetchJSON, `${url}search`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getSearchResultSuccess(response.result));
    } else {
      yield put(
        getSearchResultFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getSearchResultFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  } finally {
    if (yield cancelled()) {
      source.cancel();
    }
  }
}

export function* watchfetchSearchResult() {
  yield takeLatest(GET_SEARCH_RESULT, fetchSearchResult);
}

function* Get_Flash_Sale_Prodcuts() {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}landing/flash-sale`, options);
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetFlashSaleProductsSuccess(response.result));
    } else {
      yield put(
        GetFlashSaleProductsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetFlashSaleProductsFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetFlashSaleProductsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetFlashSaleProductsFail({ message: "", status: false }));
  }
}

export function* watchGetFlashSaleProducts() {
  yield takeEvery(GET_FLASH_SALE_PRODUCTS, Get_Flash_Sale_Prodcuts);
}

function* Fetch_Search_Listing_Product({ payload, callback }) {
  const options = {
    method: "GET",
    params: {
      keyword: payload,
    },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}search/searchproducts`,
      options
    );

    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getsearchListingProductsSuccess(response.result));
    } else {
      yield put(
        getsearchListingProductsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getsearchListingProductsFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getsearchListingProductsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getsearchListingProductsFail({ message: "", status: false }));
  }
}

export function* watchGetSearchListingProduct() {
  yield takeEvery(GET_SEARCH_LISTING_PRODUCTS, Fetch_Search_Listing_Product);
}

function* Get_Best_Seller_Prodcuts() {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}landing/trending`, options);
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetBestSellerProductsSuccess(response.result));
    } else {
      yield put(
        GetBestSellerProductsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetBestSellerProductsFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetBestSellerProductsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetBestSellerProductsFail({ message: "", status: false }));
  }
}

export function* watchGetBestSellerProducts() {
  yield takeEvery(GET_BEST_SELLER_PRODUCTS, Get_Best_Seller_Prodcuts);
}

function* Get_Product_Detail_Similar_Products({ varSlug }) {
  const options = {
    method: "GET",
    params: { variationSlug: varSlug },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}productdetail/similar-products/`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(
        GetProductDetailSimilarProductsSuccess(response.result.products)
      );
    } else {
      yield put(
        GetProductDetailSimilarProductsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(
        GetProductDetailSimilarProductsFail({ message: "", status: false })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetProductDetailSimilarProductsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(
      GetProductDetailSimilarProductsFail({ message: "", status: false })
    );
  }
}

export function* watchProductDetailSimilarProducts() {
  yield takeEvery(
    GET_PRODUCT_DETAIL_SIMILAR_PRODUCTS,
    Get_Product_Detail_Similar_Products
  );
}

function* get_new_arrival_products({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}products/all-new-arrival/`,
      options
    );
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetNewArrivalProductsSuccess(response.result));
    } else {
      yield put(
        GetNewArrivalProductsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetNewArrivalProductsFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetNewArrivalProductsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetNewArrivalProductsFail({ message: "", status: false }));
  }
}

export function* watchGetNewArrivalProducts() {
  yield takeEvery(GET_NEW_ARRIVAL_PRODUCTS, get_new_arrival_products);
}

function* get_all_best_seller_products({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}products/all-best-sellers/`,
      options
    );
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetAllBestSellerProductsSuccess(response.result));
    } else {
      yield put(
        GetAllBestSellerProductsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetAllBestSellerProductsFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetAllBestSellerProductsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetAllBestSellerProductsFail({ message: "", status: false }));
  }
}

export function* watchGetAllBestSellerProducts() {
  yield takeEvery(GET_ALL_BEST_SELLER_PRODUCTS, get_all_best_seller_products);
}

function* get_under_thousand_products({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}products/underthousand/`,
      options
    );

    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(GetUnderThousandProductsSuccess(response.result));
    } else {
      yield put(
        GetUnderThousandProductsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(GetUnderThousandProductsFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      GetUnderThousandProductsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(GetUnderThousandProductsFail({ message: "", status: false }));
  }
}

export function* watchGetUnderThousandProducts() {
  yield takeEvery(GET_UNDER_THOUSAND_PRODUCTS, get_under_thousand_products);
}

function* post_subscribe_newsletter({ payload, callback }) {
  const options = {
    method: "POST",
    params: {
      email: payload,
    },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}newsletter/subscription/`,
      options
    );
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (callback) callback("success");
    } else {
      if (callback) callback("fail");
    }
  } catch (error) {
    if (callback) callback("fail");
  }
}

export function* watchPostSubscribeNewsletter() {
  yield takeEvery(POST_SUBSCRIBE_NEWSLETTER, post_subscribe_newsletter);
}

function* post_contact_us({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}newsletter/contact-us/`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      // yield put(GetUnderThousandProductsSuccess(response.result));
      if (callback) callback("success");
    } else {
      if (callback) callback("fail");
      // yield put(
      //   GetUnderThousandProductsFail({
      //     message: "Something went Sideways Take a look",
      //     status: true
      //   })
      // );
      // yield put(GetUnderThousandProductsFail({ message: "", status: false }));
    }
  } catch (error) {
    if (callback) callback("fail");
    // let message;
    // if (error.status === 500) {
    //   message = "Internal Server Error";
    // } else {
    //   message = error;
    // }
    // yield put(
    //   GetUnderThousandProductsFail({
    //     message: "Something went Sideways Take a look",
    //     status: true
    //   })
    // );
    // yield put(GetUnderThousandProductsFail({ message: "", status: false }));
  }
}

export function* watchPostContactUs() {
  yield takeEvery(POST_CONTACT_US, post_contact_us);
}

function* post_notify_me({ payload, callback, errorCallback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(fetchJSON, `${url}notify-me/`, options);
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(PostNotifyMeSuccess(response.result));
      if (callback) callback();
    } else {
      yield put(
        PostNotifyMeFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(PostNotifyMeFail({ message: "", status: false }));
      if (errorCallback) errorCallback();
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      PostNotifyMeFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(PostNotifyMeFail({ message: "", status: false }));
    if (errorCallback) errorCallback();
  }
}

export function* watchPostNotifyMe() {
  yield takeEvery(POST_NOTIFY_ME, post_notify_me);
}

function* get_sale_listing({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}sales/`, options);
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getSaleListingSuccess(response.result));
    } else {
      yield put(
        getSaleListingFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getSaleListingFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getSaleListingFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getSaleListingFail({ message: "", status: false }));
  }
}

export function* watchGetSaleProducts() {
  yield takeEvery(GET_SALE_LISTING, get_sale_listing);
}

function* post_track_complaint({ payload: { number, type }, callback }) {
  const options = {
    method: "POST",
    data: {
      type,
      search: number,
    },
  };

  try {
    const response = yield call(fetchJSON, `${url}complaint`, options);
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(postTrackComplaintSuccess(response.result));
    } else {
      yield put(
        postTrackComplaintFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(postTrackComplaintFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      postTrackComplaintFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(postTrackComplaintFail({ message: "", status: false }));
  }
}

export function* watchPostComplaintOrder() {
  yield takeEvery(POST_TRACK_COMPLAINT, post_track_complaint);
}

function* get_complaint({ payload: { id }, callback }) {
  const options = {
    method: "GET",
    params: {
      id,
    },
  };

  try {
    const response = yield call(fetchJSON, `${url}complaint/getorder`, options);
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getComplaintDataSuccess(response.result));
    } else {
      yield put(
        getComplaintDataFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getComplaintDataFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getComplaintDataFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getComplaintDataFail({ message: "", status: false }));
  }
}

export function* watchGetComplaint() {
  yield takeEvery(GET_COMPLAINT_DATA, get_complaint);
}

function* post_track_order({ payload: { number, type }, callback }) {
  const options = {
    method: "POST",
    data: {
      type,
      search: number,
    },
  };

  try {
    const response = yield call(fetchJSON, `${url}track-order`, options);
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(postTrackOrderSuccess(response.result));
    } else {
      yield put(
        postTrackOrderFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(postTrackOrderFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      postTrackOrderFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(postTrackOrderFail({ message: "", status: false }));
  }
}

export function* watchPostTrackOrder() {
  yield takeEvery(POST_TRACK_ORDER, post_track_order);
}

function* post_verify_login({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(fetchJSON, `${url}login/verify-login`, options);
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (callback) callback(response.result, "success");
    } else {
      if (callback) callback(response.result, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostVerifyLogin() {
  yield takeEvery(POST_VERIFY_LOGIN, post_verify_login);
}

function* post_sign_up({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(fetchJSON, `${url}login/registered`, options);
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (response.result.status) {
        saveUserToken(
          response.result.userdata.id,
          response.result.userdata.phone_verified_at ? 1 : 0
        );
        if (callback) callback(response, "success");
      } else {
        if (callback) callback(response, "fail");
      }
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostSignup() {
  yield takeEvery(POST_SIGN_UP, post_sign_up);
}

function* post_verify_pin({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}login/verifyphonecode`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      // saveUserToken(response);
      if (response.result.status) {
        setUserVerified(1);
        if (callback) callback(response, "success");
      } else {
        if (callback) callback(response, "fail");
      }
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostPinVerification() {
  yield takeEvery(POST_VERIFY_PIN, post_verify_pin);
}

function* post_send_pin({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}login/sendphoneverificationcode`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      // saveUserToken(response);
      if (callback) callback(response, "success");
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostSendPin() {
  yield takeEvery(POST_SEND_PIN, post_send_pin);
}

function* post_verify_phone_register({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(fetchJSON, `${url}login/verify-phone`, options);
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      // saveUserToken(response);
      if (callback) callback(response, "success");
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostVerifyPhoneRegister() {
  yield takeEvery(POST_VERIFY_PHONE_REGISTER, post_verify_phone_register);
}

function* post_verify_email({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(fetchJSON, `${url}login/verify-email`, options);
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      // saveUserToken(response);
      if (callback) callback(response, "success");
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostVerifyEmail() {
  yield takeEvery(POST_VERIFY_EMAIL, post_verify_email);
}

function* post_third_party_login({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}login/registeredfromgoogleandfb`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (response.result.status) {
        saveUserToken(
          response.result.userdata.id,
          response.result.userdata.phone_verified_at ? 1 : 0
        );
        if (callback) callback(response, "success");
      } else {
        if (callback) callback(response, "fail");
      }
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostThirdPartyLogin() {
  yield takeEvery(POST_THIRD_PARTY_LOGIN, post_third_party_login);
}

function* post_verify_password({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(fetchJSON, `${url}login`, options);
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (response.result.status) {
        saveUserToken(
          response.result.data.id,
          response.result.data.phone_verified_at ? 1 : 0
        );
        if (callback) callback(response, "success");
      } else {
        if (callback) callback(response, "fail");
      }
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostVerifyPassword() {
  yield takeEvery(POST_VERIFY_PASSWORD, post_verify_password);
}

function* post_reset_password({ payload, callback }) {
  const options = {
    method: "POST",
    data: { ...payload, id: getUserToken() },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}editprofile/updatepassword`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (response.result.status) {
        if (callback) callback(response, "success");
      } else {
        if (callback) callback(response, "fail");
      }
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostResetPassword() {
  yield takeEvery(POST_RESET_PASSWORD, post_reset_password);
}

function* post_verify_phone_reset_password({ payload, callback }) {
  const options = {
    method: "POST",
    data: { phone: payload },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}customer/verifyphoneforresetpassword`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (response.result.status) {
        if (callback) callback(response, "success");
      } else {
        if (callback) callback(response, "fail");
      }
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostVerifyPhoneResetPassword() {
  yield takeEvery(
    POST_VERIFY_PHONE_RESET_PASSWORD,
    post_verify_phone_reset_password
  );
}

function* post_recover_password({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}editprofile/updatenewpassword`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (response.result.status) {
        if (callback) callback(response, "success");
      } else {
        if (callback) callback(response, "fail");
      }
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostRecoverPassword() {
  yield takeEvery(POST_RECOVER_PASSWORD, post_recover_password);
}



function* get_campaign_listing({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}sales/campaign-listing`,
      options
    );
    
    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getCampaignListingSuccess(response.result));
    } else {
      yield put(
        getCampaignListingFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getCampaignListingFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getCampaignListingFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getCampaignListingFail({ message: "", status: false }));
  }
}

export function* watchGetCampaignListing() {
  yield takeEvery(GET_CAMPAIGN_LISTING, get_campaign_listing);
}


function* get_campaign_buy_2_get_1({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}sales/campaign-listing-final-buy-1-get-1-free`,
      options
    );
    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getCampaignBuy2Get1Success(response.result));
    } else {
      yield put(
        getCampaignBuy2Get1Fail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getCampaignBuy2Get1Fail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getCampaignBuy2Get1Fail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getCampaignBuy2Get1Fail({ message: "", status: false }));
  }
}

export function* watchGetCampaignBuy2Get1() {
  yield takeEvery(GET_CAMPAIGN_BUY2_GET_1, get_campaign_buy_2_get_1);
}



function* get_campaign_myster_box({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}sales/mysteryproducts`,
      options
    );
    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getCampaignMysteryBoxSuccess(response.result));
    } else {
      yield put(
        getCampaignMysteryBoxFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getCampaignMysteryBoxFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getCampaignMysteryBoxFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getCampaignMysteryBoxFail({ message: "", status: false }));
  }
}

export function* watchGetCampaignMysterBox() {
  yield takeEvery(GET_CAMPAIGN_MYSTERYBOX, get_campaign_myster_box);
}


function* get_11campaign_flash_sale_listing({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}sales/campaign-nov-flash-sale`,
      options
    );
    // console.log(`${url}sales/campaign-nov-flash-sale`, '`${url}sales/campaign-nov-flash-sale');
    
    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(get11CampaignFlashSaleListingSuccess(response.result));
    } else {
      yield put(
        get11CampaignFlashSaleListingFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(get11CampaignFlashSaleListingFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      get11CampaignFlashSaleListingFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(get11CampaignFlashSaleListingFail({ message: "", status: false }));
  }
}

export function* watchGet11CampaignFlashSaleListing() {
  yield takeEvery(GET_11CAMPAIGN_FLASH_SALE, get_11campaign_flash_sale_listing);
}


function* get_11campaign_listing({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}sales/campaign-nov-final-listing`,
      options
    );
    
    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(get11CampaignListingSuccess(response.result));
    } else {
      yield put(
        get11CampaignListingFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(get11CampaignListingFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      get11CampaignListingFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(get11CampaignListingFail({ message: "", status: false }));
  }
}

export function* watchGet11CampaignListing() {
  yield takeEvery(GET_11CAMPAIGN_LISTING, get_11campaign_listing);
}






function* get_campaign_category_products({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}sales/categories-sale-products`,
      options
    );
    
    if (callback) callback();
    console.log('called called',response);
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getCampaignCategoryProductsSuccess(response.result));
    } else {
      yield put(
        getCampaignCategoryProductsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getCampaignCategoryProductsFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getCampaignCategoryProductsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getCampaignCategoryProductsFail({ message: "", status: false }));
  }
}

export function* watchGetCampaignCategoryProducts() {
  yield takeEvery(GET_CAMPAIGN_CATEGORY_PRODUCTS, get_campaign_category_products);
}


function* get_set_cart({ callback, slug }) {
  let str = window.atob(slug);

  const options = {
    method: "POST",
    data: {pv_ids: str.split(',')},
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}productdetail/get-products-from-ids`,
      options
    );
    
    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getSetCartSuccess(response.result));
    } else {
      yield put(
        getSetCartFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getSetCartFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getSetCartFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getSetCartFail({ message: "", status: false }));
  }
}

export function* watchGetSetCart() {
  yield takeEvery(GET_SET_CART, get_set_cart);
}


function* get_11campaign_brand({ callback, brandSlug }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
    `${url}sales/campaign-listing-final-11-11` ,
      options
    );
    
    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(get11CampaignBrandSuccess(response.result));
    } else {
      yield put(
        get11CampaignBrandFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(get11CampaignBrandFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      get11CampaignBrandFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(get11CampaignBrandFail({ message: "", status: false }));
  }
}

export function* watchGet11CampaignBrand() {
  yield takeEvery(GET_11CAMPAIGN_BRAND, get_11campaign_brand);
}



function* reset_11campaign_brand({ callback, brandSlug }) {
  yield put(reset11CampaignBrandSuccess({}))
}
export function* watchReset11CampaignBrand() {
  yield takeEvery(RESET_11CAMPAIGN_BRAND, reset_11campaign_brand);
}

function* get_liveSessionSale({ callback, brandSlug }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
    `${url}sales/livesession-campaign-listing` ,
      options
    );
    
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getLiveSessionSaleSuccess(response.result));
    } else {
      yield put(
        getLiveSessionSaleFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getLiveSessionSaleFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getLiveSessionSaleFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getLiveSessionSaleFail({ message: "", status: false }));
  }
}

export function* watchGetLiveSessionSale() {
  yield takeEvery(GET_LIVE_SESSION_SALE, get_liveSessionSale);
}


function* get_free_gifts({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}sales/free-gifts`, options);
    if (callback) callback();
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getFreeGiftsSuccess(response.result));
    } else {
      yield put(
        getFreeGiftsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getFreeGiftsFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getFreeGiftsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getFreeGiftsFail({ message: "", status: false }));
  }
}

export function* watchGetFreeGifts() {
  yield takeEvery(GET_FREE_GIFTS, get_free_gifts);
}

export function* get_user_profile({ userId, callback }) {
  const options = {
    method: "GET",
    params: { id: userId },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}editprofile/getcustomerdata`,
      options
    );
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getUserProfileSuccess(response.result.data));
    } else {
      yield put(
        getUserProfileFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getUserProfileFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getUserProfileFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getUserProfileFail({ message: "", status: false }));
  }
}

export function* watchGetUserProfile() {
  yield takeEvery(GET_USER_PROFILE, get_user_profile);
}

// function* update_wishlist({ payload }) {
//   yield put(updateWishlist(payload));
// }

function* fetch_Wishlist({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}customer/getwishlist/${getUserToken()}`,
      options
    );
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getWishlistSuccess(response.result));
    } else {
      yield put(
        getWishlistFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getWishlistFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getWishlistFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getWishlistFail({ message: "", status: false }));
  }
}

export function* watchGetFetchWishlist() {
  yield takeEvery(GET_WISHLIST, fetch_Wishlist);
}

function* Remove_From_Wishlist({ payload, callback }) {
  const options = {
    method: "DELETE",
    params: {
      productVariationId: payload.productVariationId,
      customerId: getUserToken(),
    },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}/customer/deletefromwishlist`,
      options
    );
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(deleteFromWishlistSuccess(payload.productVariationId));
    } else {
      yield put(
        deleteFromWishlistFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(deleteFromWishlistFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      deleteFromWishlistFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(deleteFromWishlistFail({ message: "", status: false }));
  }
}

export function* watchDeleteWishlist() {
  yield takeEvery(DELETE_WISHLIST, Remove_From_Wishlist);
}

function* Add_To_Wishlist({ payload, callback }) {
  const options = {
    method: "POST",
    params: {
      productVariationId: payload.productVariationId,
      customerId: getUserToken(),
    },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}/customer/addtowishlist`,
      options
    );
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(addToWishlistSuccess(payload.productVariationId));
    } else {
      yield put(
        addToWishlistFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(addToWishlistFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      addToWishlistFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(addToWishlistFail({ message: "", status: false }));
  }
}

export function* watchAddToWishlist() {
  yield takeEvery(ADD_WISHLIST, Add_To_Wishlist);
}

function* post_edit_user_profile({ payload, callback }) {
  const options = {
    method: "POST",
    data: { id: getUserToken(), ...payload },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}editprofile/updatecustomerprofile`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (response.result.status) {
        if (callback) callback(response, "success");
        yield put(getUserProfileSuccess(response.result.data));
      } else {
        if (callback) callback(response, "fail");
      }
    } else {
      if (callback) callback(response, "fail");
      yield put(
        getUserProfileFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    if (callback) callback(error, "fail");
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getUserProfileFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchPostEditUserProfile() {
  yield takeEvery(POST_EDIT_USER_PROFILE, post_edit_user_profile);
}

function* post_add_address({ payload, callback }) {
  const options = {
    method: "POST",
    data: { customer_id: getUserToken(), ...payload },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}customeraddresses/addaddress`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (response.result.status) {
        if (callback) callback(response, "success");
        yield put(postAddAddressSuccess(response.result.data));
      } else {
        if (callback) callback(response, "fail");
      }
    } else {
      if (callback) callback(response, "fail");
      yield put(
        postAddAddressFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    if (callback) callback(error, "fail");
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      postAddAddressFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchPostAddAddress() {
  yield takeEvery(POST_ADD_ADDRESS, post_add_address);
}

function* get_my_orders({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}customer/myorders?customer_id=${getUserToken()}`,
      options
    );
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getMyOrdersSuccess(response.result));
    } else {
      yield put(
        getMyOrdersFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getMyOrdersFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getMyOrdersFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getMyOrdersFail({ message: "", status: false }));
  }
}

export function* watchGetMyOrders() {
  yield takeEvery(GET_MY_ORDERS, get_my_orders);
}

function* post_upload_profile_image({ payload: { file }, callback }) {
  const data = new FormData();

  data.append("file", file, file.name);

  const options = {
    method: "POST",
    data: data,
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}editprofile/profile/image`,
      options
    );
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (callback) callback(response, "success");
    } else {
      if (callback) callback(response, "fail");
    }
  } catch (error) {
    if (callback) callback(error, "fail");
  }
}

export function* watchPostUploadProfileImage() {
  yield takeEvery(POST_UPLOAD_PROFILE_IMAGE, post_upload_profile_image);
}

function* post_address_make_default({ payload, callback }) {
  const options = {
    method: "POST",
    data: payload,
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}customeraddresses/makedefault`,
      options
    );
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(postAddressMakeDefaultSuccess(payload));
    } else {
      yield put(
        postAddressMakeDefaultFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(postAddressMakeDefaultFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      postAddressMakeDefaultFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(postAddressMakeDefaultFail({ message: "", status: false }));
  }
}

export function* watchPostAddressMakeDefault() {
  yield takeEvery(POST_ADDRESS_MAKE_DEFAULT, post_address_make_default);
}

function* post_edit_address({ payload, callback }) {
  const options = {
    method: "POST",
    data: { customer_id: getUserToken(), ...payload },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}customeraddresses/updateaddress/${payload.id}`,
      options
    );
    // console.log();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (response.result.status) {
        if (callback) callback(response, "success");
        yield put(postEditAddressSuccess(response.result.data));
      } else {
        if (callback) callback(response, "fail");
      }
    } else {
      if (callback) callback(response, "fail");
      yield put(
        postEditAddressFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    if (callback) callback(error, "fail");
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      postEditAddressFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchPostEditAddress() {
  yield takeEvery(POST_EDIT_ADDRESS, post_edit_address);
}

function* post_delete_address({ payload, callback }) {
  const options = {
    method: "DELETE",
  };
  try {
    const response = yield call(
      fetchJSON,
      `${url}customeraddresses/addressdeletet/${payload.id}`,
      options
    );
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(postDeleteAddressSuccess(payload));
    } else {
      yield put(
        postDeleteAddressFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(postDeleteAddressFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      postDeleteAddressFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(postDeleteAddressFail({ message: "", status: false }));
  }
}

export function* watchPostDeleteAddress() {
  yield takeEvery(POST_DELETE_ADDRESS, post_delete_address);
}


function* fetch_garnier({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}garnier`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getGarnierSuccess(response.result));
      console.log(1);
      if (callback) callback();
    } else {
      yield put(
        getGarnierFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getGarnierFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchGetGarnier() {
  yield takeEvery(GET_GARNIER, fetch_garnier);
}

function* fetch_loreal({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}loreal`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getLorealSuccess(response.result));
      if (callback) callback();
    } else {
      yield put(
        getLorealFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getLorealFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchGetLoreal() {
  yield takeEvery(GET_LOREAL, fetch_loreal);
}


function* fetch_loreal_Extented({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}loreal/extended`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getLorealExtendSuccess(response.result));
      if (callback) callback();
    } else {
      yield put(
        getLorealExtendFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getLorealExtendFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchGetLoreadExtended() {
  yield takeEvery(GET_LOREAL_Extend, fetch_loreal_Extented);
}

function* fetch_Kerastase({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}kerastase/extended`, options);

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getKerastaseSuccess(response.result));
      if (callback) callback();
    } else {
      yield put(
        getKerastageFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getKerastageFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
  }
}

export function* watchGetKerastase() {
  yield takeEvery(GET_KERASTASE, fetch_Kerastase);
}

function* post_complaint_data({ payload, callback }) {
  const options = {
    method: "POST",
    data: { ...payload },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}complaint/place-complaint-order`,
      options
    );

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      // yield put(getLorealExtendSuccess(response.result));
      if (callback) callback(response?.result?.complaintId);
    } else {
      // yield put(
      //   getLorealExtendFail({
      //     message: "Something went Sideways Take a look",
      //     status: true,
      //   })
      // );
    }
  } catch (error) {
    // let message;
    // if (error.status === 500) {
    //   message = "Internal Server Error";
    // } else {
    //   message = error;
    // }
    // yield put(
    //   getLorealExtendFail({
    //     message: "Something went Sideways Take a look",
    //     status: true,
    //   })
    // );
  }
}

export function* watchPostComplaintData() {
  yield takeEvery(POST_COMPLAINT_DATA, post_complaint_data);
}

function* post_complaint_images({ payload, callback }) {
  const options = {
    method: "POST",
    data: { ...payload },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}complaint/order_complaint_image`,
      options
    );

    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      if (callback) callback();
    }
  } catch (error) {}
}

export function* watchPostComplaintImages() {
  yield takeEvery(POST_COMPLAINT_IMAGE, post_complaint_images);
}

function* get_Checkout_products({ callback }) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}sales/cartsuggestionproducts`,
      options
    );
    // console.log();
    if (callback) callback();
    if (response.status.toLocaleLowerCase() === onSucessStatus) {
      yield put(getCheckoutProductsSuccess(response.result));
    } else {
      yield put(
        getCheckoutProductsFail({
          message: "Something went Sideways Take a look",
          status: true,
        })
      );
      yield put(getCheckoutProductsFail({ message: "", status: false }));
    }
  } catch (error) {
    let message;
    if (error.status === 500) {
      message = "Internal Server Error";
    } else {
      message = error;
    }
    yield put(
      getCheckoutProductsFail({
        message: "Something went Sideways Take a look",
        status: true,
      })
    );
    yield put(getCheckoutProductsFail({ message: "", status: false }));
  }
}

export function* watchGetCheckoutProducts() {
  yield takeEvery(GET_CHECKOUT_PRODUCTS, get_Checkout_products);
}
function* Get_miniso_Menu(data) {
  const options = {
    method: "GET",
  };

  try {
    const response = yield call(fetchJSON, `${url}miniso/menu`, options);
    yield put(setMinisoMenu({ minisoMenu: response }));
  } catch (error) {}
}
export function* watchGetMinisoMenu() {
  yield takeEvery(GET_MANISO_MENU, Get_miniso_Menu);
}

function* get_mininos_products({ payload ,callback}) {
  const options = {
    method: "GET",
    params: { slug: payload },
  };
  try {
    const response = yield call(fetchJSON, `${url}miniso/products`, options);
    console.log("response", response);
    if (callback) callback();
    yield put(setMinisoProduct({ minisoProduct: response }));
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetMinisoProduct() {
  yield takeEvery(GET_MINISO_PRODUCTS, get_mininos_products);
}

function* get_miniso_Category({ payload }) {
  const options = {
    method: "GET",
    params: { slug: payload },
  };
  try {
    const response = yield call(
      fetchJSON,
      `${url}miniso/categoryproducts`,
      options
    );
    yield put(
      setMinisoCategory({ minisoCategoryPageProducts: response.result })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetminisocategory() {
  yield takeEvery(GET_MINISO_CATEGORYPRODUCT, get_miniso_Category);
}

function* get_miniso_Subcategory({ payload, callback }) {
  // console.log(payload, "subslugg");
  const options = {
    method: "GET",
    params: { slug: payload },
  };

  try {
    const response = yield call(
      fetchJSON,
      `${url}miniso/subcategoryproducts`,
      options
    );
    if(callback){
      callback()
    }
    // console.log("getMinisoSubCat", response);
    yield put(
      settMinisoSubcategory({ MinisoSubCategoryPageProducts: response.result })
    );
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetminisoSubcategory() {
  yield takeEvery(GET_MINISO_SUBCATEGORY, get_miniso_Subcategory);
}


function* Saga() {
  yield all([
    fork(watchGetMenu),
    fork(watchGetHomeBanner),
    fork(watchGetHomeProducts),
    fork(watchGetCategoryProducts),
    fork(watchGetSubCategoryProducts),
    fork(watchGetBrandListing),
    fork(watchGetBrandPageProducts),
    fork(watchGetBrandPageCategoryList),
    fork(watchGetProductDetail),
    fork(watchPostCheckoutRequest),
    fork(watchGetCitiesListings),
    fork(watchPostAskQuestion),
    fork(watchPostReview),
    fork(watchGetProductReviews),
    fork(watchGetProductQuestions),
    fork(watchPostVerifyStock),
    fork(watchPostVerifyPhone),
    fork(watchGetSubcategoryFeatures),
    fork(watchfetchSearchResult),
    fork(watchGetBestSellerProducts),
    fork(watchGetFlashSaleProducts),
    fork(watchProductDetailSimilarProducts),
    fork(watchGetNewArrivalProducts),
    fork(watchGetAllBestSellerProducts),
    fork(watchGetUnderThousandProducts),
    fork(watchPostSubscribeNewsletter),
    fork(watchPostContactUs),
    fork(watchGetSearchListingProduct),
    fork(watchPostNotifyMe),
    fork(watchGetSaleProducts),
    fork(watchPostTrackOrder),
    fork(watchPostVerifyLogin),
    fork(watchPostSignup),
    fork(watchPostRecoverPassword),
    fork(watchGetCampaignListing),
    fork(watchGetFreeGifts),
    fork(watchPostThirdPartyLogin),
    fork(watchPostVerifyPassword),
    fork(watchPostVerifyEmail),
    fork(watchPostVerifyPhoneRegister),
    fork(watchGetFetchWishlist),
    fork(watchPostPinVerification),
    fork(watchPostSendPin),
    fork(watchGetUserProfile),
    fork(watchPostEditUserProfile),
    fork(watchPostAddAddress),
    fork(watchGetMyOrders),
    fork(watchDeleteWishlist),
    fork(watchPostResetPassword),
    fork(watchPostVerifyPhoneResetPassword),
    fork(watchAddToWishlist),
    fork(watchPostUploadProfileImage),
    fork(watchPostAddressMakeDefault),
    fork(watchPostEditAddress),
    fork(watchPostDeleteAddress),
    fork(watchGetLoreal),
    fork(watchGetGarnier),
    fork(watchGetLoreadExtended),
    fork(watchGetKerastase),
    fork(watchPostComplaintOrder),
    fork(watchGetComplaint),
    fork(watchPostComplaintData),
    fork(watchPostComplaintImages),
    fork(watchGetCheckoutProducts),
    fork(watchGetMinisoMenu),
    fork(watchGetMinisoProduct),
    fork(watchGetminisocategory),
    fork(watchGetminisoSubcategory),
    fork(watchGet11CampaignFlashSaleListing),
    fork(watchGet11CampaignListing),
    fork(watchGet11CampaignBrand),
    fork(watchReset11CampaignBrand),
    fork(watchGetCampaignBuy2Get1),
    fork(watchGetLiveSessionSale),
    fork(watchGetCampaignMysterBox),
    fork(watchGetSetCart),
    fork(watchGetCampaignCategoryProducts),
    
    
  ]);
}

export const customRequest = ({
  action,
  data,
  file,
  filename,
  headers,
  onError,
  onProgress,
  onSuccess,
  withCredentials,
}) => {
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });
  }
  formData.append(filename, file);

  axios
    .post(`${url}complaint/complaintimage`, formData, {
      withCredentials,
      headers,
      onUploadProgress: ({ total, loaded }) => {
        onProgress(
          { percent: Math.round((loaded / total) * 100).toFixed(2) },
          file
        );
      },
    })
    .then(({ data: response }) => {
      onSuccess({ ...file, ...response });
    })
    .catch(() => onError(file));

  return {
    abort() {
      console.log("upload progress is aborted.");
    },
  };
};



export const payNow = async (formData) =>{
  let trId = null
 await axios.post(`https://backoffice.aodour.pk/api/bank_payment`, formData, {
    headers: {
      'Accept': "application/json",
      // crossdomain: true
    }
  }).then(res => {
    if (res.data.result == 'SUCCESS') {
      trId = res.data.transaction.id;
      // setDisabled(true) 
    } else {
      notification({ message: 'Invalid Card Details', error: true, })
    }
  }).catch((err) => {
    notification({ message: 'Something went wrong, Try again', error: true, })
    // console.log(err, 'erro while  transaction');
  })
  return trId
}


export const checkStockAvailablity =async (formData) =>{
  let available = false
 await axios.post(`${url}checkout/check-product-stock`, {"cartList": formData}, {
    headers: {
      'Accept': "application/json",
      crossdomain: true
    }
  }).then(res => {
    if (res.data) {
      console.log(res.data, 'res.data of');
      
      available = res.data.result.length === 0;
    } else {
      notification({ message: 'Product is Out of Stock', error: true, })
    }
  }).catch((err) => {
    // console.log(err, 'erro while  transaction');
  })
  return available
}


export default Saga;
