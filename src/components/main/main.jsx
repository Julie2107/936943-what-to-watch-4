import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import {ActionCreator} from "../../reducer/reducer.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";


const Main = ({promoMovie, onTitleClick, movies, genresList, onFilterChange, currentGenre, onButtonClick, shownMoviesNumber}) => {
  const moviesToRender = movies.slice(0, shownMoviesNumber);
  const isButtonToRender = shownMoviesNumber < movies.length ? <ShowMoreButton
    onButtonClick={onButtonClick}
  /> : ``;

  return (
    <>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="user-block">
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
            </div>
          </div>
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{promoMovie.title}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{promoMovie.genre}</span>
                <span className="movie-card__year">{promoMovie.releaseYear}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList
            genresList={genresList}
            onFilterChange={onFilterChange}
            currentGenre={currentGenre}
          />
          <MoviesList
            movies={moviesToRender}
            onTitleClick={onTitleClick}
          />
          {isButtonToRender}
        </section>

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
    </>
  );
};

Main.propTypes = {
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  promoMovie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
  }).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  shownMoviesNumber: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  genresList: state.genresList,
  movies: state.movies,
  promoMovie: state.promoMovie,
  shownMoviesNumber: state.shownMoviesNumber,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterChange(genre) {
    dispatch(ActionCreator.getCurrentFilter(genre));
    dispatch(ActionCreator.getFilteredMovies(genre));
  },
  onButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);
