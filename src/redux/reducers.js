// @flow
import {
  GET_MENU,
  GET_MENU_FAILED,
  GET_MENU_SUCCESS,
  GET_HOMEPAGE_BANNER,
  GET_HOMEPAGE_BANNER_FAILED,
  GET_HOMEPAGE_BANNER_SUCCESS,
  GET_HOMEPAGE_PRODUCTS,
  GET_HOMEPAGE_PRODUCTS_FAILED,
  GET_HOMEPAGE_PRODUCTS_SUCCESS,
  GET_CATEGORY_PRODUCTS,
  GET_CATEGORY_PRODUCTS_FAILED,
  GET_CATEGORY_PRODUCTS_SUCCESS,
  GET_SUBCATEGORY_PRODUCTS,
  GET_SUBCATEGORY_PRODUCTS_FAILED,
  GET_SUBCATEGORY_PRODUCTS_SUCCESS,
  GET_BRANDLISTING,
  GET_BRANDLISTING_SUCCESS,
  GET_BRANDLISTING_FAILED,
  GET_BRAND_PAGE_PRODUCTS,
  GET_BRAND_PAGE_PRODUCTS_SUCCESS,
  GET_BRAND_PAGE_PRODUCTS_FAILED,
  GET_BRAND_PAGE_CATEGORY_LIST,
  GET_BRAND_PAGE_CATEGORY_LIST_SUCCESS,
  GET_BRAND_PAGE_CATEGORY_LIST_FAILED,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  GET_SEARCH_RESULT_EMPTY,
  INCREMENT_DECREMENT_QANTITY,
  POST_CHECKOUT_REQUEST_FAIL,
  POST_CHECKOUT_REQUEST,
  POST_CHECKOUT_REQUEST_SUCCESS,
  GET_CITIES_LISTINGS,
  GET_CITIES_LISTINGS_SUCCESS,
  GET_CITIES_LISTINGS_FAIL,
  POST_ASK_QUESTION,
  POST_ASK_QUESTION_FAIL,
  POST_ASK_QUESTION_SUCCESS,
  POST_REVIEW,
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAIL,
  GET_PRODUCT_REVIEWS_FAIL,
  GET_PRODUCT_REVIEWS_SUCCESS,
  GET_PRODUCT_REVIEWS,
  GET_PRODUCT_QUESTIONS_FAIL,
  GET_PRODUCT_QUESTIONS_SUCCESS,
  GET_PRODUCT_QUESTIONS,
  POST_VERIFY_STOCK,
  POST_VERIFY_STOCK_SUCCESS,
  POST_VERIFY_STOCK_FAIL,
  GET_UNDER_THOUSAND_PRODUCTS,
  POST_VERIFY_PHONE_SUCCESS,
  POST_VERIFY_PHONE_FAIL,
  GET_SUBCATEGORY_FEATURES_FAIL,
  GET_SUBCATEGORY_FEATURES_SUCCESS,
  GET_SEARCH_RESULT,
  GET_SEARCH_RESULT_SUCCESS,
  BRAND_PAGE_EMPTY,
  GET_SEARCH_RESULT_FAILED,
  EMPTY_PRODUCT_DETAIL,
  POST_VERIFY_PHONE,
  GET_BEST_SELLER_PRODUCTS,
  GET_BEST_SELLER_PRODUCTS_SUCCESS,
  GET_BEST_SELLER_PRODUCTS_FAIL,
  GET_FLASH_SALE_PRODUCTS_SUCCESS,
  GET_FLASH_SALE_PRODUCTS_FAIL,
  GET_SUBCATEGORY_FEATURES,
  GET_PRODUCT_DETAIL_SIMILAR_PRODUCTS,
  GET_PRODUCT_DETAIL_SIMILAR_PRODUCTS_FAIL,
  GET_PRODUCT_DETAIL_SIMILAR_PRODUCTS_SUCCESS,
  GET_NEW_ARRIVAL_PRODUCTS_SUCCESS,
  GET_NEW_ARRIVAL_PRODUCTS_FAIL,
  GET_NEW_ARRIVAL_PRODUCTS,
  GET_FLASH_SALE_PRODUCTS,
  GET_ALL_BEST_SELLER_PRODUCTS,
  GET_ALL_BEST_SELLER_PRODUCTS_SUCCESS,
  GET_ALL_BEST_SELLER_PRODUCTS_FAIL,
  GET_UNDER_THOUSAND_PRODUCTS_SUCCESS,
  GET_UNDER_THOUSAND_PRODUCTS_FAIL,
  PRODUCT_DETAIL_PAGE_EMPTY,
  POST_NOTIFY_ME_SUCCESS,
  POST_NOTIFY_ME_FAIL,
  POST_NOTIFY_ME,
  GET_SEARCH_LISTING_PRODUCTS,
  GET_SEARCH_LISTING_PRODUCTS_SUCCESS,
  GET_SEARCH_LISTING_PRODUCTS_FAILED,
  RESTORE_CART,
  GET_WISHLIST_SUCCESS,
  GET_WISHLIST_FAIL,
  EMPTY_CART,
  SUBCATEGORY_PAGE_EMPTY,
  EMPTY_CATEGORY_PRODUCTS,
  GET_SALE_LISTING_SUCCESS,
  GET_SALE_LISTING_FAIL,
  POST_TRACK_ORDER,
  POST_TRACK_ORDER_SUCCESS,
  POST_TRACK_ORDER_FAIL,
  POST_LOGIN_SUCCESS,
  POST_LOGIN_FAIL,
  POST_SIGN_UP_SUCCESS,
  POST_SIGN_UP_FAIL,
  POST_RECOVER_PASSWORD_SUCCESS,
  POST_RECOVER_PASSWORD_FAIL,
  GET_CAMPAIGN_LISTING_SUCCESS,
  GET_CAMPAIGN_LISTING_FAIL,
  GET_FREE_GIFTS_SUCCESS,
  GET_FREE_GIFTS_FAIL,
  POST_VERIFY_PASSWORD_SUCCESS,
  POST_VERIFY_PASSWORD_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  POST_EDIT_USER_PROFILE_SUCCESS,
  POST_EDIT_USER_PROFILE_FAIL,
  POST_ADD_ADDRESS_SUCCESS,
  POST_ADD_ADDRESS_FAIL,
  GET_MY_ORDERS_SUCCESS,
  GET_MY_ORDERS_FAIL,
  DELETE_WISHLIST_SUCCESS,
  DELETE_WISHLIST_FAIL,
  ADD_WISHLIST_SUCCESS,
  ADD_WISHLIST_FAIL,
  EMPTY_USER,
  POST_ADDRESS_MAKE_DEFAULT_SUCCESS,
  POST_ADDRESS_MAKE_DEFAULT_FAIL,
  POST_DELETE_ADDRESS_SUCCESS,
  POST_DELETE_ADDRESS_FAIL,
  POST_EDIT_ADDRESS_SUCCESS,
  POST_EDIT_ADDRESS_FAIL,
  GET_LOREAL_SUCCESS,
  GET_LOREAL_FAIL,
  GET_GARNIER_SUCCESS,
  GET_GARNIER_FAIL,
  GET_LOREAL_Extend_SUCCESS,
  GET_KERASTASE_FAIL,
  GET_KERASTASE_SUCCESS,
  POST_TRACK_COMPLAINT_FAIL,
  GET_COMPLAINT_DATA_SUCCESS,
  GET_CHECKOUT_PRODUCTS_SUCCESS,
  GET_CHECKOUT_PRODUCTS_FAIL,
  SET_MANISO_MENU,
  SET_MINISO_PRODUCT,
  SET_MINISO_CATEGORYPRODUCT,
  SET_MINISO_SUBCATEGORY,
  MINISO_SUBCATEGORY_PAGE_EMPTY,

  GET_11CAMPAIGN_FLASH_SALE,
  GET_11CAMPAIGN_FLASH_SALE_FAILED,
  GET_11CAMPAIGN_FLASH_SALE_SUCCESS,


  GET_CAMPAIGN_CATEGORY_PRODUCTS_FAILED,
  GET_CAMPAIGN_CATEGORY_PRODUCTS_SUCCESS,

  GET_11CAMPAIGN_LISTING_FAILED,
  GET_11CAMPAIGN_LISTING_SUCCESS,


  GET_SET_CART,
  GET_SET_CART_FAILED,
  GET_SET_CART_SUCCESS,


  GET_11CAMPAIGN_BRAND,
  GET_11CAMPAIGN_BRAND_FAILED,
  GET_11CAMPAIGN_BRAND_SUCCESS,

  GET_LIVE_SESSION_SALE,
  GET_LIVE_SESSION_SALE_FAILED,
  GET_LIVE_SESSION_SALE_SUCCESS,


  GET_CAMPAIGN_BUY2_GET_1,
  GET_CAMPAIGN_BUY2_GET_1_FAIL,
  GET_CAMPAIGN_BUY2_GET_1_SUCCESS,

  GET_CAMPAIGN_MYSTERYBOX,
  GET_CAMPAIGN_MYSTERYBOX_FAIL,
  GET_CAMPAIGN_MYSTERYBOX_SUCCESS,



} from "../constants/actionTypes";

import {
  addtocart,
  BuyOneGetOneFree,
  removefromcard,
  QTYChanges,
  emptyCartData,
  checkCartItemsExpiry,
  putCartData,
} from "../util";
import { deleteFromWishlistFail } from "./actions";
import { GET_LOREAL_Extend } from "./../constants/actionTypes";
import { GET_LOREAL_Extend_FAIL } from "./../constants/actionTypes";
import { POST_TRACK_COMPLAINT_SUCCESS } from "./../constants/actionTypes";
import { GET_COMPLAINT_DATA_FAIL } from "./../constants/actionTypes";

const INIT_STATE = {
  loading: 0,
  Products: [],
  searchResult: {
    brands: [],
    categories: [],
    subcategories: [],
    subsubcategories: [],
    products: [],
  },
  cartList: [],
  menu: {
    brands: { all_brands: [], new_brands: [], popular_brands: [] },
    category: { categories: [], subcategories: [], subsubcategories: [] },
  },
  error: { status: false, message: "" },
  homePageBanners: {
    sliders: [],
    main_banners: [],
    top_seller_banners: [],
    section_banner: [],
    brands_slider: [],
    hot_categories: [],
  },
  BrandListing: { all_brands: [], brands_slider: [] },
  homePageProducts: {
    newArrival: [],
    bestSellerProducts: [],
    flashSaleProducts: { today: [], tomorrow: [] },
  },
  categoryPageProducts: { product: [], category: [{}] },
  subCategoryPageProducts: { products: [], subcategory: [{}] },
  categoryPageFilter: [],
  brandPageFilters: [],
  brandPageProducts: { products: [], features: [], brand: [{}] },
  brandPageCategoryList: [],
  productDetailPage: { product_variations: [], product: [{}], features: [] },
  similarProducts: [],
  checkoutResponse: {},
  checkoutCities: [],
  askQuestionResponse: {},
  postReviewResponse: {},
  productReviews: [],
  productQuestions: [],
  verifyStockResponse: [],
  verifyPhoneResponse: {},
  subcategoryFeatures: [],
  newArrivalProducts: { products: [], banner: {} },
  allBestSellerProducts: { products: [], banner: {} },
  underThousandProducts: { products: [], banner: {} },
  notifyMeResponse: {},
  wishlist: [],
  saleProducts: { products: [], banner: {} },
  trackOrderResponse: { orders: [] },
  trackComplaintResponse: { orders: [] },
  loginResponse: {},
  signupResponse: {},
  recoverPasswordResponse: {},
  campaignProducts: { products: [] },
  campaign11FlashSale: { products: [] },
  freeGifts: { gifts: [] },
  user: { address: [] },
  myOrders: [],
  garnier: {},
  loreal: {},
  lorealExtend: {},
  kerastase: {},
  checkoutProdcuts: {},

  compliantFromData: {},
  minisoMenu: {},
  minisoProduct: {},
  minisoCategoryPageProducts: { product: [], category: [{}] },
  // subCategoryPageProducts: { products: [], subcategory: [{}] },
  MinisoSubCategoryPageProducts: { products: [], subcategory: [{}] },

  campaign11: {},
  campaign11Brand: { products: [] },
  campaignBuy2Get1: { products: [] },

  liveSessionSale: {},
  campaignMysterBoxes: {},
  campaignCategoryProducts: [],
};

const Auth = (state = INIT_STATE, action) => {
  switch (action.type) {
    // case GET_MENU:
    // case GET_SEARCH_RESULT:
    // case GET_HOMEPAGE_BANNER:
    // case GET_HOMEPAGE_PRODUCTS:
    // case GET_CATEGORY_PRODUCTS:
    // case GET_SUBCATEGORY_PRODUCTS:
    // case GET_PRODUCT_DETAIL:
    // case GET_BRANDLISTING:
    // case GET_BRAND_PAGE_CATEGORY_LIST:
    // case GET_BRAND_PAGE_PRODUCTS:
    // case POST_CHECKOUT_REQUEST:
    // case GET_PRODUCT_QUESTIONS:
    // case GET_UNDER_THOUSAND_PRODUCTS:
    // case POST_ASK_QUESTION:
    // case GET_NEW_ARRIVAL_PRODUCTS:
    // case GET_BEST_SELLER_PRODUCTS:
    // case GET_CITIES_LISTINGS:
    // case GET_PRODUCT_REVIEWS:
    // case POST_REVIEW:
    // case GET_SUBCATEGORY_FEATURES:
    // case POST_VERIFY_STOCK:
    // case POST_CHECKOUT_REQUEST:
    // case GET_FLASH_SALE_PRODUCTS:
    // case GET_QUESTIONS:
    // case GET_ALL_BEST_SELLER_PRODUCTS:
    // case POST_VERIFY_PHONE:
    // case GET_PRODUCT_DETAIL_SIMILAR_PRODUCTS:
    // case POST_NOTIFY_ME:
    case GET_LOREAL_SUCCESS:
      return { ...state, loreal: action.payload };
    case GET_LOREAL_FAIL:
      return { ...state, loreal: action.payload };
    case GET_GARNIER_SUCCESS:
      console.log(action.payload,"action.payload");
      return { ...state, garnier: action.payload };
    case GET_GARNIER_FAIL:
      return { ...state, garnier: action.payload };    
    case GET_KERASTASE_SUCCESS:
      return { ...state, kerastase: action.payload };
    case GET_KERASTASE_FAIL:
      return { ...state, kerastase: action.payload };

    case GET_LOREAL_Extend_SUCCESS:
      return { ...state, lorealExtend: action.payload };
    case GET_LOREAL_Extend_FAIL:
      return { ...state, lorealExtend: action.payload };

    case GET_CHECKOUT_PRODUCTS_SUCCESS:
      return { ...state, checkoutProdcuts: action.payload };
    case GET_CHECKOUT_PRODUCTS_FAIL:
      return { ...state, checkoutProdcuts: action.payload };

    case GET_SEARCH_LISTING_PRODUCTS:
      return { ...state, loading: ++state.loading };

    case ADD_TO_CART:
      
      return {
        ...state,
        cartList: BuyOneGetOneFree(addtocart(state.cartList, action.payload)),
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartList: BuyOneGetOneFree(
          removefromcard(state.cartList, action.payload)
        ),
      };
    case INCREMENT_DECREMENT_QANTITY:
      return {
        ...state,
        cartList: BuyOneGetOneFree(QTYChanges(state.cartList, action.payload)),
      };

    case GET_WISHLIST_SUCCESS:
      return { ...state, wishlist: action.payload };
    case GET_WISHLIST_FAIL:
      return { ...state, error: action.payload };

    case DELETE_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product.variations.id !== action.payload
        ),
        productDetailPage: {
          ...state.productDetailPage,
          product_variations: state.productDetailPage.product_variations.map(
            (v) => {
              if (v.id === action.payload) {
                return { ...v, wishlistStatus: false, currentlySelected: true };
              }
              return { ...v, wishlistStatus: false, currentlySelected: false };
            }
          ),
        },
      };
    case DELETE_WISHLIST_FAIL:
      return { ...state, error: action.payload };

    case ADD_WISHLIST_SUCCESS:
      return {
        ...state,
        productDetailPage: {
          ...state.productDetailPage,
          product_variations: state.productDetailPage.product_variations.map(
            (v) => {
              if (v.id === action.payload) {
                return { ...v, wishlistStatus: true, currentlySelected: true };
              }
              return { ...v, wishlistStatus: false, currentlySelected: false };
            }
          ),
        },
      };
    case ADD_WISHLIST_FAIL:
      return { ...state, error: action.payload };

    case GET_MENU_SUCCESS:
      return { ...state, menu: action.payload };
    case GET_MENU_FAILED:
      return { ...state, error: action.payload };

    case GET_HOMEPAGE_BANNER_SUCCESS:
      return {
        ...state,
        homePageBanners: action.payload,
      };
    case GET_HOMEPAGE_BANNER_FAILED:
      return { ...state, error: action.payload };

    case GET_HOMEPAGE_PRODUCTS_SUCCESS:
      return {
        ...state,
        homePageProducts: {
          ...state.homePageProducts,
          newArrival: action.payload.products,
        },
      };
    case GET_HOMEPAGE_PRODUCTS_FAILED:
      return { ...state, error: action.payload };

    case GET_CATEGORY_PRODUCTS_SUCCESS:
      return {
        ...state,
        categoryPageProducts: action.payload,
      };
    case GET_CATEGORY_PRODUCTS_FAILED:
      return { ...state, error: action.payload };

    case GET_SUBCATEGORY_PRODUCTS_SUCCESS:
      return {
        ...state,
        subCategoryPageProducts: action.payload,
      };
    case GET_SUBCATEGORY_PRODUCTS_FAILED:
      return { ...state, error: action.payload };

    case GET_BRANDLISTING_SUCCESS:
      return {
        ...state,
        BrandListing: action.payload,
      };
    case GET_BRANDLISTING_FAILED:
      return { ...state, error: action.payload };

    case GET_BRAND_PAGE_PRODUCTS_SUCCESS:
      return {
        ...state,
        brandPageProducts: action.payload,
      };
    case GET_BRAND_PAGE_PRODUCTS_FAILED:
      return { ...state, error: action.payload };

    case GET_BRAND_PAGE_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        brandPageCategoryList: action.payload,
      };
    case GET_BRAND_PAGE_CATEGORY_LIST_FAILED:
      return { ...state, error: action.payload };

    case GET_COMPLAINT_DATA_SUCCESS:
      return {
        ...state,
        compliantFromData: action.payload,
      };
    case GET_COMPLAINT_DATA_FAIL:
      return { ...state, error: action.payload };
    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        productDetailPage: action.payload,
      };
    case GET_PRODUCT_DETAIL_FAIL:
      return { ...state, error: action.payload };

    case POST_CHECKOUT_REQUEST_SUCCESS:
      emptyCartData();
      return {
        ...state,
        checkoutResponse: action.payload,
      };
    case POST_CHECKOUT_REQUEST_FAIL:
      return { ...state, error: action.payload };

    case GET_CITIES_LISTINGS_SUCCESS:
      return {
        ...state,
        checkoutCities: action.payload,
      };
    case GET_CITIES_LISTINGS_FAIL:
      return { ...state, error: action.payload };

    case POST_ASK_QUESTION_SUCCESS:
      return {
        ...state,
        productQuestions: [...state.productQuestions, action.payload],
      };
    case POST_ASK_QUESTION_FAIL:
      return { ...state, error: action.payload };

    case POST_REVIEW_SUCCESS:
      return {
        ...state,
        productReviews: [...state.productReviews, action.payload],
      };
    case POST_REVIEW_FAIL:
      return { ...state, error: action.payload };

    case GET_PRODUCT_QUESTIONS_SUCCESS:
      return {
        ...state,
        productQuestions: action.payload,
      };

    case GET_PRODUCT_QUESTIONS_FAIL:
      return { ...state, error: action.payload };

    case GET_PRODUCT_REVIEWS_SUCCESS:
      return {
        ...state,
        productReviews: action.payload,
      };

    case GET_PRODUCT_REVIEWS_FAIL:
      return { ...state, error: action.payload };

    case POST_VERIFY_STOCK_SUCCESS:
      return {
        ...state,
        verifyStockResponse: action.payload,
      };

    case POST_VERIFY_STOCK_FAIL:
      return { ...state, error: action.payload };

    case POST_VERIFY_PHONE_SUCCESS:
      return {
        ...state,
        verifyPhoneResponse: action.payload,
      };

    case POST_VERIFY_PHONE_FAIL:
      return { ...state, error: action.payload };

    case GET_SUBCATEGORY_FEATURES_SUCCESS:
      return {
        ...state,
        subcategoryFeatures: action.payload.features,
      };

    case GET_SUBCATEGORY_FEATURES_FAIL:
      return { ...state, error: action.payload };

    case GET_SEARCH_RESULT_SUCCESS:
      return {
        ...state,
        searchResult: action.payload,
      };
    case GET_SEARCH_RESULT_FAILED:
      return { ...state, error: action.payload };

    case GET_BEST_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        homePageProducts: {
          ...state.homePageProducts,
          bestSellerProducts: action.payload.products,
        },
      };
    case GET_BEST_SELLER_PRODUCTS_FAIL:
      return { ...state, error: action.payload };

    case GET_FLASH_SALE_PRODUCTS_SUCCESS:
      return {
        ...state,
        homePageProducts: {
          ...state.homePageProducts,
          flashSaleProducts: action.payload,
        },
      };
    case GET_FLASH_SALE_PRODUCTS_FAIL:
      return { ...state, error: action.payload };

    case GET_PRODUCT_DETAIL_SIMILAR_PRODUCTS_SUCCESS:
      return {
        ...state,
        similarProducts: action.payload,
      };
    case GET_PRODUCT_DETAIL_SIMILAR_PRODUCTS_FAIL:
      return { ...state, error: action.payload };

    case GET_NEW_ARRIVAL_PRODUCTS_SUCCESS:
      return {
        ...state,
        newArrivalProducts: action.payload,
      };
    case GET_NEW_ARRIVAL_PRODUCTS_FAIL:
      return { ...state, error: action.payload };

    case GET_ALL_BEST_SELLER_PRODUCTS_SUCCESS:
      return {
        ...state,
        allBestSellerProducts: action.payload,
      };
    case GET_ALL_BEST_SELLER_PRODUCTS_FAIL:
      return { ...state, error: action.payload };

    case GET_UNDER_THOUSAND_PRODUCTS_SUCCESS:
      return {
        ...state,
        underThousandProducts: action.payload,
      };
    case GET_UNDER_THOUSAND_PRODUCTS_FAIL:
      return { ...state, error: action.payload };

    case POST_NOTIFY_ME_SUCCESS:
      return {
        ...state,
        notifyMeResponse: action.payload,
      };
    case POST_NOTIFY_ME_FAIL:
      return { ...state, error: action.payload };

    case GET_SEARCH_LISTING_PRODUCTS_SUCCESS:
      const searchProducts = action.payload.filter((p) => p !== null);

      return {
        ...state,
        Products: searchProducts,
        loading: --state.loading,
      };
    case GET_SEARCH_LISTING_PRODUCTS_FAILED:
      return { ...state, error: action.payload };

    case GET_SALE_LISTING_SUCCESS:
      return {
        ...state,
        saleProducts: action.payload,
      };
    case GET_SALE_LISTING_FAIL:
      return { ...state, error: action.payload };

    case POST_TRACK_ORDER_SUCCESS:
      return {
        ...state,
        trackOrderResponse: action.payload,
      };
    case POST_TRACK_ORDER_FAIL:
      return { ...state, error: action.payload };

    case POST_TRACK_COMPLAINT_SUCCESS:
      return {
        ...state,
        trackComplaintResponse: action.payload,
      };
    case POST_TRACK_COMPLAINT_FAIL:
      return { ...state, error: action.payload };

    // case POST_LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     loginResponse: action.payload,
    //   };
    // case POST_LOGIN_FAIL:
    //   return { ...state, error: action.payload };

    case POST_VERIFY_PASSWORD_SUCCESS:
      return {
        ...state,
        loginResponse: action.payload,
      };
    case POST_VERIFY_PASSWORD_FAIL:
      return { ...state, error: action.payload };

    case POST_SIGN_UP_SUCCESS:
      return {
        ...state,
        signupResponse: action.payload,
      };
    case POST_SIGN_UP_FAIL:
      return { ...state, error: action.payload };

    case POST_RECOVER_PASSWORD_SUCCESS:
      return {
        ...state,
        recoverPasswordResponse: action.payload,
      };
    case POST_RECOVER_PASSWORD_FAIL:
      return { ...state, error: action.payload };

    case GET_CAMPAIGN_LISTING_SUCCESS:
      return {
        ...state,
        campaignProducts: action.payload,
      };
    case GET_CAMPAIGN_LISTING_FAIL:
      return { ...state, error: action.payload };

    case GET_FREE_GIFTS_SUCCESS:
      return {
        ...state,
        freeGifts: action.payload,
      };
    case GET_FREE_GIFTS_FAIL:
      return { ...state, error: action.payload };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USER_PROFILE_FAIL:
      return { ...state, error: action.payload };

    case POST_EDIT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    case POST_EDIT_USER_PROFILE_FAIL:
      return { ...state, error: action.payload };

    case POST_ADD_ADDRESS_SUCCESS:
      const user = state.user;
      return {
        ...state,
        user: { ...user, address: action.payload },
      };
    case POST_ADD_ADDRESS_FAIL:
      return { ...state, error: action.payload };

    case GET_MY_ORDERS_SUCCESS:
      return {
        ...state,
        myOrders: action.payload.orders,
      };
    case GET_MY_ORDERS_FAIL:
      return { ...state, error: action.payload };

    case POST_ADDRESS_MAKE_DEFAULT_SUCCESS:
      const newAddresses = state.user.address
        ? state.user.address.map((addr) => {
          if (addr.id === action.payload.id) {
            return { ...addr, default: 1 };
          } else {
            return { ...addr, default: 0 };
          }
        })
        : [];
      return {
        ...state,
        user: { ...state.user, address: newAddresses },
      };
    case POST_ADDRESS_MAKE_DEFAULT_FAIL:
      return { ...state, error: action.payload };

    case POST_DELETE_ADDRESS_SUCCESS:
      const filteredAddresses = state.user.address
        ? state.user.address.filter((addr) => {
          if (addr.id === action.payload.id) {
            return false;
          } else {
            return true;
          }
        })
        : [];
      return {
        ...state,
        user: { ...state.user, address: filteredAddresses },
      };
    case POST_DELETE_ADDRESS_FAIL:
      return { ...state, error: action.payload };

    case POST_EDIT_ADDRESS_SUCCESS:
      const addressIndex = state.user.address
        ? state.user.address.findIndex((addr) => {
          if (addr.id === action.payload.id) {
            return true;
          } else {
            return false;
          }
        })
        : [];

      const before = state.user.address.slice(0, addressIndex);
      const after = state.user.address.slice(addressIndex + 1);
      let addresses = [...before, action.payload, ...after];

      if (action.payload.default === 1) {
        addresses = addresses.map((addr) => {
          if (addr.id === action.payload.id) {
            return addr;
          } else {
            return { ...addr, default: 0 };
          }
        });
      }

      return {
        ...state,
        user: { ...state.user, address: addresses },
      };
    case POST_EDIT_ADDRESS_FAIL:
      return { ...state, error: action.payload };

    //Reducre with out netword request probably to empty states
    case GET_SEARCH_RESULT_EMPTY:
      return { ...state, searchResult: action.payload };
    case RESTORE_CART:
      let list = action.payload;
      putCartData(checkCartItemsExpiry(list));
      return { ...state, cartList: BuyOneGetOneFree(list) };
    case EMPTY_CART:
      return { ...state, cartList: [] };
    case EMPTY_USER:
      return { ...state, user: {} };
    case PRODUCT_DETAIL_PAGE_EMPTY:
      return {
        ...state,
        similarProducts: [],
        productDetailPage: {
          product_variations: [],
          product: [],
          features: [],
        },
        productReviews: [],
        productQuestions: [],
      };
    case BRAND_PAGE_EMPTY:
      return {
        ...state,
        brandPageProducts: { products: [], features: [], brand: [{}] },
        brandPageCategoryList: [],
      };

    case SUBCATEGORY_PAGE_EMPTY:
      return {
        ...state,
        subCategoryPageProducts: { products: [], subcategory: [{}] },
      };

    case EMPTY_CATEGORY_PRODUCTS:
      return {
        ...state,
        categoryPageProducts: { product: [], category: [{}] },
      };
    case SET_MANISO_MENU:
      return {
        ...state,
        minisoMenu: action.payload,
      };
    case SET_MINISO_PRODUCT:
      return {
        ...state,
        minisoProduct: action.payload,
      };
    case SET_MINISO_CATEGORYPRODUCT:
      return {
        ...state,
        minisoCategoryPageProducts: action.payload.minisoCategoryPageProducts,
      };
    case SET_MINISO_SUBCATEGORY:
      return {
        ...state,
        MinisoSubCategoryPageProducts:
          action.payload.MinisoSubCategoryPageProducts,
      };

    case MINISO_SUBCATEGORY_PAGE_EMPTY:
      return {
        ...state,
        // subCategoryPageProducts: { products: [], subcategory: [{}] },
      };

    case GET_11CAMPAIGN_FLASH_SALE_SUCCESS:
      return {
        ...state,
        campaign11FlashSale: action.payload,
      };
    case GET_11CAMPAIGN_FLASH_SALE_FAILED:
      return { ...state, error: action.payload };




    case GET_CAMPAIGN_CATEGORY_PRODUCTS_SUCCESS:
      console.log('campaignCategoryProducts reducer', action.payload);
      
      return {
        ...state,
        campaignCategoryProducts: action.payload.products && action.payload.products,
      };
    case GET_CAMPAIGN_CATEGORY_PRODUCTS_FAILED:
      return { ...state, error: action.payload };


    case GET_11CAMPAIGN_LISTING_SUCCESS:
      return {
        ...state,
        campaign11: action.payload,
      };
    case GET_11CAMPAIGN_LISTING_FAILED:
      return { ...state, error: action.payload };


      case GET_SET_CART_SUCCESS:
        
        let prList = action.payload.product_variations;
        let products = prList.map(item => {
          return {
            ...item,
            qty: 1,
          }
        })
        return {
          ...state,
          cartList: products,
        };
      case GET_SET_CART_FAILED:
        return { ...state, error: action.payload };
  

    case GET_11CAMPAIGN_BRAND_SUCCESS:
      return {
        ...state,
        campaign11Brand: action.payload,
      };
    case GET_11CAMPAIGN_BRAND_FAILED:
      return { ...state, error: action.payload };


    case GET_LIVE_SESSION_SALE_SUCCESS:
      return {
        ...state,
        liveSessionSale: action.payload,
      };
    case GET_LIVE_SESSION_SALE_FAILED:
      return { ...state, error: action.payload };


    case GET_CAMPAIGN_BUY2_GET_1_SUCCESS:
      return {
        ...state,
        campaignBuy2Get1: action.payload && action.payload.products ? action.payload : { products: [] },
      };
    case GET_CAMPAIGN_BUY2_GET_1_FAIL:
      return { ...state, error: action.payload };


    case GET_CAMPAIGN_MYSTERYBOX_SUCCESS:
      return {
        ...state,
        campaignMysterBoxes: action.payload && action.payload.products ? action.payload : { products: [] },
      };
    case GET_CAMPAIGN_MYSTERYBOX_FAIL:
      return { ...state, error: action.payload };


    default:
      return state;
  }
};
export default Auth;
