import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import MoviesList from "../movies-list/movies-list.jsx";
import Tabs from "../tabs/tabs.jsx";
import withActiveTab from "../../hocs/with-active-tab.js";
import {ActionCreator} from "../../reducer/state/state.js";

import FullScreenVideo from "../full-screen-video/full-screen-video.jsx";
import withFullScreenVideo from "../../hocs/with-fullscreen-video.js";
import {getPlayerState} from "../../reducer/state/selectors.js";
import {getMovies} from "../../reducer/data/selectors.js";
import Header from "../header/header.jsx";
import {Operation} from "../../reducer/data/data.js";

const WrappedFullscreen = withFullScreenVideo(FullScreenVideo);


const SIMILAR_MOVIES_NUMBER = 4;

const WrappedTabs = withActiveTab(Tabs);

const getSimilarMovies = (movies, movie) => {
  return movies.filter((film) => film.genre === movie.genre).slice(0, SIMILAR_MOVIES_NUMBER);
};

const MoviePage = ({movies, id, onTitleClick, onActivatePlayer, onDeactivatePlayer, isActivePlayer, onAddToList}) => {

  const movie = movies.find((movieItem) => movieItem.id === id);

  const isInList = movie.isFavourite ?
    (<svg viewBox="0 0 18 14" width="18" height="14">
      <use xlinkHref="#in-list"></use>
    </svg>) :
    (<svg viewBox="0 0 19 20" width="19" height="20">
      <use xlinkHref="#add" />
    </svg>);

  return (
    isActivePlayer ?
      (<WrappedFullscreen className="player__video"
        movie={movie}
        onDeactivatePlayer={onDeactivatePlayer}
      />) :
      (<>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg" style={{backgroundColor: movie.backgroundColor}}>
              <img src={movie.backgroundImage} alt={movie.title}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <Header />

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.releaseYear}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button"
                    onClick={onActivatePlayer}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button"
                    onClick={onAddToList}
                  >
                    {isInList}
                    <span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={movie.poster} alt={movie.title} width="218" height="327" />
              </div>

              <WrappedTabs
                movie={movie}
              />

            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <MoviesList
              movies={getSimilarMovies(movies, movie)}
              onTitleClick={onTitleClick}
            />
          </section>
        </div>
      </>)
  );
};

MoviePage.propTypes = {
  /* movie: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      ratingNumber: PropTypes.number.isRequired,
      ratingValue: PropTypes.string.isRequired,
      starring: PropTypes.arrayOf(PropTypes.string.isRequired),
      director: PropTypes.string.isRequired,
      reviews: PropTypes.arrayOf(
          PropTypes.shape({
            message: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
          })
      ).isRequired
    })
  ]),*/
  id: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClick: PropTypes.func.isRequired,
  isActivePlayer: PropTypes.bool.isRequired,
  onActivatePlayer: PropTypes.func.isRequired,
  onDeactivatePlayer: PropTypes.func.isRequired,
  onAddToList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  isActivePlayer: getPlayerState(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTitleClick(movie) {
    dispatch(ActionCreator.getCurrentMovie(movie));
  },
  onActivatePlayer() {
    dispatch(ActionCreator.getFullScreenState(true));
  },
  onDeactivatePlayer() {
    dispatch(ActionCreator.getFullScreenState(false));
  },
  onAddToList(movie) {
    dispatch(Operation.changeFavoriteState(movie));
  }
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
