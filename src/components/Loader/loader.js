import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import "./loader.css";
const loader = "https://storage.googleapis.com/aodour_v1/website/load-1.gif";
const Loader = (props) => {
  const state = useSelector((state) => state);
  return (
    <>
      <div className={state.loading > 0 ? "pageloader" : "hide"}>
        <div className="loader_container" style={{}}>
          <img src={loader} alt="loader" />
        </div>
      </div>
    </>
  );
};
export default Loader;
