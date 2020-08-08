import React from "react";
import Header from "../header/header";
import MoviesList from "../movies-list/movies-list";
import PropTypes from "prop-types";

const getFavoriteMovies = (movies) => movies.filter((movie) => movie.isFavorite);

const MyList = ({movies, onTitleClick}) => {
  const headerTitle = <h1 className="page-title user-page__title">My list</h1>;
  return (
    <div className="user-page">
      <Header
        title={headerTitle}
      />
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <MoviesList
          movies={getFavoriteMovies(movies)}
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

export default MyList;
