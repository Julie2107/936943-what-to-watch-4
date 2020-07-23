import React, {PureComponent} from "react";
import PropTypes from "prop-types";

import MoviesList from "../movies-list/movies-list.jsx";
import Tabs from "../tabs/tabs.jsx";
import OverviewTab from "../overview-tab/overview-tab.jsx";
import DetailsTab from "../details-tab/details-tab.jsx";
import ReviewsTab from "../reviews-tab/reviews-tab.jsx";
import {TabType} from "../../consts";

const SIMILAR_MOVIES_NUMBER = 4;


class MoviePage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentTab: TabType.OVERVIEW,
    };

    this._handleTabClick = this._handleTabClick.bind(this);
  }

  render() {
    const {movie, onTitleClick} = this.props;

    return (
      <>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={movie.cover} alt={movie.title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <a href="main.html" className="logo__link">
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
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{movie.title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{movie.genre}</span>
                  <span className="movie-card__year">{movie.releaseYear}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add" />
                    </svg>
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

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <Tabs
                    onTabClick = {this._handleTabClick}
                    activeTab = {this.state.currentTab}
                  />
                </nav>

                {this._renderTab()}

              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <MoviesList
              movies={this._getSimilarMovies()}
              onTitleClick={onTitleClick}
            />
          </section>
        </div>
      </>
    );
  }

  _handleTabClick(tab) {
    this.setState({
      currentTab: tab,
    });
  }

  _renderTab() {
    const {currentTab} = this.state;
    const {movie} = this.props;

    const TabPages = {
      Overview:
        <OverviewTab
          movie = {movie}
        />,
      Details:
        <DetailsTab
          movie={movie}
        />,
      Reviews:
        <ReviewsTab
          reviews={movie.reviews}
        />
    };

    return TabPages[currentTab];
  }

  _getSimilarMovies() {
    const {movies, movie} = this.props;

    return movies.filter((film) => film.genre === movie.genre).slice(0, SIMILAR_MOVIES_NUMBER);
  }

}

MoviePage.propTypes = {
  movie: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
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
  ]),
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  onTitleClick: PropTypes.func.isRequired,
};

export default MoviePage;
