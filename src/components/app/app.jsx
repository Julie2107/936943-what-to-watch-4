import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";

const titleClickHandler = () => {};

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderApp() {
    const {movieName, movieGenre, movieReleaseDate, movies} = this.props;

    return (
      <Main
        movieName = {movieName}
        movieGenre = {movieGenre}
        movieReleaseDate = {movieReleaseDate}
        onTitleClick = {titleClickHandler}
        movies = {movies}
      />
    );
  }

  render() {

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-component">
            <MoviePage />
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
      }).isRequired
  ).isRequired,
};

export default App;
