import React from "react";
import { Redirect } from "react-router-dom";
import Layout from "./Aodourlayout";
import { isUserLoggedIn } from "../util";

const AuthorizationLayout = (props) => {
  const isLoggedIn = isUserLoggedIn();

  if (isLoggedIn) {
    return <Layout>{props.children}</Layout>;
  } else {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: {
            from: window.location.pathname,
            search: window.location.search,
          },
        }}
      />
    );
  }
};

export default AuthorizationLayout;
