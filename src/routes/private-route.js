import React, { Suspense } from "react";
import { Route, Redirect } from "react-router-dom";
import Spinner from "../components/@vuexy/spinner/Loading-spinner";
import { ContextLayout } from "../utility/context/Layout";
import checkAuth from "./check-auth";

const PrivateRouteConfig = ({
  component: Component,
  fullLayout,
  permission,
  user,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return checkAuth() ? (
          <ContextLayout.Consumer>
            {(context) => {
              let LayoutTag =
                fullLayout === true
                  ? context.fullLayout
                  : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout;
              return (
                <LayoutTag {...props} permission={props.user}>
                  <Suspense fallback={<Spinner />}>
                    <Component {...props} />
                  </Suspense>
                </LayoutTag>
              );
            }}
          </ContextLayout.Consumer>
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRouteConfig;
