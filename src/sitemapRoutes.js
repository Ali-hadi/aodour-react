const Routes = [
  {
    path: "/",
    name: "Home",
    exact: true,
  },
  {
    path: "/Test",
    name: "Test",
  },
  {
    path: "/shop/searchresult/:keyword",
    name: "search",
  },
  {
    path: "/brand/:brandSlug/:varSlug",
    name: "detail",
  },
  {
    path: "/subcategory/:subSlug",
    name: "subcategory",
    exact: true,
  },
  {
    path: "/Shop/new_arrival",
    name: "NewArrival",
    exact: true,
  },
  {
    path: "/shop/:slug",
    name: "category",
    exact: true,
  },
  {
    path: "/about",
    name: "about",
  },
  {
    path: "/term",
    name: "term",
  },
  {
    path: "/contact",
    name: "contact",
  },
  {
    path: "/delivery",
    name: "delivery",
  },
  {
    path: "/E_Clinic",
    name: "E-Clinic",
  },
  {
    path: "/policy",
    name: "policy",
  },
  {
    path: "/FAQs",
    name: "Faqs",
  },
  {
    path: "/brand",
    exact: true,
    name: "Allbrand",
  },
  {
    path: "/brand/:slug",
    name: "brand",
    exact: true,
  },
  {
    path: "/shop/:catSlug/:subSubSlug",
    name: "brand",
  },
  {
    path: "/checkout",
    name: "checkout",
  },
  {
    path: "/thankyou",
    name: "thankyou",
  },
  {
    path: "/allbestsellers",
    name: "BestSellers",
  },
  {
    path: "/under999",
    name: "UnderThousand",
  },
  // {
  //   path: "/eid-sale",
  //   name: "campaign",
  // },
  {
    path: "/commingsoon",
    name: "commingsoon",
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
  },
  {
    path: "/signup",
    name: "Signup",
  },
  {
    path: "/track-complaint",
    name: "TrackComplaint",
  },
  {
    path: "/complaint",
    name: "ComplaintForm",
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
  },
  {
    path: "/track-order",
    name: "TrackOrder",
  },
  {
    path: "/flash-sale",
    name: "SaleListing",
  },
  {
    path: "/profile",
    name: "Profile",
    exact: true,
  },
  {
    path: "/profile/myorders",
    name: "myorders",
    exact: true,
  },
  {
    path: "/profile/mywishlist",
    name: "mywishlist",
    exact: true,
  },
  {
    path: "/profile/mysubscriptions",
    name: "mysubscriptions",
    exact: true,
  },
  {
    path: "/profile/myaddress",
    name: "myaddress",
    exact: true,
  },
  {
    path: "/404",
    name: "404",
  },
  {
    path: "*",
    name: "NotFound",
  },
];

module.exports = Routes;
