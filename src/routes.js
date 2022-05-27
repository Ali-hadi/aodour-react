import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import AuthorizationLayout from "./layout/AuthorizationLayout";
import Minisolayout from "./layout/Minisolayout";
// import { isUserAuthenticated, getLoggedInUser } from './helpers/authUtils';

const Empty = React.lazy(() => import("./layout/Empty"));
const Layout = React.lazy(() => import("./layout/Aodourlayout"));

const Home = React.lazy(() => import("./pages/Home"));
const SubCategory = React.lazy(() => import("./pages/SubCategory"));
const Category = React.lazy(() => import("./pages/Category"));
const About = React.lazy(() => import("./pages/About"));
const Term = React.lazy(() => import("./pages/TermAndCondition"));
const ContactUs = React.lazy(() => import("./pages/ContactUs.js"));
const Delivery = React.lazy(() => import("./pages/Delivery"));
const E_Clinic = React.lazy(() => import("./pages/E_Clinic"));
const Policy = React.lazy(() => import("./pages/Policy"));
const Faqs = React.lazy(() => import("./pages/FAQs"));
const Test = React.lazy(() => import("./components/test"));
const BrandListing = React.lazy(() => import("./pages/BrandListing"));
const Brand = React.lazy(() => import("./pages/Brand"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const CheckOut = React.lazy(() => import("./pages/CheckOut"));
// const CheckOut = React.lazy(() => import("./pages/CampaignCheckOut"));
const ThankYou = React.lazy(() => import("./pages/ThankYou"));
const NewArrival = React.lazy(() => import("./pages/NewArrival"));
const BestSellers = React.lazy(() => import("./pages/BestSellers"));
const UnderThousand = React.lazy(() => import("./pages/UnderThousand"));
const CommingSoon = React.lazy(() => import("./pages/CommingSoon"));
const Login = React.lazy(() => import("./pages/Login"));
const Signup = React.lazy(() => import("./pages/Signup"));
const UserProfile = React.lazy(() => import("./pages/UserProfile"));
const Profile = React.lazy(() => import("./pages/MyProfile"));
const MyOrders = React.lazy(() => import("./pages/MyOrders"));
const MyWishList = React.lazy(() => import("./pages/MyWishlist"));
const MySubscriptions = React.lazy(() => import("./pages/MySubscriptions"));
const MyAddress = React.lazy(() => import("./pages/MyAddresses"));
const ComplaintThankYou = React.lazy(() => import("./pages/ComplaintThankYou"));
const Search = React.lazy(() => import("./pages/SearchResultList"));
const ShippingAndBilling = React.lazy(() =>
  import("./pages/ShippingAndBilling")
);
const EditProfile = React.lazy(() => import("./pages/EditProfile"));
const Loreal = React.lazy(() => import("./pages/Loreal"));
const Kerastase = React.lazy(() => import("./pages/Kerastase"));
const LorealHomepage = React.lazy(() => import("./pages/LorealHomepage"));
const Miniso = React.lazy(() => import("./pages/Miniso"));
// const Testing = React.lazy(() => import("./pages/Testing"));
const StoreLocator = React.lazy(() => import("./pages/StoreLocator"));
const NotFound = React.lazy(() => import("./pages/404"));
const TrackOrder = React.lazy(() => import("./pages/TrackOrder"));
const TrackComplaint = React.lazy(() => import("./pages/TrackComplaint"));
const SaleListing = React.lazy(() => import("./pages/SaleListing"));
const ComplaintForm = React.lazy(() => import("./pages/ComplaintForm"));
const Minisocategory = React.lazy(() => import("./pages/Minisocategory"));
const Minisosubcategory = React.lazy(() => import("./pages/MinisoSubcategory"));
const PageUrl = React.lazy(() => import("./pages/Steampod_Url"));
const Garnier = React.lazy(() => import("./pages/Garnier"));
// const Compaign = React.lazy(() => import("./pages/Grand-Loreal-Sale"));
// const Compaign = React.lazy(() => import("./pages/campaign"));
const Stempg = React.lazy(() => import("./pages/Steampod_page1"));
const Stempodu = React.lazy(() => import("./pages/Steampod_page2"));
const Stempodc = React.lazy(() => import("./pages/Steampod_page3"));
// const Belovedfeb = React.lazy(() => import("./pages/BelovedFeb"));
const Compaign_Listing = React.lazy(() => import("./pages/Compaign_products"));
// const Compaign_1000 = React.lazy(() => import("./pages/Campaign_1000ofproducts"));
// const Compaign_1000 = React.lazy(() => import("./pages/Thousandofproducts"));
// const PakistanDay = React.lazy(() => import("./pages/PakistanDay"));
// const Compaignbuy1get1 = React.lazy(() => import("./pages/Campaign_buy2get1"));
// const Campaign_promo = React.lazy(() => import("./pages/Campaign_Promo"));
// const Campaign_mysterybox = React.lazy(() => import("./pages/Campaign_mysterybox"));
const Routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    route: Route,
    layout: Layout,
    exact: true,
  },
  // {
  //   path: "/Test",
  //   name: "Test",
  //   component: Test,
  //   route: Route,
  //   layout: Empty,
  // },
  // {
  //   path: "/campaignlisting/:brandSlug",
  //   name: "Compaign_Listing",
  //   component: Compaign_Listing,
  //   route: Route,
  //   layout: Layout,
  // },
  {
    path: "/garniermaskparty",
    name: "garniermaskparty",
    component: Garnier,
    route: Route,
    layout: Layout,
  },
  {
    path: "/SteampodFAQs",
    name: "SteampodFAQs",
    component: Stempg,
    route: Route,
    layout: Layout,
  },
  {
    path: "/curlhair",
    name: "curlhair",
    component: Stempodu,
    route: Route,
    layout: Layout,
  },
  {
    path: "/howtouse",
    name: "howtouse",
    component: Stempodc,
    route: Route,
    layout: Layout,
  },
  {
    path: "/shop/searchresult/:keyword",
    name: "search",
    component: Search,
    route: Route,
    layout: Layout,
  },
  {
    path: "/professional-hair",
    name: "LorealHomepage",
    component: LorealHomepage,
    route: Route,
    layout: Layout,
  },
  {
    path: "/brand/:brandSlug/:varSlug",
    name: "detail",
    component: ProductDetail,
    route: Route,
    layout: Layout,
  },
  {
    path: "/product/:brandSlug/:varSlug",
    name: "detail",
    component: ProductDetail,
    route: Route,
    layout: Layout,
  },
  {
    path: "/subcategory/:subSlug",
    name: "subcategory",
    component: SubCategory,
    exact: true,
    route: Route,
    layout: Layout,
  },
  {
    path: "/miniso/subcategory/:subSlug",
    name: "subcategory",
    component: SubCategory,
    exact: true,
    route: Route,
    layout: Layout,
  },
  {
    path: "/Shop/new_arrival",
    name: "NewArrival",
    component: NewArrival,
    route: Route,
    layout: Layout,
    exact: true,
  },
  {
    path: "/shop/:slug",
    name: "category",
    component: Category,
    route: Route,
    layout: Layout,
    exact: true,
  },
  {
    path: "/about",
    name: "about",
    component: About,
    route: Route,
    layout: Layout,
  },
  {
    path: "/term",
    name: "term",
    component: Term,
    route: Route,
    layout: Layout,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactUs,
    route: Route,
    layout: Layout,
  },
  {
    path: "/delivery",
    name: "delivery",
    component: Delivery,
    route: Route,
    layout: Layout,
  },
  {
    path: "/E_Clinic",
    name: "E-Clinic",
    component: E_Clinic,
    route: Route,
    layout: Layout,
  },
  {
    path: "/policy",
    name: "policy",
    component: Policy,
    route: Route,
    layout: Layout,
  },
  {
    path: "/FAQs",
    name: "Faqs",
    component: Faqs,
    route: Route,
    layout: Layout,
  },
  {
    path: "/brand",
    exact: true,
    name: "Allbrand",
    component: BrandListing,
    route: Route,
    layout: Layout,
  },
  {
    path: "/loreal-professional",
    name: "loreal",
    component: Loreal,
    route: Route,
    layout: Layout,
  },
  {
    path: "/kerastase",
    name: "kerastase",
    component: Kerastase,
    route: Route,
    layout: Layout,
  },
  
  {
    path: "/brand/:slug",
    name: "brand",
    component: Brand,
    exact: true,
    route: Route,
    layout: Layout,
  },
  {
    path: "/shop/:catSlug/:subSubSlug",
    name: "brand",
    component: SubCategory,
    route: Route,
    layout: Layout,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: CheckOut,
    route: Route,
    layout: Layout,
  },
  {
    path: "/steampod",
    name: "steampod",
    component: PageUrl,
    exact: true,
    route: Route,
    layout: Layout,
  },
  // {
  //   path: "/pakistanday",
  //   name: "pakistanday",
  //   component: PakistanDay,
  //   exact: true,
  //   route: Route,
  //   layout: Layout,
  // },
  // {
  //   path: "/Belovedfeb",
  //   name: "Belovedfeb",
  //   component: Belovedfeb,
  //   exact: true,
  //   route: Route,
  //   layout: Layout,
  // },
  // {
  //   path: "/mysterybox",
  //   name: "mysterybox",
  //   component: Campaign_mysterybox,
  //   exact: true,
  //   route: Route,
  //   layout: Layout,
  // },
  // {
  //   path: "/buy1get1free",
  //   name: "buy1get1free",
  //   component: Compaignbuy1get1,
  //   exact: true,
  //   route: Route,
  //   layout: Layout,
  // },
// {
//     path: "/fridayfrenzy",
//     name: "fridayfrenzy",
//     component: Compaign_1000,
//     exact: true,
//     route: Route,
//     layout: Layout,
//   },
  // {
  //   path: "/live-session-sale",
  //   name: "live-session-sale",
  //   component: Compaign_Listing,
  //   exact: true,
  //   route: Route,
  //   layout: Layout,
  // },
  {
    path: "/thankyou",
    name: "thankyou",
    component: ThankYou,
    route: Route,
    layout: Layout,
  },
  {
    path: "/complaint/thankyou/:id",
    name: "complaint-thankyou",
    component: ComplaintThankYou,
    route: Route,
    layout: Layout,
  },
  {
    path: "/allbestsellers",
    name: "BestSellers",
    component: BestSellers,
    route: Route,
    layout: Layout,
  },
  {
    path: "/under999",
    name: "UnderThousand",
    component: UnderThousand,
    route: Route,
    layout: Layout,
  },
  // {
  //   path: "/grand-loreal-sale",
  //   name: "grand-loreal-sale",
  //   component: Compaign,
  //   route: Route,
  //   layout: Layout,
  // },
  /*{
    path: "/loreal-sale",
    name: "compaign",
    component: Compaign,
    route: Route,
    layout: Layout,
  },*/
  {
    path: "/commingsoon",
    name: "commingsoon",
    component: CommingSoon,
    route: Route,
    layout: Empty,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    route: Route,
    layout: Empty,
    exact: true,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    route: Route,
    layout: Empty,
  },
  // {
  //   path: "/user/profile",
  //   name: "UserProfile",
  //   component: UserProfile,
  //   route: Route,
  //   layout: Layout,
  //   exact: true,
  // },
  // {
  //   path: "/user/profile/edit",
  //   name: "EditProfile",
  //   component: EditProfile,
  //   route: Route,
  //   layout: Layout,
  // },
  // {
  //   path: "/user/shippinginfo",
  //   name: "ShippingAndBilling",
  //   component: ShippingAndBilling,
  //   route: Route,
  //   layout: Layout,
  // },
  {
    path: "/store-locator",
    name: "StoreLocator",
    component: StoreLocator,
    route: Route,
    layout: Layout,
  },
  {
    path: "/track-order",
    name: "TrackOrder",
    component: TrackOrder,
    route: Route,
    layout: Layout,
  },
  {
    path: "/track-complaint",
    name: "TrackComplaint",
    component: TrackComplaint,
    route: Route,
    layout: Layout,
  },
  {
    path: "/flash-sale",
    name: "SaleListing",
    component: SaleListing,
    route: Route,
    layout: Layout,
  },
  // {S
  //   path: "/campaign",
  //   name: "campaign",
  //   component: Campaign_promo,
  //   route: Route,
  //   layout: Layout,
  // },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    route: Route,
    layout: AuthorizationLayout,
    exact: true,
  },
  {
    path: "/profile/myorders",
    name: "myorders",
    component: MyOrders,
    route: Route,
    layout: AuthorizationLayout,
    exact: true,
  },
  {
    path: "/profile/mywishlist",
    name: "mywishlist",
    component: MyWishList,
    route: Route,
    layout: AuthorizationLayout,
    exact: true,
  },
  {
    path: "/profile/mysubscriptions",
    name: "mysubscriptions",
    component: MySubscriptions,
    route: Route,
    layout: AuthorizationLayout,
    exact: true,
  },
  {
    path: "/profile/myaddress",
    name: "myaddress",
    component: MyAddress,
    route: Route,
    layout: AuthorizationLayout,
    exact: true,
  },
  {
    path: "/order/:id/complaint",
    name: "ComplaintForm",
    component: ComplaintForm,
    route: Route,
    layout: Layout,
  },

  {
    path: "/miniso/:slug",
    name: "Miniso",
    component: Minisocategory,
    route: Route,
    exact: true,
    layout: Layout,
  },
  {
    path: "/miniso/:slug/:subSlug",
    name: "Minisosubcategory",
    component: Minisosubcategory,
    route: Route,
    exact: true,
    // layout: Empty,
    layout: Layout,
  },
  {
    path: "/miniso",
    name: "Miniso",
    component: Miniso,
    route: Route,
    layout: Layout,
    // layout: Minisolayout,
  },
  // {
  //   path: "/testing",
  //   name: "Testing",
  //   component: Testing,
  //   route: Route,
  //   layout: Empty,
  // },
  {
    path: "/404",
    name: "404",
    component: NotFound,
    route: Route,
    layout: Layout,
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
    route: Route,
    layout: Empty,
  },
];

export default Routes;
