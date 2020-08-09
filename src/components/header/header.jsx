import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {AppRoute} from "../../consts";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";


const Header = ({authorizationStatus, title, onMyListClick}) => {

  const isLogged = authorizationStatus === AuthorizationStatus.AUTH ?
    <Link to={AppRoute.MY_LIST}
      onClick={onMyListClick}
    >
      <div className="user-block__avatar">
        <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
    </Link> :
    <Link to={AppRoute.LOGIN} className="user-block__link">
      Sign in
    </Link>;

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
      {title}
      <div className="user-block">
        {isLogged}
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func
  ]).isRequired,
  onMyListClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onMyListClick() {
    dispatch(DataOperation.loadMyList());
  }
});

export {Header};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
