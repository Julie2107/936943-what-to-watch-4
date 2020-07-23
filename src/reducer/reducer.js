import {smallMovies} from "../mocks/films.js";
import {getFilteredMovies, getGenresList, extend} from "../utils.js";
import {MOVIES_TO_SHOW} from "../consts.js";

const initialState = {
  currentGenre: `All genres`,
  genresList: getGenresList(smallMovies),
  movies: smallMovies,
  shownMoviesNumber: MOVIES_TO_SHOW,
};

const ActionType = {
  FILTER_CHANGE: `FILTER_CHANGE`,
  FILTERED_MOVIES: `FILTERED_MOVIES`,
  SHOW_MORE: `SHOW_MORE`
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
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
