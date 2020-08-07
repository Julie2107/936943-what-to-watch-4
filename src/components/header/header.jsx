import React from "react";
import {connect} from "react-redux";

import {Link} from "react-router-dom";
import {AppRoute} from "../../consts";
import {getAuthorizationStatus, getUser} from "../../reducer/user/selectors.js";
import { AuthorizationStatus } from "../../reducer/user/user";



const Header = ({authorizationStatus, user}) => {
  console.log(user);

  const isLogged = authorizationStatus === AuthorizationStatus.AUTH ?
    <div className="user-block__avatar">
      <img src={user.avatar_url} alt="User avatar" width="63" height="63" />
    </div> :
    <Link to={AppRoute.LOGIN} className="user-block__link">
      Sign in
    </Link>

  return (
    <header className="page-header movie-card__head">
      <div className="logo">
        <Link
          className="logo__link"
          to={AppRoute.ROOT}>
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>

      <div className="user-block">
        {isLogged}
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state)
})

export {Header};
export default connect(mapStateToProps)(Header);
