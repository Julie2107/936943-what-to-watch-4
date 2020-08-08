import React from "react";
import {Route, Redirect} from 'react-router-dom';
import { AuthorizationStatus } from "./reducer/user/user.js";
import {getAuthorizationStatus} from "./reducer/user/selectors.js";
import { AppRoute } from "./consts";
import { connect } from "react-redux";


const PrivateRoute = ({authorizationStatus, path, render}) => {
  const isAccess = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <Route exact path={path}
      render={(routeProps) => {
        if (isAccess) {
          return render(routeProps);
        }

        return <Redirect to={`${AppRoute.LOGIN}`}/>;
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
