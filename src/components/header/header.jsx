import React from "react";

import {Link} from "react-router-dom";
import {AppRoute} from "../../consts";


const Header = () => {
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
        <Link to={AppRoute.LOGIN} className="user-block__link">
          Sign in
        </Link>
      </div>
    </header>
  );
};

export default Header;
