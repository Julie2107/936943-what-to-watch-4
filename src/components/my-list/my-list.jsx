import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import Header from "../header/header.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import {getMyMoviesList} from "../../reducer/movies/selectors.js";
import {Operation as DataOperation} from "../../reducer/movies/movies.js";


const MyList = ({movies, onTitleClick}) => {
  const headerTitle = <h1 className="page-title user-page__title">My list</h1>;

  return (
    <div className="user-page">
      <Header
        title={headerTitle}
        addClass={`user-page__head`}
      />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesList
          movies={movies}
          onTitleClick={onTitleClick}
        />
      </section>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
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

MyList.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMyMoviesList(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTitleClick(movie) {
    dispatch(DataOperation.loadReviews(movie.id));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
