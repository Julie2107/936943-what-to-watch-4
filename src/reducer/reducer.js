import {smallMovies, Movie} from "../mocks/films.js";
import {getFilteredMovies, getGenresList, extend} from "../utils.js";
import {MOVIES_TO_SHOW} from "../consts.js";

const initialState = {
  currentGenre: `All genres`,
  genresList: getGenresList(smallMovies),
  movies: smallMovies,
  currentMovie: null,
  promoMovie: Movie,
  shownMoviesNumber: MOVIES_TO_SHOW,
  isActivePlayer: false,
};

const ActionType = {
  FILTER_CHANGE: `FILTER_CHANGE`,
  FILTERED_MOVIES: `FILTERED_MOVIES`,
  SHOW_MORE: `SHOW_MORE`,
  CURRENT_MOVIE: `CURRENT_MOVIE`,
  FULL_SCREEN_STATE: `FULL_SCREEN_STATE`,
};

const ActionCreator = {
  getCurrentFilter: (currentGenre) => {
    return {
      type: ActionType.FILTER_CHANGE,
      payload: currentGenre
    };
  },

  getFilteredMovies: (currentGenre) => {
    const filteredMovies = currentGenre === `All genres` ? smallMovies : getFilteredMovies(smallMovies, currentGenre);

    return {
      type: ActionType.FILTERED_MOVIES,
      payload: filteredMovies,
    };
  },

  showMoreMovies: () => {
    return {
      type: ActionType.SHOW_MORE,
      payload: MOVIES_TO_SHOW,
    };
  },

  getCurrentMovie: (movie) => {
    return {
      type: ActionType.CURRENT_MOVIE,
      payload: movie,
    };
  },

  getFullScreenState: (status) => {
    return {
      type: ActionType.FULL_SCREEN_STATE,
      payload: status,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FILTER_CHANGE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.FILTERED_MOVIES:
      return extend(state, {
        movies: action.payload,
        shownMoviesNumber: MOVIES_TO_SHOW,
      });

    case ActionType.SHOW_MORE:
      return extend(state, {
        shownMoviesNumber: state.shownMoviesNumber + action.payload,
      });

    case ActionType.CURRENT_MOVIE:
      return extend(state, {
        currentMovie: action.payload,
      });

    case ActionType.FULL_SCREEN_STATE:
      return extend(state, {
        isActivePlayer: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
