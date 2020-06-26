import {TITLES, POSTER} from "../consts.js";
import {getRandomInteger} from "../utils.js";

const MOVIES_COUNT = 8;

export const generateMovie = () => {

  return {
    title: TITLES[getRandomInteger(MOVIES_COUNT)],
    poster: POSTER
  };
};

const generateMovies = (count) => new Array(count)
    .fill(``)
    .map(generateMovie);
