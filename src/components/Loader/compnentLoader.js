import React, { Suspense, useEffect } from "react";
import loader from "../../assets/images/160.gif";
import "./loader.css";
const Loader = ({ loading }) => {
  return (
    <>
      <div className={loading ? "pageloader" : "hide"}>
        <div
          className="loader_container"
        >
          <img src={loader} alt="loader" />
        </div>
      </div>
    </>
  );
};
export default Loader;
