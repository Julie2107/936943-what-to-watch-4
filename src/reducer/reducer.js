import {smallMovies} from "../mocks.films.js";
import {getFilteredMovies, getGenresList} from "../utils.js";

const initialState = {
  genre: `All genres`,
  movies: smallMovies,
};

const ActionType = {
  FILTER_CHANGE: `FILTER_CHANGE`,
  FILTERED_MOVIES: `FILTERED_MOVIES`,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FILTER_CHANGE:
      return getGenresList(state.movies);

    case ActionType.FILTERED_MOVIES:
      return getFilteredMovies(state.movies, state.genre);
  }

  return state;
};

export {reducer, ActionType};
