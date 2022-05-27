import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

import "./styles/svg-icons.css";
import "./styles/Carousel.css";
import "./styles/style.css";
import "./styles/responsive.css";
import "./styles/colors.css";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { configureStore } from "./redux/store";


export const store = configureStore();

// ReactGA.initialize("AW-835343819", { standardImplementation: true });
// console.log("GA: ", "initialized");
// console.log("window: ", window);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
