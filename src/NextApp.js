import React, {
  Fragment,
  Component,
  Suspense,
  useEffect,
  useState,
} from "react";
import { BrowserRouter as Router, Switch, Route,useLocation } from "react-router-dom";
import ReactGA from "react-ga";
import GA from "./util/GoogleAnalytics";
import Routes from "./routes";
import { getCartData } from "./util";
import Loading from "./components/Loader/loader";
import Layout from "./layout/Aodourlayout"
import { useDispatch } from "react-redux";
import { RESTORE_CART } from "./constants/actionTypes";
// import LandingModal from "./components/Campaign/LandingPageModal";
import { isMobile } from "react-device-detect";
// function generateSitemap() {
//   return new Sitemap(<Route path="/home" />)
//     .build("https://aodour.pk")
//     .save("../../public/sitemap.xml");
// }

function NextApp(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <Suspense fallback={Loading()}>
        <Layout {...props}>
          <Switch>
            {Routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                  // component={(props) => {
                  //   const Layout = route.layout;
                  //   const key =
                  //     `${props.match.params.slug}${props.match.params.subSlug}${props.match.params.subSubSlug}${props.match.params.varSlug}${props.match.params.keyword}` ||
                  //     route.name;
                  //   return (

                  //     <route.component {...props} />

                  //   );
                  // }}
                />
              );
            })}
          </Switch>
        </Layout>
      </Suspense>
    </div>
  );
}

export default NextApp;
