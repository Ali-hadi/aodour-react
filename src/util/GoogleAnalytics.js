import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import { Route } from "react-router-dom";
import { fbqPageView } from "./FacebookAnalytics";

class GoogleAnalytics extends Component {
  componentDidMount() {
    // console.log("GA: ", "mount");
    this.logPageChange(
      this.props.location.pathname,
      this.props.location.search
    );
  }

  componentDidUpdate({ location: prevLocation }) {
    const {
      location: { pathname, search },
    } = this.props;
    const isDifferentPathname = pathname !== prevLocation.pathname;
    // if (pathname === "/" || pathname === "/home") {
    //   isDifferentPathname =
    //     prevLocation.pathname !== "/" && prevLocation.pathname !== "/home";
    // }
    const isDifferentSearch = search !== prevLocation.search;

    if (isDifferentPathname || isDifferentSearch) {
      // console.log("GA: ", "update");
      this.logPageChange(pathname, search);
    }
  }

  logPageChange(pathname, search = "") {
    const page = pathname + search;
    const { location } = window;
    ReactGA.set({
      page,
      location: `${location.origin}${page}`,
      ...this.props.options,
    });
    ReactGA.pageview(page);
    fbqPageView();
    // console.log("GA: ", page);
  }

  render() {
    return null;
  }
}

GoogleAnalytics.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
    search: PropTypes.string,
  }).isRequired,
  options: PropTypes.object,
};

const RouteTracker = () => <Route component={GoogleAnalytics} />;

const init = (options = {}) => {
  // const isGAEnabled = process.env.NODE_ENV === "production";
  // const isGAEnabled = true;
  // if (isGAEnabled) {
  ReactGA.initialize("AW-835343819", { standardImplementation: true });
  // console.log("GA: ", "initialized");
  // console.log("GA: ", window.ga);
  // }

  return true;
};

// const GASet = (options) => {
//   ReactGA.set(options);
//   return null;
// };

// const GACheckoutEvent = (transaction, items) => {
//   ReactGA.ga("require", "ecommerce");
//   performOrderTransaction(transaction);
//   for (const item of items) {
//     performItemTransaction(transaction.id, item);
//   }
//   ReactGA.ga("ecommerce:send");
// };

// const performOrderTransaction = (transaction) => {
//   ReactGA.ga("ecommerce:addTransaction", {
//     id: transaction.id,
//     affiliation: transaction.affiliation,
//     revenue: transaction.revenue,
//     shipping: transaction.shipping,
//     tax: transaction.tax,
//   });
// };

// const performItemTransaction = (transactionId, item) => {
//   ReactGA.ga("ecommerce:addTransaction", {
//     id: `${transactionId}`,
//     name: `${item.name}`,
//     sku: `${item.sku}`,
//     category: `${item.category}`,
//     price: `${item.price}`,
//     quantity: `${item.qty}`,
//   });
// };

export default {
  GoogleAnalytics,
  RouteTracker,
  init,
};
