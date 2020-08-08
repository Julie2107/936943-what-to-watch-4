import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import history from "../../history.js";

import {getAuthorizationStatus, getUser} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {AppRoute} from "../../consts.js";
import {getMovies, getLoadingState, getErrorStatus} from "../../reducer/data/selectors.js";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import Plug, {Message} from "../plug/plug.jsx";

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
    const {login, isLoading, isError} = this.props;
    if (isLoading) {

      return <Plug
        content={Message.LOADING}
      />;
    }

    if (isError) {
      return <Plug
        content={Message.ERROR}
      />;
    }

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
              return <SignIn
                onSubmit={login}
              />;
            }}
          />
          <Route
            render={() => <Plug />}
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
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,

};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  user: getUser(state),
  movies: getMovies(state),
  isLoading: getLoadingState(state),
  isError: getErrorStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
