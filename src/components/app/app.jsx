import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";


import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {getCurrentMovie} from "../../reducer/state/selectors.js";

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  _renderMain() {
    const {movie} = this.props;

    return (
      <Main
        movie = {movie}
      />
    );
  }

  _renderMoviePage() {
    const {movie} = this.props;

    return (
      <MoviePage
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
};

const mapStateToProps = (state) => ({
  movie: getCurrentMovie(state),
});

export {App};
export default connect(mapStateToProps)(App);
