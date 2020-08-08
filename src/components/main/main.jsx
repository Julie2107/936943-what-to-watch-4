import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import withFullScreenVideo from "../../hocs/with-fullscreen-video.js";
import {getCurrentGenre, getShownMoviesNumber, getPlayerState, getMoviesByGenre} from "../../reducer/state/selectors.js";
import {getGenres, getPromoMovie} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {ActionCreator} from "../../reducer/state/state.js";

import MoviesList from "../movies-list/movies-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import FullScreenVideo from "../full-screen-video/full-screen-video.jsx";
import Header from "../header/header.jsx";

const WrappedFullscreen = withFullScreenVideo(FullScreenVideo);

const Main = ({
  promoMovie,
  movies,
  genresList,
  onFilterChange,
  currentGenre,
  onButtonClick,
  shownMoviesNumber,
  onTitleClick,
  onActivatePlayer,
  onDeactivatePlayer,
  isActivePlayer,
  onAddToList}) => {

  const moviesToRender = movies.slice(0, shownMoviesNumber);
  const isButtonToRender = shownMoviesNumber < movies.length ? <ShowMoreButton
    onButtonClick={onButtonClick}
  /> : ``;

  const isInList = promoMovie.isFavorite ?
    <svg viewBox="0 0 18 14" width="18" height="14">
      <use xlinkHref="#in-list"></use>
    </svg> :
    <svg viewBox="0 0 19 20" width="19" height="20">
      <use xlinkHref="#add" />
    </svg>;

  return (
    isActivePlayer ?
      (<WrappedFullscreen className="player__video"
        movie={promoMovie}
        onDeactivatePlayer={onDeactivatePlayer}
      />) :
      (<>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={promoMovie.backgroundImage} alt={promoMovie.title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header
            title={``}
          />

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={promoMovie.poster} alt={`${promoMovie.title} poster`} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{promoMovie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{promoMovie.genre}</span>
                  <span className="movie-card__year">{promoMovie.releaseYear}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button"
                    onClick={onActivatePlayer}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s" />
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button"
                    onClick={() => onAddToList(promoMovie)}
                  >
                    {isInList}
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
      </>)
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
    poster: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
    isFavorite: PropTypes.bool.isRequired,
  }).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onTitleClick: PropTypes.func.isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  shownMoviesNumber: PropTypes.number.isRequired,
  isActivePlayer: PropTypes.bool.isRequired,
  onActivatePlayer: PropTypes.func.isRequired,
  onDeactivatePlayer: PropTypes.func.isRequired,
  onAddToList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentGenre: getCurrentGenre(state),
  genresList: getGenres(state),
  movies: getMoviesByGenre(state),
  promoMovie: getPromoMovie(state),
  shownMoviesNumber: getShownMoviesNumber(state),
  isActivePlayer: getPlayerState(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFilterChange(genre) {
    dispatch(ActionCreator.getCurrentFilter(genre));
    dispatch(ActionCreator.getFilteredMovies(genre));
  },
  onButtonClick() {
    dispatch(ActionCreator.showMoreMovies());
  },
  onTitleClick(movie) {
    dispatch(ActionCreator.getCurrentMovie(movie));
    dispatch(DataOperation.loadReviews(movie.id));
  },
  onActivatePlayer() {
    dispatch(ActionCreator.getFullScreenState(true));
  },
  onDeactivatePlayer() {
    dispatch(ActionCreator.getFullScreenState(false));
  },
  onAddToList(movie) {
    dispatch(DataOperation.changeFavoriteState(movie));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Main);
