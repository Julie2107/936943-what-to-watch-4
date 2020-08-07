import React from "react";
import PropTypes from "prop-types";

export const Message = {
  LOADING: `Loading...`,
  ERROR: `Some error occured, please try later`
};

const Plug = ({content}) => {

  return (
    <div className="user-page">

      <h1 className="page-title user-page__title">{content}</h1>

      <footer className="page-footer">
        <div className="logo">
          <a className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

Plug.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Plug;
