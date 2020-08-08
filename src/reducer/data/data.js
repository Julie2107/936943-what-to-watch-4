import {extend} from "../../utils.js";
import movieAdapter from "../../adapters/movies-adapter.js";
import reviewAdapter from "../../adapters/review-adapter.js";

const initialState = {
  promoMovie: [],
  movies: [],
  isLoading: true,
  isError: false,
  reviews: [],
};

const ActionType = {
  LOAD_MOVIES: `LOAD_MOVIES`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOADING_MOVIES_STATUS: `LOADING_MOVIES_STATUS`,
  ERROR_STATE: `ERROR_STATE`,
  POST_REVIEW: `POST_REVIEW`,
};

const ActionDataCreator = {
  loadMovies: (movies) => {
    return {
      type: ActionType.LOAD_MOVIES,
      payload: movies
    };
  },

  loadPromo: (promoMovie) => {
    return {
      type: ActionType.LOAD_PROMO,
      payload: promoMovie,
    };
  },

  loadReviews: (reviews) => {
    return {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    }
  },

  setLoadingMoviesStatus: (status) => ({
    type: ActionType.LOADING_MOVIES_STATUS,
    payload: status
  }),

  setErrorState: (status) => ({
    type: ActionType.ERROR_STATE,
    payload: status
  })
};

const Operation = {
  loadMovies: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionDataCreator.loadMovies(response.data.map((movie) => movieAdapter(movie))));
        dispatch(ActionDataCreator.setLoadingMoviesStatus(false));
      })
      .catch(() => {
        dispatch(ActionDataCreator.setErrorState(true));
        dispatch(ActionDataCreator.setLoadingMoviesStatus(false));
      });
  },

  loadPromoMovie: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
    .then((response) => {

      dispatch(ActionDataCreator.loadPromo(movieAdapter(response.data)));
    });
  },

  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
    .then((response) => {
      dispatch(ActionDataCreator.loadReviews(response.data.map((review) => reviewAdapter(review))));
    });
  },

  changeFavoriteState: (movie) => (dispatch, getState, api) => {
    return api.post(`/favorite/${movie.id}/${movie.isFavorite ? 0 : 1}`)
    .then(() => {

      dispatch(Operation.loadMovies());
      dispatch(Operation.loadPromoMovie());
    });
  },

  sendNewReview: (id, review) => (dispatch, getState, api) => {
    // тут ActionCreator на sending status
  }

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_MOVIES:
      return extend(state, {
        movies: action.payload,
      });

    case ActionType.LOAD_PROMO:
      return extend(state, {
        promoMovie: action.payload,
      });

    case ActionType.LOADING_MOVIES_STATUS:
      return extend(state, {
        isLoading: action.payload,
      });

    case ActionType.ERROR_STATE:
      return extend(state, {
        isError: action.payload,
      });

    case ActionType.LOAD_REVIEWS:
      return extend(state, {
        reviews: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, Operation, ActionDataCreator, initialState};
