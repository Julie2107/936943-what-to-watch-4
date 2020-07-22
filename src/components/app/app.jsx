import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/reducer.js";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentCard: null,
    };

    this._titleClickHandler = this._titleClickHandler.bind(this);
  }

  _titleClickHandler(movie) {
    this.setState({
      currentCard: movie,
    });

  }

  _renderMain() {
    const {movieName, movieGenre, movieReleaseDate, movies, genresList, onFilterChange, currentGenre} = this.props;

    return (
      <Main
        movieName = {movieName}
        movieGenre = {movieGenre}
        movieReleaseDate = {movieReleaseDate}
        onTitleClick = {this._titleClickHandler}
        movies = {movies}
        genresList = {genresList}
        onFilterChange = {onFilterChange}
        currentGenre = {currentGenre}
      />
    );
  }

  _renderMoviePage() {
    const {movies} = this.props;
    const {currentCard} = this.state;

    return (
      <MoviePage
        movies = {movies}
        onTitleClick = {this._titleClickHandler}
        movie = {currentCard}
      />
    );
  }

  _renderApp() {
    const {currentCard} = this.state;

    const renderPage = currentCard ? this._renderMoviePage() : this._renderMain();

    return renderPage;
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/movie-page">
            {this._renderMoviePage()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movieName: PropTypes.string.isRequired,
  movieGenre: PropTypes.string.isRequired,
  movieReleaseDate: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired,
      }).isRequired
  ).isRequired,
  currentGenre: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  genresList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
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
  ])

};

const mapStateToProps = (state) => ({
  currentGenre: state.currentGenre,
  genresList: state.genresList,
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  onFilterChange(genre) {
    dispatch(ActionCreator.getCurrentFilter(genre));
    dispatch(ActionCreator.getFilteredMovies(genre));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
