import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";

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
    const {movieName, movieGenre, movieReleaseDate, movies} = this.props;

    return (
      <Main
        movieName = {movieName}
        movieGenre = {movieGenre}
        movieReleaseDate = {movieReleaseDate}
        onTitleClick = {this._titleClickHandler}
        movies = {movies}
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
  movie: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      poster: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      releaseYear: PropTypes.number.isRequired,
    })
  ])

};

export default App;
