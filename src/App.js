import React, {
  Fragment,
  Component,
  Suspense,
  useEffect,
  useState,
} from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ReactGA from "react-ga";
import GA from "./util/GoogleAnalytics";
import Routes from "./routes";
import { getCartData } from "./util";
import Loading from "./components/Loader/loader";
import { useDispatch } from "react-redux";
import { RESTORE_CART } from "./constants/actionTypes";
import NextApp  from "./NextApp"
import Modal from "./components/ImageModal"

// import LandingModal from "./components/Campaign/LandingPageModal";
import { isMobile } from "react-device-detect";
const imgLink = 'https://storage.googleapis.com/aodour_v1/campaign/Feb/win-close.jpg'
// function generateSitemap() {
//   return new Sitemap(<Route path="/home" />)
//     .build("https://aodour.pk")
//     .save("../../public/sitemap.xml");
// }

function App() {
  const dispatch = useDispatch();
  const [popupVisible, setpopupVisible] = useState(false)
  useEffect(() => {
    dispatch({
      type: RESTORE_CART,
      payload: getCartData(),
    });


    // setTimeout(() => {
    //     setpopupVisible(true)
    // }, 180000);

  }, []);

  return (
    <div>
      {/* <div>{!isMobile && <LandingModal />}</div> */}
      <div>
        <Router>
          {GA.init({ standardImplementation: true }) && <GA.RouteTracker />}
          <Switch>
            {Routes.map((route, index) => {
              return (
                <route.route
                  key={index}
                  path='/'
                  exact={route.exact}
                  component={(props) => {
                    const Layout = route.layout;
                    const key =
                      `${props.match.params.slug}${props.match.params.subSlug}${props.match.params.subSubSlug}${props.match.params.varSlug}${props.match.params.keyword}` ||
                      route.name;
                    return (
                      <NextApp {...props} />
                    );
                  }}
                />
              );
            })}
          </Switch>
        </Router>
      </div>
      {/* <Modal
        Open={popupVisible} 
        img={{image:imgLink}}
        onClose={()=> setpopupVisible(false)}
      /> */}
    </div>
  );
}

export default App;
