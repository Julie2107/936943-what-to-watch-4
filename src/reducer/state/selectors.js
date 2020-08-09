import NameSpace from "../name-space";
import {getMovies} from "../movies/selectors";
import {createSelector} from "reselect";
import {getFilteredMovies} from "../../utils.js";


export const getCurrentGenre = (state) => state[NameSpace.STATE].currentGenre;

export const getShownMoviesNumber = (state) => state[NameSpace.STATE].shownMoviesNumber;

export const getMoviesByGenre = createSelector(
    getMovies,
    getCurrentGenre,
    (movies, genre) => {
      const filteredMovies = genre === `All genres` ? movies : getFilteredMovies(movies, genre);

      return filteredMovies;
    }
);
