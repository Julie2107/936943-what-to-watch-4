import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch} from "react-router-dom";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import {AppRoute} from "../../consts.js";
import SignIn from "../sign-in/sign-in.jsx";
import history from "../../history.js";

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

  _renderMoviePage(id) {
    return (
      <MoviePage
        id = {id}
      />
    );
  }

  render() {

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.ROOT}
            render={() => this._renderMain()}
          />
          <Route exact path={`${AppRoute.MOVIE}/:id`}
            render={({match}) => {
              const id = Number(match.params.id);
              return this._renderMoviePage(id);
            }}
          />
          <Route exact path={AppRoute.LOGIN}
            render={() => {
              return <SignIn />;
            }}
          />
        </Switch>
      </Router>
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

export default App;
