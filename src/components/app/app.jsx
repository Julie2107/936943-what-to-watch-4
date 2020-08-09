import React from "react";
import PropTypes from "prop-types";
import {Router, Route, Switch} from "react-router-dom";
import {connect} from "react-redux";
import history from "../../history.js";

import {getAuthorizationStatus, getUser} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/movies/movies.js";
import {getMovies, getLoadingState, getErrorStatus} from "../../reducer/movies/selectors.js";

import {AppRoute} from "../../consts.js";
import {getMovieById} from "../../utils.js";

import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import Plug, {Message} from "../plug/plug.jsx";
import PrivateRoute from "../../private-route.jsx";
import AddReview from "../add-review/add-review.jsx";
import withFullScreenVideo from "../../hocs/with-fullscreen-video.js";
import FullScreenVideo from "../full-screen-video/full-screen-video.jsx";
import withAddReview from "../../hocs/with-add-review.js";
import MyList from "../my-list/my-list.jsx";

const WrappedAddReview = withAddReview(AddReview);
const WrappedFullScreen = withFullScreenVideo(FullScreenVideo);

const App = ({login, movies, isLoading, isError, onFormSubmit}) => {
  const renderMain = () => {

    return (
      <Main />
    );
  };

  const renderMoviePage = (match) => {
    const id = Number(match.params.id);

    return <MoviePage
      movie = {getMovieById(movies, id)}
    />;
  };

  const renderAddReview = (match) => {
    const id = Number(match.params.id);

    return <WrappedAddReview
      movie={getMovieById(movies, id)}
      onFormSubmit={onFormSubmit}
    />;
  };

  const renderFullScreen = (match) => {
    const id = Number(match.params.id);

    return <WrappedFullScreen
      movie={getMovieById(movies, id)}
    />;
  };

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
          render={() => renderMain()}
        />
        <Route exact path={`${AppRoute.MOVIE}/:id`}
          render={({match}) => renderMoviePage(match, movies)}
        />
        <Route exact path={AppRoute.LOGIN}
          render={() => {
            return <SignIn
              onSubmit={login}
            />;
          }}
        />
        <Route exact path={`${AppRoute.MOVIE}/:id${AppRoute.PLAYER}`}
          render={({match}) => renderFullScreen(match, movies)}
        />
        <PrivateRoute
          path={`${AppRoute.MOVIE}/:id${AppRoute.REVIEW}`}
          render={({match}) => renderAddReview(match, movies, onFormSubmit)}
        />
        <PrivateRoute
          path={`${AppRoute.MY_LIST}`}
          render={() => <MyList />}
        />
        <Route
          render={() => <Plug />}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  movies: PropTypes.array.isRequired,
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
  onFormSubmit: PropTypes.func.isRequired,

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
  },
  onFormSubmit(id, review) {
    dispatch(DataOperation.sendNewReview(id, review));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
