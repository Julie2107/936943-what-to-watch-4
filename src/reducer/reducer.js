import {smallMovies} from "../mocks/films.js";
import {getFilteredMovies, getGenresList, extend} from "../utils.js";

const initialState = {
  currentGenre: `All genres`,
  genresList: getGenresList(smallMovies),
  movies: smallMovies,
};

const ActionType = {
  FILTER_CHANGE: `FILTER_CHANGE`,
  FILTERED_MOVIES: `FILTERED_MOVIES`,
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

};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.FILTER_CHANGE:
      return extend(state, {
        currentGenre: action.payload,
      });

    case ActionType.FILTERED_MOVIES:
      return extend(state, {
        movies: action.payload
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator, initialState};
