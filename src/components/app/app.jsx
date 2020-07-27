import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {ActionCreator} from "../../reducer/reducer.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _titleClickHandler(movie) {
    this.setState({
      currentCard: movie,
    });

  }

  _renderMain() {
    const {movie, movies, onTitleClick} = this.props;

    return (
      <Main
        movie={movie}
        onTitleClick = {onTitleClick}
        movies = {movies}
      />
    );
  }

  _renderMoviePage() {
    const {movies, movie, onTitleClick} = this.props;

    return (
      <MoviePage
        movies = {movies}
        onTitleClick = {onTitleClick}
        movie = {movie}
      />
    );
  }

  _renderApp() {
    const {movie} = this.props;

    const renderPage = movie ? this._renderMoviePage() : this._renderMain();

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
  movies: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        releaseYear: PropTypes.number.isRequired,
      }).isRequired
  ).isRequired,
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
  onTitleClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  movie: state.currentMovie,
});

const mapDispatchToProps = (dispatch) => ({
  onTitleClick(movie) {
    dispatch(ActionCreator.getCurrentMovie(movie));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
